/**
 * SIAM HOSSAIN - FULL STACK DEVELOPER PORTFOLIO
 * High-performance vanilla JavaScript logic, modals, filtering & interactive animations
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. DYNAMIC HERO ROLE TYPING EFFECT
       ========================================================================== */
    const typingRoleElement = document.getElementById('hero-typing-role') || document.getElementById('typewriter');
    const roles = [
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
    let roleIndex = 0;
    let charIndex = roles[0].length; // Start with full initial text
    let isDeleting = false;
    let typingSpeed = 85;
    let typingTimeoutId = null;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function dynamicTypeEffect() {
        if (!typingRoleElement || prefersReducedMotion) return;

        const currentPhrase = roles[roleIndex];

        if (isDeleting) {
            charIndex--;
            typingRoleElement.textContent = currentPhrase.substring(0, charIndex);
            typingSpeed = 42; // Fast deleting
        } else {
            charIndex++;
            typingRoleElement.textContent = currentPhrase.substring(0, charIndex);
            typingSpeed = 85; // Natural typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 1800; // Pause at complete phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Short pause before typing next phrase
        }

        typingTimeoutId = setTimeout(dynamicTypeEffect, typingSpeed);
    }

    // Give user time to see initial "Full Stack Developer" after entrance animation settles
    if (typingRoleElement && !prefersReducedMotion) {
        typingTimeoutId = setTimeout(dynamicTypeEffect, 2000);
    }

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
       2. STICKY HEADER & ACTIVE SECTION NAVIGATION
       ========================================================================== */
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .offcanvas-nav .nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky Navbar Toggle
        if (scrollPos > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Update Back To Top Button & Progress Ring
        updateBackToTop(scrollPos);
    });

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
       6. SKILL BARS VIEWPORT ANIMATION (Staggered Fill)
       ========================================================================== */
    const skillSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.progress-fill');
    let skillsAnimated = false;

    if (skillSection) {
        const skillObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                progressFills.forEach((fill, idx) => {
                    setTimeout(() => {
                        const targetWidth = fill.getAttribute('data-progress');
                        fill.style.width = `${targetWidth}%`;
                    }, idx * 75);
                });
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
       8. ADVANCED PORTFOLIO FILTERING, REAL-TIME SEARCH & SORTING
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.portfolio-filter-tabs .filter-btn');
    const portfolioGrid = document.getElementById('portfolioProjectsGrid');
    const portfolioCards = Array.from(document.querySelectorAll('.portfolio-grid .portfolio-card'));
    const searchInput = document.getElementById('projectSearchInput');
    const searchClearBtn = document.getElementById('projectSearchClear');
    const sortSelect = document.getElementById('projectSortSelect');
    const emptyState = document.getElementById('projectsEmptyState');
    const resetFiltersBtn = document.getElementById('btnResetProjectFilters');

    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'latest';

    function updateProjectsDisplay() {
        if (!portfolioCards.length) return;

        let visibleCount = 0;

        // 1. Filter & Search
        portfolioCards.forEach(card => {
            const categories = (card.getAttribute('data-category') || '').toLowerCase();
            const title = (card.querySelector('.project-title-text')?.innerText || '').toLowerCase();
            const desc = (card.querySelector('.project-desc-text')?.innerText || '').toLowerCase();
            const techChips = Array.from(card.querySelectorAll('.tech-chip')).map(c => c.innerText.toLowerCase()).join(' ');
            const cardSearchBlob = `${title} ${desc} ${techChips} ${categories}`;

            const matchesCategory = (currentFilter === 'all') || categories.includes(currentFilter);
            const matchesSearch = !currentSearch || cardSearchBlob.includes(currentSearch);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                });
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 200);
            }
        });

        // 2. Sort cards in DOM
        if (portfolioGrid) {
            const sortedCards = [...portfolioCards].sort((a, b) => {
                if (currentSort === 'latest') {
                    return (b.getAttribute('data-date') || '').localeCompare(a.getAttribute('data-date') || '');
                } else if (currentSort === 'oldest') {
                    return (a.getAttribute('data-date') || '').localeCompare(b.getAttribute('data-date') || '');
                } else if (currentSort === 'featured') {
                    const featA = parseInt(a.getAttribute('data-featured') || '0', 10);
                    const featB = parseInt(b.getAttribute('data-featured') || '0', 10);
                    return featB - featA;
                } else if (currentSort === 'alpha') {
                    const nameA = (a.getAttribute('data-name') || '').toLowerCase();
                    const nameB = (b.getAttribute('data-name') || '').toLowerCase();
                    return nameA.localeCompare(nameB);
                }
                return 0;
            });

            sortedCards.forEach(c => portfolioGrid.appendChild(c));
        }

        // 3. Show/hide empty state
        if (emptyState) {
            emptyState.style.display = (visibleCount === 0) ? 'block' : 'none';
        }

        // 4. Show/hide search clear button
        if (searchClearBtn) {
            searchClearBtn.style.display = currentSearch ? 'inline-flex' : 'none';
        }
    }

    // Category button click
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter') || 'all';
            updateProjectsDisplay();
        });
    });

    // Search input live typing
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.trim().toLowerCase();
            updateProjectsDisplay();
        });
    }

    // Search clear button
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
            }
            currentSearch = '';
            updateProjectsDisplay();
        });
    }

    // Sort dropdown change
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            updateProjectsDisplay();
        });
    }

    // Reset filters button
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            currentFilter = 'all';
            currentSearch = '';
            currentSort = 'latest';
            filterBtns.forEach(b => {
                if (b.getAttribute('data-filter') === 'all') b.classList.add('active');
                else b.classList.remove('active');
            });
            if (searchInput) searchInput.value = '';
            if (sortSelect) sortSelect.value = 'latest';
            updateProjectsDisplay();
        });
    }

    /* ==========================================================================
       8B. ACHIEVEMENTS & CERTIFICATIONS FILTERING
       ========================================================================== */
    const achFilterBtns = document.querySelectorAll('.achievements-filter-tabs .filter-btn');
    const achievementCards = document.querySelectorAll('.achievement-card');

    achFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            achFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            achievementCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================================================
       9. TESTIMONIALS COVERFLOW CAROUSEL & AVATAR SELECTOR
       ========================================================================== */
    const testiCards = document.querySelectorAll('.testimonial-card-item');
    const testiAvatarBtns = document.querySelectorAll('.testi-avatar-btn');
    const testiDots = document.querySelectorAll('.testi-dot');
    const testiPrevBtn = document.getElementById('slider-prev');
    const testiNextBtn = document.getElementById('slider-next');
    const testiStageWrapper = document.querySelector('.testimonials-stage-wrapper');
    let currentTestiSlide = 0;
    let testiAutoSlideTimer = null;

    function updateTestimonialStage(index) {
        if (!testiCards.length) return;
        currentTestiSlide = (index + testiCards.length) % testiCards.length;

        testiCards.forEach((card, idx) => {
            card.classList.remove('active', 'is-prev', 'is-next');
            if (idx === currentTestiSlide) {
                card.classList.add('active');
            } else if (idx === (currentTestiSlide - 1 + testiCards.length) % testiCards.length) {
                card.classList.add('is-prev');
            } else {
                card.classList.add('is-next');
            }
        });

        testiAvatarBtns.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentTestiSlide);
        });

        testiDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentTestiSlide);
        });
    }

    window.goToTestimonial = function(index) {
        updateTestimonialStage(index);
    };

    if (testiPrevBtn) {
        testiPrevBtn.addEventListener('click', () => {
            updateTestimonialStage(currentTestiSlide - 1);
        });
    }

    if (testiNextBtn) {
        testiNextBtn.addEventListener('click', () => {
            updateTestimonialStage(currentTestiSlide + 1);
        });
    }

    testiAvatarBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            updateTestimonialStage(idx);
        });
    });

    testiDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateTestimonialStage(idx);
        });
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    if (testiStageWrapper) {
        testiStageWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testiStageWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleTestiSwipe();
        }, { passive: true });
    }

    function handleTestiSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            updateTestimonialStage(currentTestiSlide + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            updateTestimonialStage(currentTestiSlide - 1);
        }
    }

    // Auto-advance carousel unless user prefers reduced motion
    function startTestiAutoSlide() {
        if (!testiCards.length || prefersReducedMotion) return;
        stopTestiAutoSlide();
        testiAutoSlideTimer = setInterval(() => {
            updateTestimonialStage(currentTestiSlide + 1);
        }, 7000);
    }

    function stopTestiAutoSlide() {
        if (testiAutoSlideTimer) {
            clearInterval(testiAutoSlideTimer);
            testiAutoSlideTimer = null;
        }
    }

    if (testiStageWrapper && !prefersReducedMotion) {
        startTestiAutoSlide();
        testiStageWrapper.addEventListener('mouseenter', stopTestiAutoSlide);
        testiStageWrapper.addEventListener('mouseleave', startTestiAutoSlide);
    }

    // Initialize first state
    updateTestimonialStage(0);

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

    function updateBackToTop(scrollPos) {
        if (!backToTopBtn) return;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollPos / docHeight : 0;

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
       11. SECURE CONTACT FORM SUBMISSION WITH REAL EMAIL DELIVERY (RESEND API)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const phoneInput = document.getElementById('contact-phone');
        const subjectSelect = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');
        const hpInput = document.getElementById('contact-hp');
        const submitBtn = document.getElementById('submit-btn');
        const statusAlert = document.getElementById('contact-status-alert');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        function clearErrors() {
            [nameInput, emailInput, messageInput].forEach(inp => {
                if (inp) inp.classList.remove('input-error');
            });
            [nameError, emailError, messageError].forEach(err => {
                if (err) {
                    err.textContent = '';
                    err.classList.remove('visible');
                }
            });
        }

        function showFieldError(inputEl, errorEl, message) {
            if (inputEl) inputEl.classList.add('input-error');
            if (errorEl) {
                errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
                errorEl.classList.add('visible');
            }
        }

        function validateEmailFormat(val) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());
        }

        // Clear error as user types
        [nameInput, emailInput, messageInput].forEach(inp => {
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

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();
            if (statusAlert) {
                statusAlert.style.display = 'none';
                statusAlert.innerHTML = '';
            }

            const name = (nameInput ? nameInput.value : '').trim();
            const email = (emailInput ? emailInput.value : '').trim();
            const phone = (phoneInput ? phoneInput.value : '').trim();
            const subject = subjectSelect ? subjectSelect.value : 'General Inquiry';
            const message = (messageInput ? messageInput.value : '').trim();
            const hp = hpInput ? hpInput.value.trim() : '';

            let hasError = false;

            if (!name) {
                showFieldError(nameInput, nameError, 'Please provide your full name.');
                hasError = true;
            }

            if (!email) {
                showFieldError(emailInput, emailError, 'Please provide your email address.');
                hasError = true;
            } else if (!validateEmailFormat(email)) {
                showFieldError(emailInput, emailError, 'Please enter a valid email address (e.g. name@domain.com).');
                hasError = true;
            }

            if (!message) {
                showFieldError(messageInput, messageError, 'Please provide your project vision or message.');
                hasError = true;
            } else if (message.length < 10) {
                showFieldError(messageInput, messageError, 'Message must be at least 10 characters long.');
                hasError = true;
            }

            if (hasError) {
                const firstInvalid = contactForm.querySelector('.input-error');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Loading state: Disable submit button & show sending animation
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.classList.add('is-loading');
            submitBtn.innerHTML = `
                <span class="btn-text">Sending your message...</span>
                <span class="icon-wrap">
                    <i class="fa-solid fa-circle-notch fa-spin"></i>
                </span>
            `;

            try {
                const payload = JSON.stringify({
                    name,
                    email,
                    phone,
                    subject,
                    message,
                    _hp_security_check: hp
                });

                let response = null;
                // Dual-endpoint resilience: try /api/contact (Node/Vercel) first, fallback to WordPress endpoint
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
                    response = await fetch('/index.php?siam_action=contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: payload
                    });
                }

                const data = await response.json().catch(() => ({}));

                if (response.ok && data.success) {
                    // Success State: Clear form & show single professional toast
                    contactForm.reset();
                    showToast(
                        'Message Sent Successfully!',
                        "Thank you for reaching out. Your message has been delivered successfully. I'll get back to you as soon as possible.",
                        'success',
                        6000
                    );
                } else {
                    // Error State: Log server info quietly, show clean non-technical single error toast
                    console.error('[Contact Dispatch Error]', data);
                    if (response.status === 429) {
                        showToast(
                            'Please Slow Down',
                            'You have sent multiple messages recently. Please wait a few moments before trying again.',
                            'error',
                            7000
                        );
                    } else {
                        showToast(
                            'Message Could Not Be Delivered',
                            'Something went wrong while sending your message. Please try again or contact me directly through email.',
                            'error',
                            7000
                        );
                    }
                }
            } catch (err) {
                console.error('[Contact Network Error]', err);
                showToast(
                    'Message Could Not Be Delivered',
                    'Something went wrong while sending your message. Please try again or contact me directly through email.',
                    'error',
                    7000
                );
            } finally {
                submitBtn.disabled = false;
                submitBtn.classList.remove('is-loading');
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            if (emailInput.value) {
                showToast('Subscription Confirmed', 'You are now subscribed to Siam\'s latest technology insights.', 'success');
                emailInput.value = '';
            }
        });
    }

    /* ==========================================================================
       12. SCROLL-TRIGGERED ENTRANCE ANIMATIONS (IntersectionObserver)
       ========================================================================== */
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const revealTargets = document.querySelectorAll(
            'section:not(#home), .scroll-reveal-init, .service-card, .service-card-premium, .portfolio-card, .timeline-item, .blog-card, .achievement-card'
        );

        const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.1
        });

        revealTargets.forEach(el => {
            el.classList.add('scroll-reveal-init');
            scrollRevealObserver.observe(el);
        });
    }
});

