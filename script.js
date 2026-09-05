let locomotiveScroll;
let scrollUpdateFrame;
let resizeFrame;

function requestScrollUpdate() {
    if (scrollUpdateFrame) return;
    scrollUpdateFrame = requestAnimationFrame(() => {
        scrollUpdateFrame = 0;
        ScrollTrigger.update();
    });
}

function initializeSite() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    locomotiveScroll = new LocomotiveScroll({
        scrollCallback: requestScrollUpdate
    });

    h1Animation();
    headerAnimation();
    heroAnimation();

    const deferredAnimations = [
        whyMeAnimation,
        whatIDoAnimation,
        comparisonAnimation,
        workAnimation,
        footerAnimation
    ];
    const scheduleNext = (index) => {
        if (index >= deferredAnimations.length) {
            ScrollTrigger.refresh();
            return;
        }

        window.setTimeout(() => {
            const schedule = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 0));
            schedule(() => {
                deferredAnimations[index]();
                scheduleNext(index + 1);
            }, { timeout: 1000 });
        }, 0);
    };
    scheduleNext(0);
}

function h1Animation() {
    const paragraphs = document.querySelectorAll('.animText, .animWrapper');
    paragraphs.forEach(p => {
        if (p.dataset.splitDone) return;
        p.dataset.splitDone = "true";

        const text = p.textContent.trim();
        if (!text) return;

        const words = text.split(/\s+/);
        const fragment = document.createDocumentFragment();

        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';

            for (let char of word) {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
            }

            fragment.appendChild(wordSpan);
            if (index < words.length - 1) {
                fragment.appendChild(document.createTextNode(' '));
            }
        });

        p.innerHTML = '';
        p.appendChild(fragment);
    });
}
function headerAnimation() {
    const closeBtn = document.querySelector('.closeBtn');
    const openBtn = document.querySelector('.bar');
    if (!openBtn || !closeBtn) return;

    const header = document.querySelector('header');
    const socialsSvg = gsap.utils.toArray('.socials div svg');
    const navH4 = gsap.utils.toArray('.navHeader h4');
    const linksH2a = gsap.utils.toArray('.links h2 a');
    const rightLinksA = gsap.utils.toArray('.rightLinks p a');
    const headerBtmSpans = gsap.utils.toArray('.headerBtm h1 span span');

    const tl = gsap.timeline({ paused: true });

    tl.to(header, {
        '--header-clip': '150%',
        duration: 1,
        ease: 'power2.inOut',
    })
        .from(socialsSvg, {
            y: -100,
            stagger: -0.05,
            ease: 'power2.inOut',
        }, "-=0.3")
        .from(navH4, {
            x: "100%",
            duration: 0.7,
            ease: "expo.out"
        }, 'linksGroup')
        .from(linksH2a, {
            y: '-100%',
            duration: 0.7,
            stagger: 0.07,
            ease: 'power2.out',
        }, 'linksGroup')
        .from(rightLinksA, {
            y: '-130%',
            duration: 0.7,
            stagger: 0.07,
            ease: 'power2.out',
        }, 'linksGroup')
        .from(headerBtmSpans, {
            y: "-140%",
            duration: 2.5,
            ease: "elastic.out(1, 0.3)",
            stagger: {
                each: 0.02,
                from: "center"
            },
        });

    openBtn.addEventListener('click', () => tl.play());
    closeBtn.addEventListener('click', () => {
        gsap.to([...linksH2a, ...rightLinksA, ...socialsSvg], {
            y: (index, target) => {
                if (target.matches('.socials div svg')) return -100;
                if (target.matches('.rightLinks p a')) return '-130%';
                return '-100%';
            },
            duration: 0.4,
            ease: 'power2.in'
        });

        gsap.to(header, {
            '--header-clip': '0%',
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => tl.pause(0)
        });
    });
}
function heroAnimation() {
    const videoDiv = document.querySelector('.videoDiv');
    const heroTitleTargets = gsap.utils.toArray('.heroTitle h1, .revealDiv div video, .revealDiv h1');

    if (videoDiv) {
        gsap.set(videoDiv, {
            scaleX: 0,
            force3D: true,
            willChange: 'transform'
        });
    }

    const tl = gsap.timeline();

    tl.from('.h1Wrapper h1, .revealDiv h1', {
        opacity: 0,
        yPercent: 100,
        duration: 2,
        ease: "expo.inOut",
    });

    if (videoDiv) {
        tl.to(videoDiv, {
            scaleX: 1,
            duration: 1.5,
            ease: "expo.inOut",
        }, "-=1");
    }

    tl.from('.heroBtm, .sideRail, .marqueeWrapper, .nav', {
        opacity: 0,
        ease: "power3.inOut",
        duration: 2,
    }, '2')
        .from('.heroSubtitle p, .heroRightSubtitle p', {
            y: -100,
            stagger: 0.1,
            duration: 1,
        }, '-=2');

    gsap.to(heroTitleTargets, {
        y: "-100%",
        ease: "expo.out",
        force3D: true,
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: '+=200%',
            scrub: 1,
            invalidateOnRefresh: true,
        }
    });

    return tl;
}
function whyMeAnimation() {
    const headerBtmH1 = document.querySelector('.headerBtm h1');
    if (headerBtmH1) headerBtmH1.classList.remove('animText');

    const animTextSpans = gsap.utils.toArray(".whyMe .animText span span");


    const titleSpans = gsap.utils.toArray('.title h1 span span');
    const openingTextSpans = gsap.utils.toArray('.openingText p span span');
    const images = gsap.utils.toArray('.whyLeftImg, .whyRightImg');
    const willChangeTargets = [...animTextSpans, ...images];

    gsap.set('.whyLeftImg', { y: "70vh" });
    gsap.set('.whyRightImg', { y: "100vh" });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".whyMe",
            start: "top top",
            end: "+=2000", // CHANGED: fixed missing "=" (was "+2500", invalid relative syntax)
            pin: true,
            scrub: 0.5,
            anticipatePin: 0.5,
            onEnter: () => gsap.set(willChangeTargets, { willChange: "transform, opacity" }),
            onLeave: () => gsap.set(willChangeTargets, { willChange: "auto" }),
            onEnterBack: () => gsap.set(willChangeTargets, { willChange: "transform, opacity" }),
            onLeaveBack: () => gsap.set(willChangeTargets, { willChange: "auto" })
        },
    });

    tl.from(titleSpans, {
        y: "100%",
        duration: 2,
        ease: "expo.out",
        stagger: {
            each: 0.05,
            from: "center"
        }
    }, '0.8')
    tl.to('.whyLeftImg', {
        opacity: 1,
        y: 0,
        duration: 4, // Extended duration so movement continues past text end
        ease: "power1.out" // Gives a smooth pushing momentum
    }, '1')
        .to('.whyRightImg', {
            opacity: 1,
            y: 0,
            duration: 8, // Extended duration so movement continues past text end
            ease: "power1.out"
        }, '1')
        .from(openingTextSpans, {
            opacity: 0,
            y: 20, // Optional slight vertical lift for cleaner text reveal
            stagger: 0.07,
            duration: 0.5,
            ease: "power2.out"
        }, '1.2');

    return tl;
}
function whatIDoAnimation() {
    let mm = gsap.matchMedia();

    // Desktop Animation (Screens wider than 768px)
    mm.add("(min-width: 769px)", () => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".WhatIDo",
                start: "top top",
                end: "+=600",
                scrub:2,
                pin:true
            }
        });

        // Moves cards evenly across the bottom row using xPercent: -50 for true center-anchoring
        tl.to("#skillCard1", { left: "15%", top: "82%", xPercent: -50, yPercent: -50, rotation: 0, ease: "power2.out" }, 0)
            .to("#skillCard2", { left: "38%", top: "82%", xPercent: -50, yPercent: -50, rotation: 0, ease: "power2.out" }, 0)
            .to("#skillCard3", { left: "62%", top: "82%", xPercent: -50, yPercent: -50, rotation: 0, ease: "power2.out" }, 0)
            .to("#skillCard4", { left: "85%", top: "82%", xPercent: -50, yPercent: -50, rotation: 0, ease: "power2.out" }, 0);

        return () => tl.kill(); // Cleanup on viewport change
    });

    // Mobile Setup (Screens 768px and smaller)
    mm.add("(max-width: 768px)", () => {
        // Clear GSAP inline styles so CSS Flexbox handles the layout on mobile
        gsap.set(["#skillCard1", "#skillCard2", "#skillCard3", "#skillCard4"], {
            clearProps: "all"
        });
    });
}
function drawConnectingLines() {
    const svg = document.querySelector(".benefits-lines");
    const center = document.querySelector(".compCenter");

    if (!svg || !center) return [];

    const svgBox = svg.getBoundingClientRect();
    const leftCards = [...document.querySelectorAll(".compCardLeft")];
    const rightCards = [...document.querySelectorAll(".compCardRight")];
    const elementBoxes = new Map([center, ...leftCards, ...rightCards].map((element) => [
        element,
        element.getBoundingClientRect()
    ]));

    const getPoint = (element, side) => {
        const box = elementBoxes.get(element);
        return {
            x: (side === "left" ? box.left : box.right) - svgBox.left,
            y: box.top + box.height / 2 - svgBox.top
        };
    };

    function createLine(start, end) {
        const curve = (end.x - start.x) / 2;

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        path.setAttribute(
            "d",
            `M ${start.x} ${start.y}
             C ${start.x + curve} ${start.y},
               ${end.x - curve} ${end.y},
               ${end.x} ${end.y}`
        );

        path.setAttribute("stroke", "#000");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.setAttribute("opacity", "0.6");

        svg.appendChild(path);

        return path;
    }

    const centerLeft = getPoint(center, "left");
    const centerRight = getPoint(center, "right");

    const lines = [];

    const maxPairs = Math.max(leftCards.length, rightCards.length);

    const linePoints = [];

    for (let i = 0; i < maxPairs; i++) {
        if (leftCards[i]) {
            linePoints.push([centerLeft, getPoint(leftCards[i], "right")]);
        }

        if (rightCards[i]) {
            linePoints.push([centerRight, getPoint(rightCards[i], "left")]);
        }
    }

    svg.setAttribute("viewBox", `0 0 ${svgBox.width} ${svgBox.height}`);
    svg.innerHTML = "";
    linePoints.forEach(([start, end]) => lines.push(createLine(start, end)));

    return lines;
}
function comparisonAnimation() {
    const mm = gsap.matchMedia();

    // --------------------------------
    // DESKTOP ANIMATION (>= 768px)
    // --------------------------------
    mm.add("(min-width: 768px)", () => {
        const leftCards = gsap.utils.toArray(".compCardLeft");
        const rightCards = gsap.utils.toArray(".compCardRight");

        // Helper function (must be defined in your project context)
        const lines = typeof drawConnectingLines === "function" ? drawConnectingLines() : [];

        // Hide all SVG lines initially
        lines.forEach((line) => {
            const length = line.getTotalLength();
            gsap.set(line, {
                strokeDasharray: length,
                strokeDashoffset: length
            }, 'a');
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".comparison",
                start: "top top",
                end: "+=2500",
                scrub: 1.2,
                pin: true,
                anticipatePin: 0.1,
                invalidateOnRefresh: true
            }
        });

        // Title entrance
        tl.from(".vsTitle span", {
            y: "100%",
            duration: 0.8,
            ease: "power2.out",
            stagger: {
                each: 0.07,
                from: "center"
            }
        }, "start");

        // Headings
        tl.from(".compLeft h2, .compRight h2", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out"
        }, "start");

        // Center VS Badge
        tl.from(".compCenter", {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(2)"
        }, "start");

        // Sequence cards and SVG paths in pairs
        const maxPairs = Math.max(leftCards.length, rightCards.length);

        for (let i = 0; i < maxPairs; i++) {
            const leftLine = lines[i * 2];
            const rightLine = lines[i * 2 + 1];
            const label = `pair_${i}`;

            if (leftLine) {
                tl.to(leftLine, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, label);
            }
            if (rightLine) {
                tl.to(rightLine, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, label);
            }
            if (leftCards[i]) {
                tl.from(leftCards[i], { opacity: 0, x: -60, duration: 2, ease: "power2.out" }, label);
            }
            if (rightCards[i]) {
                tl.from(rightCards[i], { opacity: 0, x: 60, duration: 2, ease: "power2.out" }, label);
            }
        }

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
        };
    });

    // --------------------------------
    // MOBILE ANIMATION (< 768px)
    // --------------------------------
    mm.add("(max-width: 767px)", () => {
        // Animate Title
        gsap.from(".vsTitle span", {
            scrollTrigger: {
                trigger: ".vsTitle",
                start: "top 90%"
            },
            y: "100%",
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.04
        });

        // Animate Center Badge
        gsap.from(".compCenter", {
            scrollTrigger: {
                trigger: ".compCenter",
                start: "top 85%"
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        });

        // Batch animate cards as they enter viewport while scrolling
        const allCards = gsap.utils.toArray(".compCardLeft, .compCardRight");
        gsap.set(allCards, { opacity: 0, y: 30 });

        ScrollTrigger.batch(allCards, {
            start: "top 88%",
            onEnter: (cards) => gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                overwrite: true
            }),
            onLeaveBack: (cards) => gsap.to(cards, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: "power2.out",
                overwrite: true
            })
        });
    });
}
function workAnimation() {
    gsap.to('.workTitle h1 span', {
        y: 0,
        stagger: {
            each: 0.05,
            from: "start"
        },
        scrollTrigger: {
            trigger: ".work",
            start: "top 90%",
            end: "+=400",
            scrub: 0.5,
        }
    });

    const projectsData = [
        {
            title: "Frontend Man",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sit, repellendus assumenda illum voluptatem distinctio.",
            tags: ["Html/Css", "Javascript", "Gsap", "LocoMotive"],
            video: "/assets/videos/work-video2.mp4",
            link: "#"
        },
        {
            title: "Significo",
            desc: "Revolutionizing healthcare visual identity with interactive canvas animations, dynamic WebGL shaders, and fluid transitions.",
            tags: ["React", "Three.js", "GSAP", "Tailwind"],
            video: "/assets/videos/homeVideo.mp4",
            link: "#"
        },
        {
            title: "K72",
            desc: "A high-performance branding platform featuring scroll-driven physics, dynamic cursor interactions, and responsive layouts.",
            tags: ["Next.js", "WebGL", "Lenis", "CSS Modules"],
            video: "/assets/videos/toggle.mp4",
            link: "#"
        }
    ];

    const projectItems = document.querySelectorAll(".proItem");
    const videoElem = document.getElementById("activeVideo");
    const titleElem = document.getElementById("projectTitle");
    const descElem = document.getElementById("projectDesc");
    const tagsContainer = document.getElementById("tagsContainer");
    const linkElem = document.getElementById("projectLink");

    if (!projectItems.length || !videoElem || !titleElem) return;

    const videoObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            videoElem.play().catch(() => { });
            videoObserver.disconnect();
        }
    }, { threshold: 0.01 });
    videoObserver.observe(videoElem);

    let isAnimating = false;

    projectItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            if (this.classList.contains("active") || isAnimating) return;

            isAnimating = true;

            projectItems.forEach((p) => p.classList.remove("active"));
            this.classList.add("active");

            const targetData = projectsData[index];

            const tl = gsap.timeline({
                defaults: { ease: "power4.inOut" },
                onComplete: () => { isAnimating = false; }
            });

            tl.to([titleElem, descElem], {
                y: -15,
                opacity: 0,
                duration: 0.3,
                stagger: 0.04
            })
                .to(tagsContainer.children, {
                    y: -10,
                    opacity: 0,
                    duration: 0.25,
                    stagger: 0.02
                }, "<")
                .to(videoElem, {
                    scale: 1.05,
                    opacity: 0.2,
                    duration: 0.35
                }, "<")
                .add(() => {
                    titleElem.textContent = targetData.title;
                    descElem.textContent = targetData.desc;
                    if (targetData.link && linkElem) linkElem.setAttribute("href", targetData.link);

                    tagsContainer.innerHTML = targetData.tags
                        .map((tag) => `<div class="tag">${tag}</div>`)
                        .join("");

                    videoElem.src = targetData.video;
                    videoElem.load();
                    videoElem.play().catch(() => { });
                })
                .set([titleElem, descElem], { y: 15, opacity: 0 })
                .set(tagsContainer.children, { y: 10, opacity: 0 })
                .to(videoElem, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.55,
                    ease: "power3.out"
                })
                .to([titleElem, descElem], {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    stagger: 0.06,
                    ease: "power3.out"
                }, "-=0.35")
                .to(tagsContainer.children, {
                    y: 0,
                    opacity: 1,
                    duration: 0.35,
                    stagger: 0.03,
                    ease: "power2.out"
                }, "-=0.3");
        });
    });
}
function footerAnimation() {
    let tl = gsap.timeline({
        scrollTrigger:{
            trigger:"footer",
            start:"top 55%",
        }
    })
    tl.from(".footerBtm h1 span", {
        y: "-100%",
        duration: 2.5,
        ease: "elastic.out(1, 0.3)",
        stagger: {
            each: 0.02,
            from: "center"
        },
    });
}
window.addEventListener("portfolio:ready", initializeSite, { once: true });

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (!locomotiveScroll || resizeFrame) return;
        resizeFrame = requestAnimationFrame(() => {
            resizeFrame = 0;
            locomotiveScroll.resize();
            ScrollTrigger.refresh();
        });
    }, 200);
});

window.addEventListener("load", () => {
    if (locomotiveScroll) {
        locomotiveScroll.resize();
        ScrollTrigger.refresh();
    }
});
