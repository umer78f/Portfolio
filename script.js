// Replace LocomotiveScroll initialization in script.js
const isMobile = window.innerWidth <= 768;

const locomotiveScroll = new LocomotiveScroll({
    scrollCallback: () => ScrollTrigger.update(),
    smooth: !isMobile, // Disable smooth scroll engine on mobile to use native hardware scrolling
    lenisOptions: {
        smoothTouch: false
    }
});

//------------------------------------------------------------------------------------------------

function initScrollProxy() {
    ScrollTrigger.refresh();
}

//------------------------------------------------------------------------------------------------


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

//------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------


function heroAnimation() {
    const videoDiv = document.querySelector('.videoDiv');

    if (videoDiv) {
        // Use transform scaleX for GPU acceleration instead of clip-path rendering
        gsap.set(videoDiv, {
            scaleX: 0,
            transformOrigin: "center center"
        });
    }

    const tl = gsap.timeline({
        delay:0.4
    });

    // Animate H1 titles with GPU acceleration
    tl.to('.h1Wrapper h1, .revealDiv h1', {
        opacity: 1,
        y: "0%",
        duration: 1.8,
        ease: "expo.inOut",
        force3D: true
    });

    if (videoDiv) {
        tl.to(videoDiv, {
            scaleX: 1,
            opacity: 1,
            duration: 1.4,
            ease: "expo.inOut",
            force3D: true
        }, "-=1");
    }

    tl.to('.heroBtm, .sideRail, .marqueeWrapper, .nav', {
        opacity: 1,
        ease: "power3.inOut",
        duration: 1.5,
        force3D: true
    }, '1.5')
        .to('.heroSubtitle p, .heroRightSubtitle p', {
            y: "0%",
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
            force3D: true
        }, '-=1.5');

    return tl;
}

//------------------------------------------------------------------------------------------------


function whyMeAnimation() {
    const headerBtmH1 = document.querySelector('.headerBtm h1');
    if (headerBtmH1) headerBtmH1.classList.remove('animText');

    gsap.set(".title", { perspective: 1000 });

    const animTextSpans = gsap.utils.toArray(".whyMe .animText span span");


    const titleSpans = gsap.utils.toArray('.title h1 span span');
    const openingTextSpans = gsap.utils.toArray('.openingText p span span');

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".whyMe",
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: 1.4,
            anticipatePin: 0.05,
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
    })
        .from(openingTextSpans, {
            opacity: 0,
            y: 20, // Optional slight vertical lift for cleaner text reveal
            stagger: 0.07,
            duration: 0.5,
            ease: "power2.out"
        }, 'whymeimg').to('.profileImage', {
            "--imgOverlay": 0,
            duration: 3,
        }, 'whymeimg')

    return tl;
}

//------------------------------------------------------------------------------------------------


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
        },
        {
            title: "Aj Publishing",
            desc: "A high-performance branding platform featuring scroll-driven physics, dynamic cursor interactions, and responsive layouts.",
            tags: ["html/css", "gsap", "Lenis", "CSS Modules"],
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

//------------------------------------------------------------------------------------------------


function footerAnimation() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "footer",
            start: "top 55%",
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

//------------------------------------------------------------------------------------------------


function expertiseAnimation() {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 800px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".expertiese",
                start: "top top",
                end: "+=3000",
                scrub: 1.5,
                pin: true,
                anticipatePin: 0.05,
            }
        });

        const cardIds = ["#expertCard1", "#expertCard2", "#expertCard3", "#expertCard4"];

        cardIds.forEach((id, i) => {
            const label = `card${i}`;

            // 1. scale the incoming card up to full size
            tl.to(id, {
                scale: 1,
                duration: 2,
                ease: "Power2.inOut"
            }, label)



            // 3. ...then split the doors open, slightly overlapping the fade's tail

            if (id !== "#expertCard4") {
                // 2. fade the inner text out first...
                tl.to(`${id} .cardLeft, ${id} .cardRight`, {
                    opacity: 0,
                    duration: 1.2,
                    ease: "Power1.inOut",
                }, `${label}+=0.6`);
                tl.to(`${id} #left, ${id} #right`, {
                    scaleX: 0,
                    duration: 2,
                    ease: "Power2.inOut",
                }, `${label}+=1`);
            }
        });

    });

    mm.add("(max-width: 600px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".expertiese",
                start: "top top",
                end: "+=1000",
                scrub: 1,
                pin: true,
                anticipatePin: 0.5,
            }
        });

        const cardIds = ["#expertCard1", "#expertCard2", "#expertCard3"];

        cardIds.forEach((id, i) => {
            const label = `card${i}`;

            // 1. scale the incoming card up to full size
            tl.to(id, {
                scale: 1,
                duration: 2,
                ease: "Power2.inOut"
            }, label)

            // 2. fade the inner text out first...
            tl.to(`${id} .cardLeft, ${id} .cardRight`, {
                opacity: 0,
                duration: 1.2,
                ease: "Power1.inOut",
            }, `${label}+=0.6`);

            // 3. ...then split the doors open, slightly overlapping the fade's tail

            tl.to(`${id} #left`, {
                tranformOrigin: "right",
                scaleX: 0,
                duration: 4,
                ease: "Power2.inOut",
            }, `${label}+=1`);
        });

    });


    gsap.to('.expertiseTitle h1 span', {
        y: 0,
        stagger: {
            each: 0.04,
            from: "center"
        },
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
            trigger: ".expertiese",
            start: "top 90%",
            end: "top 30%",
            scrub: 1
        }
    });


}