/* ==========================================================================
   12. MODAL DATA & FUNCTIONS (PROJECTS, SERVICES, CERTIFICATES, BLOG)
   ========================================================================== */
const projectsData = {
    1: {
        title: "SnapBook - Social Media Platform",
        tag: "Django & React Full-Stack",
        img: "assets/images/projects/snapbook.png",
        client: "Full-Stack Project",
        timeline: "Completed",
        tech: "Django, React, JavaScript, PostgreSQL, REST API",
        liveUrl: "https://snap-book-frontend.vercel.app/",
        githubUrl: "https://github.com/siamhossain7722/SnapBook_Frontend",
        desc: "SnapBook is a modern full-stack social media platform engineered for sharing photos, stories, and engaging with friends through a clean digital experience. Built with a scalable Django REST backend, token authentication, and a responsive React frontend."
    },
    2: {
        title: "Review Platform - Product Discovery & Reviews",
        tag: "Python & FastAPI Architecture",
        img: "assets/images/projects/review.png",
        client: "Web Application",
        timeline: "Completed",
        tech: "Python, FastAPI, Next.js, PostgreSQL, Tailwind CSS",
        liveUrl: "https://review-client-two.vercel.app/",
        githubUrl: "https://github.com/siamhossain7722/Review_Client",
        desc: "A high-performance product review platform designed for discovering top-rated products, comparing ratings, and sharing customer experiences through an ultra-fast web interface powered by FastAPI and Next.js."
    },
    3: {
        title: "Eventify - Event Management & Organization",
        tag: "Django & Database Engineering",
        img: "assets/images/projects/eventify.png",
        client: "Event Management Platform",
        timeline: "Completed",
        tech: "Django, PostgreSQL, JavaScript, Bootstrap",
        liveUrl: "https://new-event-managment.onrender.com/",
        githubUrl: "https://github.com/siamhossain7722/New",
        desc: "An intuitive event management platform allowing organizers and attendees to create, coordinate, and manage events with effortless scheduling, real-time database updates, and responsive mobile interfaces."
    },
    4: {
        title: "CPL Construction Services",
        tag: "Enterprise Platform & Machinery Rental",
        img: "assets/images/projects/cpl.png",
        client: "Constructive Partners Limited",
        timeline: "Production Deployment",
        tech: "Next.js, TypeScript, MongoDB, Firebase, Tailwind CSS",
        liveUrl: "https://www.constructivepartnerslimited.com/",
        githubUrl: "https://github.com/siamhossain7722/Constructions",
        desc: "A commercial service platform providing end-to-end building services, heavy equipment sales, machinery rentals, and building materials across Bangladesh. Features dynamic catalogs, responsive layouts, and modern Next.js frontend."
    },
    5: {
        title: "TaskFlow - Task & Team Management",
        tag: "Django & React Full-Stack",
        img: "assets/images/project-1.jpg",
        client: "Productivity Platform",
        timeline: "Completed",
        tech: "Django, React, REST API, PostgreSQL, Tailwind CSS",
        liveUrl: "https://github.com/siamhossain7722",
        githubUrl: "https://github.com/siamhossain7722",
        desc: "A scalable project and task management platform featuring real-time task tracking, board view, team collaboration, progress analytics, and modern RESTful API integrations."
    },
    6: {
        title: "Portfolio API - High-Performance Backend",
        tag: "Python & FastAPI Architecture",
        img: "assets/images/project-4.jpg",
        client: "Backend Infrastructure",
        timeline: "Production Deployment",
        tech: "Python, FastAPI, DRF, PostgreSQL, JWT Auth",
        liveUrl: "https://github.com/siamhossain7722",
        githubUrl: "https://github.com/siamhossain7722",
        desc: "A robust, high-performance RESTful API powering personal portfolio applications and client services with rate limiting, token-based authentication, structured caching, and auto-generated OpenAPI documentation."
    }
};

