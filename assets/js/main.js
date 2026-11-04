/**
 * SIAM HOSSAIN - FULL STACK DEVELOPER PORTFOLIO
 * High-performance vanilla JavaScript logic, modals, filtering & interactive animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // Global user accessibility preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ==========================================================================
       1. PROFESSIONAL DEVELOPER TERMINAL TYPEWRITER COMPONENT
       Infinitely rotates through 10 designations with smooth typing & deleting
       ========================================================================== */
    (function initHeroTypewriter() {
        const el = document.getElementById('hero-typing-role');
        if (!el) return;

        const designations = [
            "Full Stack Web Developer",
            "Backend Developer",
            "Django Developer",
            "React Developer",
            "Python Developer",
            "Software Engineer",
            "Web Application Developer",
            "API Developer",
            "AI Automation Developer",
            "Digital Marketing Specialist"
        ];

        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            el.textContent = designations[0];
            return;
        }

        let currentIdx = 0;
        let charIdx = designations[0].length;
        let isDeleting = true; // Hold initial title, then delete
        let timerId = null;

        function step() {
            const fullText = designations[currentIdx];

            if (isDeleting) {
                charIdx--;
                el.textContent = fullText.substring(0, charIdx);

                if (charIdx === 0) {
                    isDeleting = false;
                    currentIdx = (currentIdx + 1) % designations.length;
                    timerId = setTimeout(step, 400); // Short pause before typing next designation
                    return;
                }
                timerId = setTimeout(step, 42); // Fast deletion: 35–50ms
            } else {
                charIdx++;
                el.textContent = fullText.substring(0, charIdx);

                if (charIdx === fullText.length) {
                    isDeleting = true;
                    timerId = setTimeout(step, 2000); // Hold full designation for 2 seconds
                    return;
                }
                timerId = setTimeout(step, 75); // Natural typing speed: 65–85ms
            }
        }

        // Section 5 Timeline: Hold initial title for 2000ms after entrance, then delete and cycle
        timerId = setTimeout(step, 2000);

        // Safe cleanup on page unload to prevent memory leaks
        window.addEventListener('beforeunload', () => {
            if (timerId) clearTimeout(timerId);
        });
    })();

    /* ==========================================================================
       1B. DYNAMIC FLOATING TECHNOLOGY SHOWCASE (Hero Section)
       Continuous 3-second animated rotation across predefined tech & marketing stacks
       ========================================================================== */
    const heroFloatingSets = [
        // Set 1: Core Foundation (Initial)
        [
            { name: "Django", icon: '<i class="devicon-django-plain" style="color: #2BA977;"></i>' },
            { name: "Javascript", icon: '<span class="annotation-badge-mini" style="background:#F7DF1E; color:#000;">JS</span>' },
            { name: "React", icon: '<i class="devicon-react-original colored"></i>' }
        ],
        // Set 2: Modern Backend & Databases
        [
            { name: "Python", icon: '<i class="devicon-python-plain colored"></i>' },
            { name: "FastAPI", icon: '<i class="devicon-fastapi-plain" style="color: #05998B;"></i>' },
            { name: "PostgreSQL", icon: '<i class="devicon-postgresql-plain colored"></i>' }
        ],
        // Set 3: Modern Full-Stack & SSR
        [
            { name: "Next.js", icon: '<i class="devicon-nextjs-plain"></i>' },
            { name: "Node.js", icon: '<i class="devicon-nodejs-plain colored"></i>' },
            { name: "Express.js", icon: '<i class="devicon-express-original"></i>' }
        ],
        // Set 4: Modern Frontend & Typing
        [
            { name: "Tailwind CSS", icon: '<i class="devicon-tailwindcss-original colored"></i>' },
            { name: "TypeScript", icon: '<i class="devicon-typescript-plain colored"></i>' },
            { name: "HTML5 & CSS3", icon: '<i class="devicon-html5-plain colored"></i>' }
        ],
        // Set 5: Architecture & Infrastructure
        [
            { name: "Django REST", icon: '<i class="fa-solid fa-code" style="color: #00B8FF;"></i>' },
            { name: "REST API", icon: '<i class="fa-solid fa-network-wired" style="color: #00B4D8;"></i>' },
            { name: "Docker", icon: '<i class="devicon-docker-plain colored"></i>' }
        ],
        // Set 6: Modern Databases & Cloud
        [
            { name: "Supabase", icon: '<i class="devicon-supabase-plain colored"></i>' },
            { name: "GitHub & Git", icon: '<i class="fa-brands fa-github"></i>' },
            { name: "MySQL & SQLite", icon: '<i class="devicon-mysql-plain colored"></i>' }
        ],
        // Set 7: Digital Marketing & Analytics
        [
            { name: "Meta Ads", icon: '<i class="fa-brands fa-meta" style="color: #0081FB;"></i>' },
            { name: "Google Analytics", icon: '<i class="fa-solid fa-chart-simple" style="color: #FFA500;"></i>' },
            { name: "Google Ads", icon: '<i class="fa-brands fa-google" style="color: #4285F4;"></i>' }
        ],
        // Set 8: CMS, SEO & Growth
        [
            { name: "WordPress", icon: '<i class="fa-brands fa-wordpress" style="color: #21759B;"></i>' },
            { name: "SEO & Growth", icon: '<i class="fa-solid fa-chart-line" style="color: #10B981;"></i>' },
            { name: "Email Marketing", icon: '<i class="fa-solid fa-envelope-open-text" style="color: #A855F7;"></i>' }
        ]
    ];

    const rotators = [
        {
            pos: document.getElementById('heroAnnotPos1'),
            wrap: document.getElementById('heroRotator1'),
            text: document.getElementById('heroAnnotText1'),
            icon: document.getElementById('heroAnnotIcon1')
        },
        {
            pos: document.getElementById('heroAnnotPos2'),
            wrap: document.getElementById('heroRotator2'),
            text: document.getElementById('heroAnnotText2'),
            icon: document.getElementById('heroAnnotIcon2')
        },
        {
            pos: document.getElementById('heroAnnotPos3'),
            wrap: document.getElementById('heroRotator3'),
            text: document.getElementById('heroAnnotText3'),
            icon: document.getElementById('heroAnnotIcon3')
        }
    ];

    let currentHeroTechIndex = 0;
    let heroTechInterval = null;
    let isHeroTechTransitioning = false;

    function rotateHeroTechShowcase() {
        if (!rotators[0].wrap || !rotators[1].wrap || !rotators[2].wrap) return;

        const nextIndex = (currentHeroTechIndex + 1) % heroFloatingSets.length;
        const nextSet = heroFloatingSets[nextIndex];

        if (prefersReducedMotion) {
            currentHeroTechIndex = nextIndex;
            rotators.forEach((item, idx) => {
                if (item.text) item.text.textContent = nextSet[idx].name;
                if (item.icon) item.icon.innerHTML = nextSet[idx].icon;
            });
            return;
        }

        if (isHeroTechTransitioning) return;
        isHeroTechTransitioning = true;

        // Step 1: Staggered exit animation (fade + scale down + move slightly)
        rotators.forEach((item, idx) => {
            if (item.pos) item.pos.classList.add('is-animating');
            setTimeout(() => {
                if (item.wrap) {
                    item.wrap.classList.remove('anim-active', 'anim-enter');
                    item.wrap.classList.add('anim-exit');
                }
            }, idx * 70);
        });

        // Step 2: Swap content at opacity 0
        setTimeout(() => {
            currentHeroTechIndex = nextIndex;
            rotators.forEach((item, idx) => {
                if (item.text) item.text.textContent = nextSet[idx].name;
                if (item.icon) item.icon.innerHTML = nextSet[idx].icon;
                if (item.wrap) {
                    item.wrap.classList.remove('anim-exit');
                    item.wrap.classList.add('anim-enter');
                    void item.wrap.offsetWidth; // Force CSS reflow
                }
            });

            // Step 3: Staggered entry animation (scale up 0.78 -> 1, fade in, restore glow)
            rotators.forEach((item, idx) => {
                setTimeout(() => {
                    if (item.wrap) {
                        item.wrap.classList.remove('anim-enter');
                        item.wrap.classList.add('anim-active');
                    }
                }, idx * 70);
            });

            // Step 4: Finalize transition & re-enable gentle float
            setTimeout(() => {
                rotators.forEach((item) => {
                    if (item.pos) item.pos.classList.remove('is-animating');
                    if (item.wrap) item.wrap.classList.remove('anim-active');
                });
                isHeroTechTransitioning = false;
            }, 600);
        }, 400);
    }

    // Start 3-second continuous rotation timer
    if (rotators[0].wrap && rotators[1].wrap && rotators[2].wrap) {
        heroTechInterval = setInterval(rotateHeroTechShowcase, 3000);

        // Pause when tab is inactive to optimize memory & performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (heroTechInterval) {
                    clearInterval(heroTechInterval);
                    heroTechInterval = null;
                }
            } else {
                if (!heroTechInterval) {
                    heroTechInterval = setInterval(rotateHeroTechShowcase, 3000);
                }
            }
        });

        // Pause on portrait hover so user can read / inspect
        const heroStageWrap = document.querySelector('.stage-portrait-wrapper') || document.querySelector('.hero-visual');
        if (heroStageWrap) {
            heroStageWrap.addEventListener('mouseenter', () => {
                if (heroTechInterval) {
                    clearInterval(heroTechInterval);
                    heroTechInterval = null;
                }
            });
            heroStageWrap.addEventListener('mouseleave', () => {
                if (!heroTechInterval && !document.hidden) {
                    heroTechInterval = setInterval(rotateHeroTechShowcase, 3000);
                }
            });
        }
    }

    /* ==========================================================================
       2. STICKY HEADER & ACTIVE SECTION NAVIGATION (RAF & IntersectionObserver)
       ========================================================================== */
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .offcanvas-nav .nav-link');
    const navSections = document.querySelectorAll('section[id], header[id]');

    function setActiveNavLink(id) {
        if (!id) return;
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // High-performance IntersectionObserver for section highlighting (0 forced reflows)
    if ('IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveNavLink(entry.target.getAttribute('id'));
                }
            });
        }, {
            rootMargin: '-25% 0px -65% 0px',
            threshold: 0
        });

        navSections.forEach(section => {
            navObserver.observe(section);
        });
    }

    // RAF-throttled scroll handler for sticky header and back-to-top ring
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                const scrollPos = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;

                // Sticky Navbar Toggle
                if (scrollPos > 60) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Explicit edge-case handling for very top and very bottom
                if (scrollPos < 80) {
                    setActiveNavLink('home');
                } else if (docHeight > 0 && scrollPos >= docHeight - 60) {
                    setActiveNavLink('contact');
                }

                // Update Back To Top Button & Progress Ring
                updateBackToTop(scrollPos, docHeight);

                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // Smooth Scroll Navigation with sticky header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.main-header')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 15;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ==========================================================================
       3. OFFCANVAS SIDEBAR LOGIC
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const offcanvasSidebar = document.getElementById('offcanvas-sidebar');
    const offcanvasOverlay = document.getElementById('offcanvas-overlay');
    const offcanvasClose = document.getElementById('offcanvas-close');
    const offcanvasLinks = document.querySelectorAll('.offcanvas-sidebar a');

    function openOffcanvas() {
        offcanvasSidebar.classList.add('active');
        offcanvasOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeOffcanvas() {
        offcanvasSidebar.classList.remove('active');
        offcanvasOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openOffcanvas);
    if (offcanvasClose) offcanvasClose.addEventListener('click', closeOffcanvas);
    if (offcanvasOverlay) offcanvasOverlay.addEventListener('click', closeOffcanvas);

    offcanvasLinks.forEach(link => {
        link.addEventListener('click', closeOffcanvas);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOffcanvas();
            closeModal();
        }
    });

    /* ==========================================================================
       4. THEME SWITCHER (Dark & Light Mode)
       ========================================================================== */
    function applyTheme(theme, isUserAction = false) {
        if (isUserAction) {
            document.documentElement.classList.add('theme-transitioning');
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transitioning');
            }, 300);
        }
        document.documentElement.setAttribute('data-theme', theme);
        if (document.body) {
            document.body.setAttribute('data-theme', theme);
        }
        const canvas = document.getElementById('siam-portfolio-wp-canvas');
        if (canvas) {
            canvas.setAttribute('data-theme', theme);
        }
        localStorage.setItem('siam_portfolio_theme', theme);
    }

    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle, .mobile-theme-toggle');
    const storedTheme = localStorage.getItem('siam_portfolio_theme') || 'dark';
    applyTheme(storedTheme, false);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme, true);
            showToast('Theme Updated', `Switched to ${newTheme} mode`, 'success');
        });
    });

    /* ==========================================================================
       5. IMPACT & DASHBOARD COUNTERS (Animated Number Increments)
       ========================================================================== */
    const counterContainers = document.querySelectorAll('.counter-section, .services-stats-bar, .skills-stats-panel');
    if (counterContainers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.counter-val');
                    counters.forEach(counter => {
                        if (counter.getAttribute('data-counted')) return;
                        counter.setAttribute('data-counted', 'true');
                        const target = parseInt(counter.getAttribute('data-target'), 10);
                        const duration = 1600;
                        const stepTime = 30;
                        const totalSteps = duration / stepTime;
                        const increment = target / totalSteps;
                        let current = 0;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.textContent = target;
                                clearInterval(timer);
                            } else {
                                counter.textContent = Math.ceil(current);
                            }
                        }, stepTime);
                    });
                }
            });
        }, { threshold: 0.2 });

        counterContainers.forEach(container => {
            counterObserver.observe(container);
        });
    }

    /* ==========================================================================
       6. SKILL BARS VIEWPORT ANIMATION (Staggered Fill, Bidirectional)
       ========================================================================== */
    const skillSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.progress-fill');

    if (skillSection && progressFills.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                progressFills.forEach((fill, idx) => {
                    setTimeout(() => {
                        const targetWidth = fill.getAttribute('data-progress');
                        fill.style.width = `${targetWidth}%`;
                    }, idx * 65);
                });
            } else {
                const rect = entry.boundingClientRect;
                const vh = window.innerHeight || document.documentElement.clientHeight;
                if (rect.top > vh + 100 || rect.bottom < -120) {
                    progressFills.forEach(fill => {
                        fill.style.width = '0%';
                    });
                }
            }
        }, { threshold: 0.15 });
        skillObserver.observe(skillSection);
    }

    /* ==========================================================================
       7. DYNAMIC INTERACTIVE WIDGET (Sliding Background Indicator)
       ========================================================================== */
    const widgetItems = document.querySelectorAll('.interactive-slider-widget .widget-item');
    const slidingBg = document.getElementById('sliding-bg');

    function updateWidgetIndicator(index) {
        if (!slidingBg || window.innerWidth < 992) return;
        const percent = (index * 100);
        slidingBg.style.transform = `translateX(${percent}%)`;
    }

    widgetItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            widgetItems.forEach(w => w.classList.remove('active'));
            item.classList.add('active');
            updateWidgetIndicator(index);
        });

        item.addEventListener('click', () => {
            widgetItems.forEach(w => w.classList.remove('active'));
            item.classList.add('active');
            updateWidgetIndicator(index);
        });
    });

        /* ==========================================================================
       8. PORTFOLIO FILTERING & CATEGORY NAVIGATION
       ========================================================================== */
    const filterPillBtns = document.querySelectorAll('.projects-filter-bar .filter-pill-btn');
    const projectCards = document.querySelectorAll('.portfolio-project-card');

    filterPillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterPillBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter') || 'all';

            projectCards.forEach(card => {
                const category = (card.getAttribute('data-category') || '').toLowerCase();
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 200);
                }
            });
        });
    });

        /* ==========================================================================
       8B. ACHIEVEMENTS & CERTIFICATIONS FILTERING
       ========================================================================== */
    const achFilterBtns = document.querySelectorAll('.achievements-filter-bar .filter-pill-btn');
    const achCards = document.querySelectorAll('.achievement-card-box');

    window.filterAchievements = function(filterValue, activeBtn) {
        if (!filterValue) filterValue = 'all';

        achFilterBtns.forEach(b => {
            if (b.getAttribute('data-filter') === filterValue || b === activeBtn) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        achCards.forEach(card => {
            const category = (card.getAttribute('data-category') || '').toLowerCase();
            if (filterValue === 'all' || category.includes(filterValue)) {
                card.style.display = 'flex';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(15px)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 200);
            }
        });
    };

    achFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter') || 'all';
            window.filterAchievements(filterValue, btn);
        });
    });

        /* ==========================================================================
       9. REVIEWS & TESTIMONIALS CAROUSEL
       ========================================================================== */
    const reviewsSection = document.getElementById('testimonials');
    const reviewsCards = document.querySelectorAll('.reviews-card-item');
    const reviewsDots = document.querySelectorAll('.reviews-dot');
    const reviewsPrevBtn = document.getElementById('reviewsPrev');
    const reviewsNextBtn = document.getElementById('reviewsNext');
    const reviewsTrack = document.getElementById('reviewsTrack');
    const reviewsStageWrapper = document.querySelector('.reviews-stage-wrapper');
    
    // Initial active slide is 1 (Nusrat Jahan, center card matching reference image)
    let currentReviewSlide = 1;
    let reviewsAutoSlideTimer = null;
    const isMobileReviews = () => window.innerWidth <= 991;

    function updateReviewsStage(index) {
        if (!reviewsCards.length) return;
        currentReviewSlide = (index + reviewsCards.length) % reviewsCards.length;

        // Update cards active state
        reviewsCards.forEach((card, idx) => {
            const isActive = idx === currentReviewSlide;
            card.classList.toggle('active', isActive);
            card.setAttribute('aria-hidden', (!isActive && isMobileReviews()) ? 'true' : 'false');
        });

        // Update dots
        reviewsDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentReviewSlide);
            dot.setAttribute('aria-selected', idx === currentReviewSlide ? 'true' : 'false');
        });

        // On mobile/tablet (<= 991px), slide the track
        if (reviewsTrack) {
            if (isMobileReviews()) {
                reviewsTrack.style.transform = `translateX(-${currentReviewSlide * 100}%)`;
            } else {
                reviewsTrack.style.transform = 'none';
            }
        }
    }

    window.goToReview = function(index) {
        updateReviewsStage(index);
    };

    if (reviewsPrevBtn) {
        reviewsPrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            updateReviewsStage(currentReviewSlide - 1);
        });
    }

    if (reviewsNextBtn) {
        reviewsNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            updateReviewsStage(currentReviewSlide + 1);
        });
    }

    // Direct card click to select
    reviewsCards.forEach((card, idx) => {
        card.addEventListener('click', () => {
            updateReviewsStage(idx);
        });
    });

    // Dot navigation click
    reviewsDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateReviewsStage(idx);
        });
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (reviewsStageWrapper) {
        reviewsStageWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        reviewsStageWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleReviewsSwipe();
        }, { passive: true });
    }

    function handleReviewsSwipe() {
        const swipeThreshold = 40;
        if (touchEndX < touchStartX - swipeThreshold) {
            updateReviewsStage(currentReviewSlide + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            updateReviewsStage(currentReviewSlide - 1);
        }
    }

    // Window resize handler to maintain track alignment
    window.addEventListener('resize', () => {
        updateReviewsStage(currentReviewSlide);
    }, { passive: true });

    // Auto-advance carousel
    function startReviewsAutoSlide() {
        if (!reviewsCards.length || (typeof prefersReducedMotion !== 'undefined' && prefersReducedMotion)) return;
        stopReviewsAutoSlide();
        reviewsAutoSlideTimer = setInterval(() => {
            updateReviewsStage(currentReviewSlide + 1);
        }, 5500);
    }

    function stopReviewsAutoSlide() {
        if (reviewsAutoSlideTimer) {
            clearInterval(reviewsAutoSlideTimer);
            reviewsAutoSlideTimer = null;
        }
    }

    if (reviewsStageWrapper && (typeof prefersReducedMotion === 'undefined' || !prefersReducedMotion)) {
        startReviewsAutoSlide();
        reviewsStageWrapper.addEventListener('mouseenter', stopReviewsAutoSlide);
        reviewsStageWrapper.addEventListener('mouseleave', startReviewsAutoSlide);
    }

    // Pause auto slide if document tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopReviewsAutoSlide();
        } else if (typeof prefersReducedMotion === 'undefined' || !prefersReducedMotion) {
            startReviewsAutoSlide();
        }
    });

    // Initial state: slide 1 (matches reference screenshot with center card active)
    updateReviewsStage(1);

    /* ==========================================================================
       10. BACK TO TOP BUTTON WITH CIRCULAR SCROLL PROGRESS
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');
    const progressCircle = document.querySelector('.progress-ring-circle');
    const circleRadius = 20;
    const circumference = 2 * Math.PI * circleRadius;

    if (progressCircle) {
        progressCircle.style.strokeDasharray = `${circumference}`;
        progressCircle.style.strokeDashoffset = `${circumference}`;
    }

    function updateBackToTop(scrollPos, docHeight) {
        if (!backToTopBtn) return;
        const totalHeight = (typeof docHeight === 'number') ? docHeight : (document.documentElement.scrollHeight - window.innerHeight);
        const scrollPercent = totalHeight > 0 ? scrollPos / totalHeight : 0;

        if (scrollPos > 320) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        if (progressCircle) {
            const offset = circumference - (scrollPercent * circumference);
            progressCircle.style.strokeDashoffset = offset;
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

        /* ==========================================================================
       11. CONTACT SECTION & SECURE FORM SUBMISSION (RESEND API & VALIDATION)
       ========================================================================== */
    const contactSection = document.getElementById('contact');
    const contactForm = document.getElementById('contact-form');

    // 1. Copy to Clipboard Functionality with Tooltip Confirmation
    const copyButtons = document.querySelectorAll('.contact-copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            let success = false;
            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    success = true;
                } catch (err) {
                    console.warn('[Clipboard] API writeText failed, using fallback', err);
                }
            }

            // Fallback for non-HTTPS or unsupported browsers
            if (!success) {
                try {
                    const tempInput = document.createElement('textarea');
                    tempInput.value = textToCopy;
                    tempInput.style.position = 'fixed';
                    tempInput.style.left = '-9999px';
                    tempInput.style.top = '0';
                    document.body.appendChild(tempInput);
                    tempInput.focus();
                    tempInput.select();
                    success = document.execCommand('copy');
                    document.body.removeChild(tempInput);
                } catch (fallbackErr) {
                    console.error('[Clipboard] Fallback execCommand failed', fallbackErr);
                }
            }

            const tooltip = btn.querySelector('.copy-tooltip');
            if (tooltip) {
                tooltip.classList.add('show');
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);
            }
        });
    });

    // 2. Collaboration Cards Interactive Selection
    const collabCards = document.querySelectorAll('.contact-collab-card');
    const subjectSelect = document.getElementById('contact-subject');
    const messageTextarea = document.getElementById('contact-message');

    collabCards.forEach(card => {
        const selectCardAction = () => {
            collabCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const targetSubject = card.getAttribute('data-subject');
            if (subjectSelect && targetSubject) {
                subjectSelect.value = targetSubject;
                subjectSelect.classList.remove('input-error');
                const subjErr = document.getElementById('subject-error');
                if (subjErr) {
                    subjErr.textContent = '';
                    subjErr.classList.remove('visible');
                }
            }
            if (messageTextarea) {
                messageTextarea.focus();
            }
        };

        card.addEventListener('click', selectCardAction);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectCardAction();
            }
        });
    });

    // 3. Message Textarea Character Counter
    const charCountDisplay = document.getElementById('contact-char-count');
    if (messageTextarea && charCountDisplay) {
        const maxLen = 1500;
        messageTextarea.addEventListener('input', () => {
            const currentLen = messageTextarea.value.length;
            charCountDisplay.textContent = `${currentLen} / ${maxLen}`;
            if (currentLen > maxLen * 0.9) {
                charCountDisplay.style.color = '#FF8500';
            } else {
                charCountDisplay.style.color = '#929292';
            }
        });
    }

    // 4. Form Validation & Real Submission Handler
    if (contactForm) {
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const hpInput = document.getElementById('contact-hp');
        const submitBtn = document.getElementById('submit-btn');
        const statusAlert = document.getElementById('contact-status-alert');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');

        function clearErrors() {
            [nameInput, emailInput, subjectSelect, messageTextarea].forEach(inp => {
                if (inp) inp.classList.remove('input-error');
            });
            [nameError, emailError, subjectError, messageError].forEach(err => {
                if (err) {
                    err.textContent = '';
                    err.classList.remove('visible');
                }
            });
            if (statusAlert) {
                statusAlert.style.display = 'none';
                statusAlert.className = 'contact-status-alert';
                statusAlert.innerHTML = '';
            }
        }

        function showFieldError(inputEl, errorEl, message) {
            if (inputEl) inputEl.classList.add('input-error');
            if (errorEl) {
                errorEl.textContent = message;
                errorEl.classList.add('visible');
            }
        }

        function isValidEmailAddress(val) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());
        }

        // Clear error as user types or changes input
        [nameInput, emailInput, messageTextarea].forEach(inp => {
            if (inp) {
                inp.addEventListener('input', () => {
                    inp.classList.remove('input-error');
                    const errId = `${inp.name}-error`;
                    const errEl = document.getElementById(errId);
                    if (errEl) {
                        errEl.textContent = '';
                        errEl.classList.remove('visible');
                    }
                });
            }
        });

        if (subjectSelect) {
            subjectSelect.addEventListener('change', () => {
                subjectSelect.classList.remove('input-error');
                if (subjectError) {
                    subjectError.textContent = '';
                    subjectError.classList.remove('visible');
                }
            });
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();

            const name = (nameInput ? nameInput.value : '').trim();
            const email = (emailInput ? emailInput.value : '').trim();
            const subject = (subjectSelect ? subjectSelect.value : '').trim();
            const message = (messageTextarea ? messageTextarea.value : '').trim();
            const hp = hpInput ? hpInput.value.trim() : '';

            let hasError = false;

            if (!name) {
                showFieldError(nameInput, nameError, 'Please enter your name.');
                hasError = true;
            }

            if (!email) {
                showFieldError(emailInput, emailError, 'Please enter your email address.');
                hasError = true;
            } else if (!isValidEmailAddress(email)) {
                showFieldError(emailInput, emailError, 'Please enter a valid email address.');
                hasError = true;
            }

            if (!subject) {
                showFieldError(subjectSelect, subjectError, 'Please select a subject.');
                hasError = true;
            }

            if (!message) {
                showFieldError(messageTextarea, messageError, 'Please enter your message.');
                hasError = true;
            } else if (message.length < 10) {
                showFieldError(messageTextarea, messageError, 'Your message must be at least 10 characters.');
                hasError = true;
            }

            if (hasError) {
                const firstInvalid = contactForm.querySelector('.input-error');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Enter Loading State
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.classList.add('is-loading');
            submitBtn.innerHTML = `
                <i class="fa-solid fa-circle-notch fa-spin submit-btn-icon"></i>
                <span class="btn-text">Sending Message...</span>
            `;

            try {
                const payload = JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                    _hp_security_check: hp
                });

                let response = null;
                // Dual-endpoint resilience: try /api/contact first, fallback to WordPress endpoint
                try {
                    response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: payload
                    });
                } catch (netErr) {
                    console.warn('[Contact] /api/contact network error, trying WordPress endpoint...', netErr);
                }

                if (!response || response.status === 404) {
                    try {
                        response = await fetch('/index.php?siam_action=contact', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: payload
                        });
                    } catch (wpErr) {
                        console.warn('[Contact] WordPress endpoint network error', wpErr);
                    }
                }

                const data = response ? await response.json().catch(() => ({})) : {};

                if (response && response.ok && data.success) {
                    // Confirmed Success: Reset form inputs and character count
                    contactForm.reset();
                    if (charCountDisplay) charCountDisplay.textContent = '0 / 1500';
                    collabCards.forEach(c => c.classList.remove('active'));

                    const successMessage = "Thank you! Your message has been sent successfully. I'll get back to you soon.";
                    if (statusAlert) {
                        statusAlert.className = 'contact-status-alert alert-success';
                        statusAlert.textContent = successMessage;
                        statusAlert.style.display = 'block';
                    }

                    showToast(
                        'Message Sent!',
                        successMessage,
                        'success',
                        6000
                    );
                } else {
                    // Error: Preserve user form data!
                    console.error('[Contact Error]', data);
                    const errorMessage = "Something went wrong while sending your message. Please try again.";
                    
                    if (statusAlert) {
                        statusAlert.className = 'contact-status-alert alert-error';
                        statusAlert.textContent = errorMessage;
                        statusAlert.style.display = 'block';
                    }

                    showToast(
                        'Submission Error',
                        errorMessage,
                        'error',
                        7000
                    );
                }
            } catch (err) {
                console.error('[Contact Exception]', err);
                const errorMessage = "Something went wrong while sending your message. Please try again.";
                if (statusAlert) {
                    statusAlert.className = 'contact-status-alert alert-error';
                    statusAlert.textContent = errorMessage;
                    statusAlert.style.display = 'block';
                }
                showToast(
                    'Network Error',
                    errorMessage,
                    'error',
                    7000
                );
            } finally {
                // Restore submit button
                submitBtn.disabled = false;
                submitBtn.classList.remove('is-loading');
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }

    // 5. Quick Meeting CTA button
    const meetingCtaBtn = document.getElementById('meetingCtaBtn');
    if (meetingCtaBtn && contactForm) {
        meetingCtaBtn.addEventListener('click', (e) => {
            // Smoothly focus subject and pre-select "Other" or launch mailto
            if (subjectSelect) {
                subjectSelect.value = 'Other';
            }
            if (messageTextarea) {
                messageTextarea.focus();
                if (!messageTextarea.value) {
                    messageTextarea.placeholder = "Let's schedule a call! Please mention your preferred date, time and platform (Google Meet / Zoom)...";
                }
            }
        });
    }

    /* ==========================================================================
       12. BIDIRECTIONAL HIGH-PERFORMANCE SCROLL REVEAL ENGINE
       Smooth 60 FPS entrance & exit animations in BOTH scroll directions
       ========================================================================== */
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        document.documentElement.classList.add('js-scroll-reveal');

        // Staggered groups: automatically apply --stagger index to children
        const staggerGroups = [
            { parent: '.services-cards-grid', items: '.service-card-item' },
            { parent: '.skills-stats-row', items: '.skills-stat-card' },
            { parent: '.skill-categories-grid', items: '.skill-category-card' },
            { parent: '.exp-timeline-list', items: '.exp-timeline-card' },
            { parent: '.experience-stats-bar', items: '.exp-stat-item' },
            { parent: '.projects-cards-grid', items: '.portfolio-project-card' },
            { parent: '.projects-stats-row', items: '.project-stat-card' },
            { parent: '.achievements-cards-grid', items: '.achievement-card-box' },
            { parent: '.achievements-stats-grid', items: '.ach-stat-card' },
            { parent: '.reviews-cards-carousel', items: '.reviews-card-item' },
            { parent: '.reviews-stats-row', items: '.reviews-stat-card' },
            { parent: '.contact-collab-row', items: '.contact-collab-card' },
            { parent: '.contact-info-cards-list', items: '.contact-info-card' },
            { parent: '.about-info-grid', items: '.about-info-item' }
        ];

        staggerGroups.forEach(group => {
            const parentEl = document.querySelector(group.parent);
            if (parentEl) {
                const childItems = parentEl.querySelectorAll(group.items);
                childItems.forEach((item, idx) => {
                    item.style.setProperty('--stagger', idx);
                    item.classList.add('scroll-reveal-init');
                });
            }
        });

        // Standalone section headers, panels, banners, and visuals
        const standaloneSelectors = [
            '.about-visual-col',
            '.about-content-col',
            '.services-header-text',
            '.services-header-visual',
            '.services-cta-banner',
            '.skills-header-text',
            '.skills-header-visual',
            '.skills-proficiency-panel',
            '.experience-header-row',
            '.exp-experience-panel',
            '.exp-education-panel',
            '.projects-header-row',
            '.projects-filter-bar',
            '.achievements-header-row',
            '.achievements-trophy-box',
            '.achievements-filter-bar',
            '.achievements-cta-panel',
            '.reviews-header-row',
            '.reviews-cta-banner',
            '.contact-header-row',
            '.contact-form-card',
            '.contact-meeting-card',
            '.contact-social-row',
            '.footer-container',
            '.scroll-reveal-init'
        ];

        const revealTargets = new Set();
        standaloneSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                // Ensure hero (#home) and navbar elements are NEVER hidden
                if (!el.closest('#home') && !el.closest('#main-header')) {
                    el.classList.add('scroll-reveal-init');
                    revealTargets.add(el);
                }
            });
        });

        const bidirectionalRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target;
                if (entry.isIntersecting) {
                    target.classList.remove('scroll-reveal-reset');
                    target.classList.add('scroll-reveal-visible');
                } else {
                    const rect = entry.boundingClientRect;
                    const vh = window.innerHeight || document.documentElement.clientHeight;
                    // Reset if scrolled off bottom (scrolling up away) or off top (scrolling down past)
                    if (rect.top > vh + 60 || rect.bottom < -120) {
                        target.classList.remove('scroll-reveal-visible');
                        target.classList.add('scroll-reveal-reset');
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.08
        });

        revealTargets.forEach(el => {
            bidirectionalRevealObserver.observe(el);
        });
    } else {
        document.querySelectorAll('.scroll-reveal-init').forEach(el => {
            el.classList.add('scroll-reveal-visible');
        });
    }
});

