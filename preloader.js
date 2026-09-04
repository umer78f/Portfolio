(() => {
    const preloader = document.querySelector('#site-preloader');
    const counter = preloader?.querySelector('[data-preloader-counter]');
    const status = preloader?.querySelector('[data-preloader-status]');

    if (!preloader || !counter || !status) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startedAt = performance.now();
    const minimumDisplayTime = 700;
    const maximumWaitTime = 15000;
    const stalledAfter = 5000;
    const tasks = [];
    let resolvedTasks = 0;
    let displayedProgress = 0;
    let targetProgress = 0;
    let lastAnnouncedProgress = -1;
    let revealed = false;
    let frameId;
    let stalledTimer;

    const addTask = (promise) => {
        tasks.push(Promise.resolve(promise).catch(() => undefined));
    };

    const waitForEvent = (element, eventName, alreadyReady) => {
        if (alreadyReady()) return Promise.resolve();
        return new Promise((resolve) => {
            const finish = () => {
                element.removeEventListener(eventName, finish);
                element.removeEventListener('error', finish);
                resolve();
            };
            element.addEventListener(eventName, finish, { once: true });
            element.addEventListener('error', finish, { once: true });
        });
    };

    const criticalImages = [...document.querySelectorAll('img:not([loading="lazy"])')];
    criticalImages.forEach((image) => {
        addTask(waitForEvent(image, 'load', () => image.complete)
            .then(() => image.naturalWidth > 0 ? image.decode?.().catch(() => undefined) : undefined));
    });

    const criticalVideos = [...document.querySelectorAll('video:not([preload="none"])')];
    criticalVideos.forEach((video) => {
        addTask(waitForEvent(video, 'loadedmetadata', () => video.readyState >= 1));
    });

    addTask(document.fonts?.ready ?? Promise.resolve());
    addTask(new Promise((resolve) => {
        if (window.gsap) {
            resolve();
            return;
        }
        const started = performance.now();
        const check = () => {
            if (window.gsap || performance.now() - started > maximumWaitTime) resolve();
            else window.setTimeout(check, 40);
        };
        check();
    }));
    addTask(new Promise((resolve) => {
        if (window.ScrollTrigger) {
            resolve();
            return;
        }
        const started = performance.now();
        const check = () => {
            if (window.ScrollTrigger || performance.now() - started > maximumWaitTime) resolve();
            else window.setTimeout(check, 40);
        };
        check();
    }));
    addTask(new Promise((resolve) => {
        if (window.LocomotiveScroll) {
            resolve();
            return;
        }
        const started = performance.now();
        const check = () => {
            if (window.LocomotiveScroll || performance.now() - started > maximumWaitTime) resolve();
            else window.setTimeout(check, 40);
        };
        check();
    }));
    addTask(new Promise((resolve) => {
        if (document.readyState === 'complete') resolve();
        else window.addEventListener('load', resolve, { once: true });
    }));

    const totalTasks = tasks.length;
    const updateProgress = () => {
        targetProgress = totalTasks ? (resolvedTasks / totalTasks) * 100 : 100;
        counter.textContent = `${Math.round(displayedProgress)}%`;

        if (Math.round(displayedProgress / 5) > lastAnnouncedProgress) {
            lastAnnouncedProgress = Math.round(displayedProgress / 5);
            preloader.setAttribute('aria-label', `Loading portfolio, ${Math.round(displayedProgress)} percent`);
        }
    };

    const animateCounter = () => {
        const difference = targetProgress - displayedProgress;
        displayedProgress += difference * (reducedMotion ? 1 : 0.1);
        if (Math.abs(difference) < 0.1) displayedProgress = targetProgress;
        updateProgress();

        if (displayedProgress < 100 || targetProgress < 100) {
            frameId = window.requestAnimationFrame(animateCounter);
        }
    };
    frameId = window.requestAnimationFrame(animateCounter);

    const reveal = () => {
        if (revealed) return;
        revealed = true;
        window.clearTimeout(stalledTimer);
        window.cancelAnimationFrame(frameId);
        displayedProgress = 100;
        targetProgress = 100;
        counter.textContent = '100%';
        preloader.setAttribute('aria-label', 'Portfolio ready');

        const finish = () => {
            preloader.remove();
            document.documentElement.classList.remove('is-preloading');
            window.dispatchEvent(new Event('portfolio:ready'));
        };

        if (reducedMotion) finish();
        else {
            preloader.classList.add('is-leaving');
            window.setTimeout(finish, 450);
        }
    };

    const tryReveal = () => {
        if (resolvedTasks < totalTasks) return;
        const remainingTime = minimumDisplayTime - (performance.now() - startedAt);
        if (remainingTime > 0) window.setTimeout(tryReveal, remainingTime);
        else reveal();
    };

    tasks.forEach((task) => task.finally(() => {
        resolvedTasks += 1;
        updateProgress();
        tryReveal();
    }));

    stalledTimer = window.setTimeout(() => {
        if (!revealed && resolvedTasks < totalTasks) {
            status.textContent = 'Still preparing the experience';
        }
    }, stalledAfter);

    window.setTimeout(() => {
        if (revealed) return;
        resolvedTasks = totalTasks;
        status.textContent = 'Continuing';
        reveal();
    }, maximumWaitTime);
})();
