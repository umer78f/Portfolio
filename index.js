import { skillCards } from './data.js';



document.querySelector(".linkBtn").addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    document.getElementById("projectLink").click();
});




function updatePakistanTime() {
    const timeElement = document.querySelector('.heroTime');
    if (!timeElement) return;

    const options = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const currentTime = formatter.format(new Date());

    // Displays: "PK — 02:21:19 PM"
    timeElement.textContent = `PK — ${currentTime}`;
}

function WhatIDo() {
    const whatIDoSection = document.querySelector('.WhatIDo');
    const mainHeadings = document.getElementById('mainHeadings');
    const skillNameHeading = document.querySelector('.skillName h1');
    const skillKeywordsEl = document.querySelector('.skillKeywords');

    // Cache elements to minimize DOM reads
    const cardEls = [1, 2, 3, 4].map((i) => {
        const el = document.getElementById(`skillCard${i}`);
        return el
            ? { el, h3: el.querySelector('h3'), p: el.querySelector('p') }
            : null;
    });

    let currentIndex = -1;

    function updateSkillView(index, clickedHeading = null, isInitial = false) {
        if (!isInitial && index === currentIndex) return;

        // Safety check for dataset boundary
        if (typeof skillCards === 'undefined' || !skillCards[index]) return;

        const selectedSkill = skillCards[index];
        currentIndex = index;

        // 1. Highlight active heading
        if (mainHeadings) {
            const headings = mainHeadings.querySelectorAll('h2');
            headings.forEach((h, i) => {
                if (i === index || h === clickedHeading) {
                    h.classList.add('active-heading');
                } else {
                    h.classList.remove('active-heading');
                }
            });
        }

        // 2. Animate central skill title (h1)
        if (skillNameHeading) {
            gsap.killTweensOf(skillNameHeading);
            if (isInitial) {
                skillNameHeading.textContent = selectedSkill.name;
                gsap.to(skillNameHeading, { opacity: 0.8, y: 0, duration: 0.4 });
            } else {
                gsap.to(skillNameHeading, {
                    opacity: 0,
                    y: 20,
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: () => {
                        skillNameHeading.textContent = selectedSkill.name;
                        gsap.to(skillNameHeading, {
                            opacity: 0.8,
                            y: 0,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                });
            }
        }

        // 3. Update & force-animate top-left skill pills
        if (skillKeywordsEl && selectedSkill.skills) {
            const currentPills = skillKeywordsEl.querySelectorAll('#skillPill');

            const renderNewPills = () => {
                skillKeywordsEl.innerHTML = selectedSkill.skills
                    .map((skill) => `<span id="skillPill">${skill}</span>`)
                    .join('');

                const newPills = skillKeywordsEl.querySelectorAll('.skillPill');

                // Force GSAP to reveal and animate new pills
                gsap.fromTo(
                    newPills,
                    { opacity: 0, x: -15, scale: 0.95 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.4,
                        stagger: 0.04, // Snappy overlap between items
                        ease: "power3.out" // Smoother deceleration curve
                    }
                );
            };

            if (currentPills.length > 0 && !isInitial) {
                gsap.killTweensOf(currentPills);

                // Fast exit animation
                gsap.to(currentPills, {
                    opacity: 0,
                    x: -12,
                    scale: 0.95,
                    duration: 0.2,
                    stagger: 0.02, // Quick exit stagger
                    ease: "power2.inOut",
                    onComplete: renderNewPills
                });
            } else {
                renderNewPills();
            }
        }

        // 4. Update & animate the 4 corner cards
        const cardsToAnimate = cardEls.map((c) => c?.el).filter(Boolean);

        const updateCardContent = () => {
            selectedSkill.cards.forEach((cardData, cardIndex) => {
                const card = cardEls[cardIndex];
                if (!card) return;
                if (card.h3) card.h3.textContent = cardData.h3;
                if (card.p) card.p.textContent = cardData.p;
            });
        };

        if (isInitial) {
            updateCardContent();
            gsap.to(cardsToAnimate, { opacity: 1, y: 0, scale: 1, duration: 0.45 });
        } else {
            gsap.killTweensOf(cardsToAnimate);
            gsap.to(cardsToAnimate, {
                opacity: 0,
                y: 15,
                scale: 0.98,
                duration: 0.2,
                stagger: 0.03,
                ease: "power2.in",
                onComplete: () => {
                    updateCardContent();
                    gsap.to(cardsToAnimate, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.45,
                        stagger: 0.06,
                        ease: "back.out(1.2)"
                    });
                }
            });
        }
    }

    // Delegated click listener on cylinder container
    if (mainHeadings) {
        mainHeadings.addEventListener('click', (e) => {
            const heading = e.target.closest('h2');
            if (!heading) return;
            const id = parseInt(heading.dataset.id, 10);
            updateSkillView(id - 1, heading);
        });
    }

    // Intersection Observer for animation optimization
    if (mainHeadings && whatIDoSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        mainHeadings.style.animationPlayState = 'running';
                        mainHeadings.classList.add('is-active');
                    } else {
                        mainHeadings.style.animationPlayState = 'paused';
                        mainHeadings.classList.remove('is-active');
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(whatIDoSection);
    }

    // Initial load execution using updateSkillView
    if (typeof skillCards !== 'undefined' && skillCards.length > 0) {
        const firstHeading = mainHeadings ? mainHeadings.querySelector('h2') : null;
        updateSkillView(0, firstHeading, true);
    }
}
window.addEventListener("portfolio:ready", () => {
    updatePakistanTime();
    WhatIDo();
}, { once: true });