/* ==========================================================================
   12. MODAL DATA & FUNCTIONS (PROJECTS, SERVICES, CERTIFICATES, BLOG)
   ========================================================================== */
const projectsData = {
    1: {
        title: "SnapBook - Social Platform",
        tag: "Full-Stack • Django & React",
        img: "assets/images/projects/snapbook.png",
        client: "Full-Stack Web App",
        timeline: "Completed",
        tech: "Django, PostgreSQL, React, Tailwind CSS",
        liveUrl: "https://snap-book-frontend.vercel.app/",
        githubUrl: "https://github.com/siamhossain7722/SnapBook_Frontend",
        desc: "A full-featured social media platform with posts, comments, reactions, and real-time interactions. Built with a scalable Django REST backend, token authentication, and a responsive React frontend."
    },
    2: {
        title: "Product Review Platform",
        tag: "Web App • Next.js & TypeScript",
        img: "assets/images/projects/review.png",
        client: "Web Application",
        timeline: "Completed",
        tech: "Next.js, TypeScript, React, Prisma",
        liveUrl: "https://review-client-two.vercel.app/",
        githubUrl: "https://github.com/siamhossain7722/Review_Client",
        desc: "A review and rating platform where users can discover, review, and compare products through an ultra-fast web interface powered by Next.js and modern database systems."
    },
    3: {
        title: "Eventify - Event Hub",
        tag: "Event Platform • Django & PostgreSQL",
        img: "assets/images/projects/eventify.png",
        client: "Event Management Hub",
        timeline: "Completed",
        tech: "Django, Stripe, React, PostgreSQL",
        liveUrl: "https://new-event-managment.onrender.com/",
        githubUrl: "https://github.com/siamhossain7722/New",
        desc: "A modern event management platform allowing organizers and attendees to create, discover, and join events seamlessly with effortless scheduling and Stripe integration."
    },
    4: {
        title: "AI Assistant",
        tag: "AI Project • Python & OpenAI",
        img: "assets/images/project-2.jpg",
        client: "AI & Automation",
        timeline: "Production",
        tech: "Python, FastAPI, OpenAI, React",
        liveUrl: "https://www.constructivepartnerslimited.com/",
        githubUrl: "https://github.com/siamhossain7722/Constructions",
        desc: "Intelligent conversational AI assistant capable of code generation, reasoning, context-aware responses, and workflow automation."
    },
    5: {
        title: "E-commerce Platform",
        tag: "E-commerce • React & Django",
        img: "assets/images/project-1.jpg",
        client: "E-commerce Storefront",
        timeline: "Completed",
        tech: "React, Django, PostgreSQL, Tailwind",
        liveUrl: "https://github.com/siamhossain7722",
        githubUrl: "https://github.com/siamhossain7722",
        desc: "A high-performance modern e-commerce storefront with cart management, secure checkout, inventory tracking, and responsive mobile architecture."
    },
    6: {
        title: "Analytics Dashboard",
        tag: "Dashboard • React & JavaScript",
        img: "assets/images/project-3.jpg",
        client: "Analytics Hub",
        timeline: "Production",
        tech: "React, JavaScript, Chart.js, REST API",
        liveUrl: "https://github.com/siamhossain7722",
        githubUrl: "https://github.com/siamhossain7722",
        desc: "Real-time analytics and financial tracking dashboard with interactive visual charts, data filtering, and automated report exports."
    }
};