const certificatesData = {
    1: {
        title: "Dean's Awards (3x) & Vice Chancellor Award (1x)",
        org: "University of Asia Pacific",
        period: "2019 – 2024",
        category: "Academic Excellence",
        img: "assets/images/certificates/UAP.jpg",
        desc: "Honored with academic excellence awards (3x Dean's Awards and 1x Vice Chancellor Award) for consistently maintaining high CGPA across multiple semesters in the Department of Computer Science & Engineering at University of Asia Pacific."
    },
    2: {
        title: "CSE Fundamentals With Phitron",
        org: "Phitron.io",
        period: "Fall 2024",
        category: "Computer Science & Algorithms",
        img: "assets/images/certificates/Certificate_Phitron.jpg",
        desc: "Successfully completed intensive CSE Fundamentals With Phitron: Fall 2024 with a distinction CGPA of 3.67, mastering advanced C/C++ programming, data structures, algorithms, and practical software engineering."
    },
    3: {
        title: "The Science of Digital Marketing",
        org: "Urban Academy",
        period: "July 2026",
        category: "Professional Certification",
        img: "assets/images/certificates/UA.jpg",
        desc: "Graduated from the comprehensive 16-week Science of Digital Marketing programme, mastering marketing strategy, high-conversion copywriting, Meta & Google advertising, AI chatbot integration, and client campaign execution."
    },
    4: {
        title: "Pearson BTEC Level 5 Higher National Diploma (HND)",
        org: "Global Business Studies FZ LLC, Dubai (UAE)",
        period: "2024 – 2026",
        category: "Academic Diploma",
        img: "assets/images/certificates/GBS.jpg",
        desc: "Completed Pearson BTEC Level 5 Higher National Diploma in Digital Technologies (AI Solutions and Applications), focusing on advanced programming, cloud fundamentals, digital economy practices, and AI-driven business transformation."
    },
    5: {
        title: "Claude 101 Certification",
        org: "Anthropic",
        period: "2026",
        category: "AI & Prompt Engineering",
        img: "assets/images/certificates/Certificate_Claude.jpg",
        desc: "Successfully completed the official Claude 101 certification programme from Anthropic, gaining expertise in LLM system prompts, context management, AI agent workflows, and practical generative AI implementation."
    },
    6: {
        title: "Basic Food Safety – Food Service Training",
        org: "Zigma Quality Training Center",
        period: "September 2024",
        category: "Professional Training",
        img: "assets/images/certificates/food_safty.jpg",
        desc: "Successfully completed certified Basic Food Safety – Food Service Training programme designed according to industry and international quality and hygiene standards."
    }
};