//------------------------------------------------------------------------------------------------

// Preloader Asset Manager
// Preloader Asset Manager (Fixed)
function initPreloader() {
    return new Promise((resolve) => {
        const percentText = document.getElementById("loader-percent");
        const progressBar = document.getElementById("loader-bar");

        // 1. Collect all images and custom fonts
        const images = Array.from(document.images);
        const imageSources = images.map((img) => img.src).filter(Boolean);

        let loadedCount = 0;
        const totalResources = imageSources.length + 1; // +1 for document.fonts
        let currentProgress = 0;

        // Smoothly animate the loader UI counter
        const updateProgress = (targetProgress) => {
            gsap.to({ val: currentProgress }, {
                val: targetProgress,
                duration: 1,
                ease: "power1.out",
                onUpdate: function () {
                    currentProgress = Math.floor(this.targets()[0].val);
                    if (percentText) percentText.textContent = currentProgress;
                    if (progressBar) gsap.set(progressBar, { scaleX: currentProgress / 100 });
                },
                onComplete: () => {
                    if (targetProgress >= 100) {
                        resolve();
                    }
                }
            });
        };

        const onItemLoaded = () => {
            loadedCount++;
            if (loadedCount >= totalResources) {
                // Force complete 100% push once all media items are resolved
                updateProgress(100);
            } else {
                const progress = Math.floor((loadedCount / totalResources) * 99);
                updateProgress(progress);
            }
        };

        // 2. Preload Fonts
        document.fonts.ready.then(onItemLoaded).catch(onItemLoaded);

        // 3. Preload Images
        if (imageSources.length === 0) {
            onItemLoaded();
        } else {
            imageSources.forEach((src) => {
                const img = new Image();
                img.onload = onItemLoaded;
                img.onerror = onItemLoaded; // Prevent broken images from hanging preloader
                img.src = src;
            });
        }
    });
}
// Awwwards Reveal Animation
function exitPreloader() {
    const tl = gsap.timeline();

    tl.to(".loader-content, .loader-bar-bg", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    })
        .to(".preloader", {
            clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
            duration: 1.2,
            ease: "expo.inOut"
        })
        .set(".preloader", { display: "none" });

    return tl;
}
// Pause any <video> once it's off-screen, resume when it's back — keeps only the
// visible video decoding at any time instead of every video running simultaneously.
function manageVideoVisibility() {
    const videos = document.querySelectorAll('video');
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.play().catch(() => {});
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.1 });

    videos.forEach((v) => io.observe(v));
}

// Updated DOM Load Sequence
// Updated DOM Load Sequence
document.addEventListener("DOMContentLoaded", async () => {
    initScrollProxy();
    h1Animation();
    headerAnimation();

    // 1. Wait for assets to finish loading
    await initPreloader();

    // 2. Pre-calculate layout dimensions BEFORE animating out to eliminate UI thread pauses
    locomotiveScroll.resize();
    ScrollTrigger.refresh();

    // 3. Play Exit Animation and Hero Reveal smoothly
    const exitTl = exitPreloader();

    // Trigger hero animations right as the preloader clip-path wipes open
    gsap.delayedCall(0.3, () => {
        manageVideoVisibility() 
        heroAnimation();
        whyMeAnimation();
        expertiseAnimation();
        workAnimation();
        footerAnimation();
    });
});