const certificatesData = {
    1: {
        title: "Digital Marketing Certification",
        org: "Urban Academy & Google",
        period: "Aug 28, 2025",
        category: "Professional Certification",
        img: "assets/images/certificates/UA.jpg",
        desc: "Graduated from the comprehensive 16-week Science of Digital Marketing programme, mastering marketing strategy, high-conversion copywriting, Meta & Google advertising, AI chatbot integration, and client campaign execution."
    },
    2: {
        title: "Dean's Awards (5x) & Vice Chancellor Award",
        org: "University of Asia Pacific",
        period: "2019 – 2024",
        category: "Academic Excellence",
        img: "assets/images/certificates/UAP.jpg",
        desc: "Honored with academic excellence awards (multiple Dean's Awards and Vice Chancellor Award) for consistently maintaining high CGPA across multiple semesters in the Department of Computer Science & Engineering at University of Asia Pacific."
    },
    3: {
        title: "CSE Fundamentals",
        org: "Python.io & Phitron.io",
        period: "2019 – 2023",
        category: "Computer Science & Algorithms",
        img: "assets/images/certificates/Certificate_Phitron.jpg",
        desc: "Successfully completed intensive CSE Fundamentals With Phitron with a distinction CGPA of 3.67, mastering advanced C/C++ programming, data structures, algorithms, and practical software engineering."
    },
    4: {
        title: "Intra University Hackathon – 1st Runner Up",
        org: "University Hackathon Division",
        period: "Oct 15, 2022",
        category: "Hackathon Competition",
        img: "assets/images/certificates/GBS.jpg",
        desc: "Awarded 1st Runner Up in the Intra University Hackathon for engineering a full-stack automated solution under strict time constraints with modern architecture."
    },
    5: {
        title: "Python for Everybody & Claude 101 AI",
        org: "University of Michigan (Coursera) & Anthropic",
        period: "Jun 10, 2021 – 2026",
        category: "Programming & AI Certification",
        img: "assets/images/certificates/Certificate_Claude.jpg",
        desc: "Certified in Python programming specialization (University of Michigan / Coursera) and Anthropic Claude 101 AI Agent development, prompt engineering, and LLM orchestration."
    },
    6: {
        title: "Inter University Coding Contest – Honorable Mention",
        org: "Competitive Programming Committee",
        period: "May 20, 2021",
        category: "Competitive Programming",
        img: "assets/images/certificates/food_safty.jpg",
        desc: "Received Honorable Mention in the Inter University Coding Contest for algorithmic problem-solving in data structures, graph theory, and dynamic programming."
    }
};