const servicesData = {
    1: {
        title: "Backend Development & Django REST APIs",
        tag: "Backend & Systems",
        desc: "Designing and building scalable, robust backend architectures using Django and Django REST Framework. Creating clean, secure endpoints with JWT/OAuth authentication, database query optimization, and structured ORM models.",
        deliverables: ["Custom Django REST Framework APIs", "PostgreSQL & MySQL database design and schema migrations", "Secure token-based user authentication & permissions", "FastAPI microservices and high-throughput endpoints"]
    },
    2: {
        title: "Full-Stack Web & React Applications",
        tag: "Modern Frontend",
        desc: "Developing fast, responsive, and reactive web interfaces using React, Next.js, and TypeScript. Connecting seamlessly with backend APIs to deliver seamless user experiences and modern component-driven architectures.",
        deliverables: ["Single-Page Applications with React & Next.js", "State management with Redux / Context API", "Responsive CSS, Tailwind CSS & mobile-first UI", "Full API integration and asynchronous data flow"]
    },
    3: {
        title: "Digital Marketing & Growth Strategy",
        tag: "Digital Marketing",
        desc: "Driving qualified traffic, client acquisition, and measurable conversion growth. Experienced in paid acquisition through Meta Ads and Google Ads, content marketing, and data-backed digital campaign management.",
        deliverables: ["Meta Ads & Google Ads campaign strategy & management", "Conversion tracking & performance analytics", "Technical On-Page & Off-Page SEO audits", "Targeted copywriting and social media content execution"]
    },
    4: {
        title: "WordPress Management & AI Agent Implementation",
        tag: "CMS & Automation",
        desc: "Managing high-performance WordPress websites, custom theme integrations, plugin configurations, and exploring intelligent AI agent workflows to automate digital operations and customer interactions.",
        deliverables: ["Custom WordPress setup, themes, and plugin tuning", "Website speed optimization and security hardening", "AI agent setup for automated workflows and chatbots", "E-commerce & content management systems"]
    }
};