const servicesData = {
    1: {
        title: "Full-Stack Web Development",
        tag: "End-to-End Solutions",
        desc: "Modern, scalable and secure web applications with Django, React, Next.js and more.",
        deliverables: [
            "Modern Single-Page & Full-Stack Web Applications",
            "Seamless Frontend & Backend API Integration",
            "Scalable Database Architecture & Optimization",
            "Performance, Security Hardening & CI/CD Deployment"
        ]
    },
    2: {
        title: "Backend Development",
        tag: "Backend & Systems",
        desc: "Robust, secure and high-performance backend systems with Django, REST APIs and database design.",
        deliverables: [
            "Custom Django REST Framework & FastAPI Endpoints",
            "PostgreSQL Database Design & ORM Optimization",
            "JWT / OAuth2 Authentication & Role-Based Access Control",
            "High-Throughput Microservices & Scalable System Architecture"
        ]
    },
    3: {
        title: "Frontend Development",
        tag: "User Interface & Experience",
        desc: "Responsive and interactive user interfaces with React, Next.js, Tailwind CSS and modern tools.",
        deliverables: [
            "Pixel-Perfect Responsive Layouts across all devices",
            "Component-Driven Architecture with React & Next.js",
            "Fluid Micro-Interactions & Hardware-Accelerated Animations",
            "Optimized Core Web Vitals & Cross-Browser Consistency"
        ]
    },
    4: {
        title: "API Development & Integration",
        tag: "API Services",
        desc: "Design, build and integrate RESTful APIs, third-party services and payment gateways.",
        deliverables: [
            "Standardized RESTful Architecture & Versioning",
            "Third-Party Service & Webhook Integrations",
            "Payment Gateway Implementations (Stripe, SSLCommerz)",
            "Automated API Documentation, Testing & Rate Limiting"
        ]
    },
    5: {
        title: "AI Agent Solutions",
        tag: "AI & Automation",
        desc: "Build and integrate AI agents for automation, data processing and real-world business tasks.",
        deliverables: [
            "Autonomous AI Agent Workflows & Pipeline Engineering",
            "LLM API Integrations (OpenAI, Anthropic, Google Gemini)",
            "Intelligent Customer Service & Workflow Chatbots",
            "Structured Data Extraction & Agentic Tool Calling"
        ]
    },
    6: {
        title: "Digital Marketing",
        tag: "Growth & Performance",
        desc: "Data-driven marketing solutions including Google Ads, Meta Ads and conversion optimization.",
        deliverables: [
            "High-ROI Meta Ads & Google Ads Paid Campaigns",
            "Conversion Funnel Tracking & Performance Analytics",
            "Technical On-Page & Off-Page SEO Optimization",
            "Targeted Copywriting & Marketing Automation"
        ]
    }
};

const blogsData = {};

function openModalWithHTML(html) {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body-content');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function openProjectModal(id) {
    const p = projectsData[id];
    if (!p) return;

    const html = `
        <img src="${p.img}" alt="${p.title}" class="modal-project-img">
        <span class="modal-tag">${p.tag}</span>
        <h2 class="modal-title">${p.title}</h2>
        <p class="modal-desc">${p.desc}</p>
        
        <div class="modal-meta-grid">
            <div class="meta-block">
                <span class="meta-block-label">Project Type</span>
                <span class="meta-block-value">${p.client}</span>
            </div>
            <div class="meta-block">
                <span class="meta-block-label">Status</span>
                <span class="meta-block-value">${p.timeline}</span>
            </div>
            <div class="meta-block">
                <span class="meta-block-label">Tech Stack</span>
                <span class="meta-block-value">${p.tech}</span>
            </div>
        </div>

        <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="${p.liveUrl}" target="_blank" class="btn btn-primary btn-round">
                <span>View Live Deployment</span>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            ${p.githubUrl ? `
            <a href="${p.githubUrl}" target="_blank" class="btn btn-secondary btn-round">
                <i class="fa-brands fa-github"></i>
                <span>Source Code</span>
            </a>` : ''}
            <button onclick="closeModal()" class="btn btn-secondary btn-round">
                <span>Close Window</span>
            </button>
        </div>
    `;
    openModalWithHTML(html);
}