const blogsData = {
    1: {
        title: "Building Scalable REST APIs with Django & Django REST Framework",
        tag: "Backend Architecture",
        date: "October 2026",
        img: "assets/images/blog-1.jpg",
        content: `Designing sustainable APIs requires thoughtful serializer design, query prefetching to prevent N+1 queries, and robust authentication layers.
        <br><br>
        In this article, we walk through structuring Django REST Framework viewsets, optimizing PostgreSQL queries with select_related and prefetch_related, and implementing JWT token rotation for bulletproof security.`
    },
    2: {
        title: "Bridging Modern React & Next.js with Scalable Backend Systems",
        tag: "Full-Stack Development",
        date: "September 2026",
        img: "assets/images/blog-2.jpg",
        content: `Connecting modern frontend applications to robust API backends requires predictable state management, resilient caching, and clean type contracts.
        <br><br>
        Discover best practices for handling asynchronous API requests, setting up optimistic UI updates, and ensuring type safety from backend database models all the way to React components.`
    },
    3: {
        title: "How Developers Can Leverage AI Agents and Modern Automation",
        tag: "AI & Innovation",
        date: "August 2026",
        img: "assets/images/blog-3.jpg",
        content: `AI agents are rapidly transforming how developers automate repetitive workflows, customer support, and data aggregation.
        <br><br>
        We explore how integrating LLM prompts, structured outputs, and autonomous task pipelines can streamline everyday development and digital business workflows.`
    }
};

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