function openCertificateModal(id) {
    const c = certificatesData[id];
    if (!c) return;

    const html = `
        <img src="${c.img}" alt="${c.title}" class="modal-cert-img">
        <span class="modal-tag">${c.category} &bull; ${c.period}</span>
        <h2 class="modal-title">${c.title}</h2>
        <p style="font-weight: 600; color: var(--accent-light); margin-bottom: 12px; font-size: 1.05rem;">
            <i class="fa-solid fa-building-columns"></i> ${c.org}
        </p>
        <p class="modal-desc">${c.desc}</p>
        
        <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 20px;">
            <a href="${c.img}" target="_blank" class="btn btn-primary btn-round">
                <span>View Full Size Credential</span>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <button onclick="closeModal()" class="btn btn-secondary btn-round">
                <span>Close Window</span>
            </button>
        </div>
    `;
    openModalWithHTML(html);
}

function openServiceModal(id) {
    const s = servicesData[id];
    if (!s) return;

    const deliverablesHTML = s.deliverables.map(item => `
        <li style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <i class="fa-solid fa-circle-check" style="color: var(--accent);"></i>
            <span>${item}</span>
        </li>
    `).join('');

    const html = `
        <span class="modal-tag">${s.tag}</span>
        <h2 class="modal-title">${s.title}</h2>
        <p class="modal-desc">${s.desc}</p>
        
        <h4 style="font-family: var(--font-heading); color: var(--text-primary); font-size: 1.25rem; margin-bottom: 14px;">Key Deliverables & Strengths:</h4>
        <ul style="margin-bottom: 28px; color: var(--text-secondary);">
            ${deliverablesHTML}
        </ul>

        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="#contact" onclick="closeModal()" class="btn btn-primary btn-round">
                <span>Discuss Your Project</span>
                <i class="fa-solid fa-paper-plane"></i>
            </a>
            <button onclick="closeModal()" class="btn btn-secondary btn-round">
                <span>Close</span>
            </button>
        </div>
    `;
    openModalWithHTML(html);
}

function openBlogModal(id) {
    const b = blogsData[id];
    if (!b) return;

    const html = `
        <img src="${b.img}" alt="${b.title}" class="modal-project-img">
        <span class="modal-tag">${b.tag} &bull; ${b.date}</span>
        <h2 class="modal-title">${b.title}</h2>
        <div class="modal-desc">${b.content}</div>
        
        <div style="margin-top: 24px;">
            <button onclick="closeModal()" class="btn btn-secondary btn-round">
                <span>Back to Insights</span>
            </button>
        </div>
    `;
    openModalWithHTML(html);
}

/* ==========================================================================
   13. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(title, message, type = 'success', duration = 5000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Remove any active toast so only one notification is shown at a time
    container.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;

    const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fa-solid ${iconClass}"></i>
        </div>
        <div class="toast-text">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.35s forwards';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 350);
    }, duration);
}

/* ==========================================================================
   14. LEGAL MODALS (Privacy Policy & Terms of Service)
   ========================================================================== */
window.openPrivacyModal = function() {
    const html = `
        <div class="modal-article-view">
            <span class="modal-tag">LEGAL NOTICE</span>
            <h2 class="modal-main-title">Privacy Policy</h2>
            <div class="modal-description-full">
                <p><strong>Effective Date:</strong> January 2026</p>
                <p>Welcome to Siam.dev. Your privacy is critically important to us. This portfolio website operates as an informational platform representing Siam Hossain's software development portfolio, professional credentials, and technical services.</p>
                <h4>Information Collected</h4>
                <p>We do not collect any personal data automatically other than standard web telemetry and information you voluntarily provide through the contact form (name, email, subject, and message).</p>
                <h4>Use of Information</h4>
                <p>Any information submitted via the contact form is used solely to respond to your inquiry, collaboration proposition, or project discussion. We never sell, rent, or share your contact details with third parties.</p>
                <h4>Security</h4>
                <p>All communication sent through this platform is transmitted over secure SSL encryption (HTTPS).</p>
            </div>
            <div class="modal-actions-footer">
                <button type="button" class="btn btn-secondary btn-round" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    openModalWithHTML(html);
};

window.openTermsModal = function() {
    const html = `
        <div class="modal-article-view">
            <span class="modal-tag">LEGAL NOTICE</span>
            <h2 class="modal-main-title">Terms of Service</h2>
            <div class="modal-description-full">
                <p><strong>Effective Date:</strong> January 2026</p>
                <p>By accessing and exploring this portfolio website (Siam.dev), you agree to comply with and be bound by the following terms and conditions:</p>
                <h4>Intellectual Property</h4>
                <p>All project case studies, custom design systems, branding, and original source implementations presented on this website are the intellectual property of Siam Hossain and respective client partners where applicable.</p>
                <h4>Permitted Use</h4>
                <p>You may view, inspect, and evaluate the work for recruitment, hiring, and collaboration purposes. Reproduction or redistribution of original code or assets without written consent is prohibited.</p>
                <h4>Disclaimer</h4>
                <p>The code samples, demonstrations, and case studies are provided "as is" to illustrate technical competencies and architectural design principles.</p>
            </div>
            <div class="modal-actions-footer">
                <button type="button" class="btn btn-secondary btn-round" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    openModalWithHTML(html);
};


/* ==========================================================================
   SKILLS SECTION INTERACTIVITY & MODALS
   ========================================================================== */
const skillsCategoryData = {
    1: {
        title: "Frontend Development",
        tag: "UI & Modern Frameworks",
        desc: "Building intuitive, ultra-responsive, and high-performance user interfaces using cutting-edge frontend libraries and component architectures.",
        technologies: ["React", "Next.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "HTML5 & Semantic Markup", "CSS3 / Modern Animations"]
    },
    2: {
        title: "Backend Development",
        tag: "Server-Side & APIs",
        desc: "Engineering robust, scalable, and secure backend systems with clean architecture, enterprise authentication, and high-throughput REST APIs.",
        technologies: ["Django & Django REST Framework", "Python", "RESTful API Engineering", "Microservices & Server Architecture", "JWT & OAuth Authentication"]
    },
    3: {
        title: "Database & Storage",
        tag: "Data Architecture & Query Optimization",
        desc: "Designing and managing relational and high-performance databases with strict data integrity, indexing, and migration pipelines.",
        technologies: ["PostgreSQL", "MySQL", "SQLite", "Database Schema Design", "Query Optimization & Indexing", "ORM Integration"]
    },
    4: {
        title: "DevOps & Deployment",
        tag: "Cloud & Infrastructure",
        desc: "Streamlining deployment workflows, containerization, and continuous delivery pipelines for zero-downtime releases.",
        technologies: ["Docker & Containerization", "Git & GitHub Version Control", "CI/CD Workflows", "Vercel & Render Cloud Hosting", "Linux Server Administration"]
    },
    5: {
        title: "AI & Automation",
        tag: "Intelligent Systems & Workflows",
        desc: "Integrating state-of-the-art AI models, autonomous agents, and intelligent automated workflows into real-world business applications.",
        technologies: ["AI Agents & Autonomous Systems", "OpenAI & Gemini API Integrations", "LangChain & Retrieval Systems", "Automated Task Workflows", "Data Processing Pipelines"]
    },
    6: {
        title: "Tools & Others",
        tag: "Productivity & Developer Ecosystem",
        desc: "Leveraging industry-standard development utilities, debugging environments, design handoff tools, and collaborative team platforms.",
        technologies: ["VS Code & Extensions", "Postman API Testing", "Figma UI/UX Design Inspection", "Notion & Trello Project Tracking", "GitHub Collaboration"]
    }
};

function openSkillCategoryModal(id) {
    const s = skillsCategoryData[id];
    if (!s) return;

    const techHTML = s.technologies.map(t => `
        <li style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <i class="fa-solid fa-circle-check" style="color: #FF2525;"></i>
            <span>${t}</span>
        </li>
    `).join('');

    const html = `
        <span class="modal-tag">${s.tag}</span>
        <h2 class="modal-title">${s.title}</h2>
        <p class="modal-desc">${s.desc}</p>
        
        <h4 style="font-family: var(--font-heading); color: var(--text-primary); font-size: 1.25rem; margin-bottom: 14px;">Technologies & Tools Included:</h4>
        <ul style="margin-bottom: 28px; color: var(--text-secondary); list-style: none; padding-left: 0;">
            ${techHTML}
        </ul>

        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="#contact" onclick="closeModal()" class="btn btn-primary btn-round">
                <span>Discuss Your Project</span>
                <i class="fa-solid fa-paper-plane"></i>
            </a>
            <button onclick="closeModal()" class="btn btn-secondary btn-round">
                <span>Close</span>
            </button>
        </div>
    `;
    openModalWithHTML(html);
}

function filterSkillCategory(cat, btn) {
    // Update active state on filter tabs
    document.querySelectorAll('.skill-filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });
    if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
    }

    const cards = document.querySelectorAll('.skill-category-card');
    cards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat || (cat === 'tools' && (itemCat === 'tools' || itemCat === 'ai'))) {
            card.classList.remove('skill-card-hidden');
            card.style.display = 'flex';
        } else {
            card.classList.add('skill-card-hidden');
            card.style.display = 'none';
        }
    });
}
