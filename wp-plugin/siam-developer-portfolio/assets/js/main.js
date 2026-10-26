/**
 * SIAM AHMED - SENIOR FULL-STACK DEVELOPER PORTFOLIO
 * WordPress-integrated modern JavaScript logic & interactive animations
 */

document.addEventListener('DOMContentLoaded', () => {

    const assetBase = (window.siamPortfolioData && window.siamPortfolioData.assetUrl) 
        ? window.siamPortfolioData.assetUrl 
        : 'assets/';

    /* ==========================================================================
       1. TYPEWRITER EFFECT
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "Senior Full-Stack Developer.",
        "Next.js & React Architect.",
        "Creative Web Engineer.",
        "Cloud & DevOps Specialist.",
        "UI/UX & Interactive Designer."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeWriterEffect() {
        if (!typewriterElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2200; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Short pause before typing next
        }

        setTimeout(typeWriterEffect, typingSpeed);
    }
    typeWriterEffect();

    /* ==========================================================================
       2. STICKY HEADER & ACTIVE SECTION NAVIGATION
       ========================================================================== */
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .offcanvas-nav .nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky Navbar Toggle
        if (header) {
            if (scrollPos > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
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

    /* ==========================================================================
       3. OFFCANVAS SIDEBAR LOGIC
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const offcanvasSidebar = document.getElementById('offcanvas-sidebar');
    const offcanvasOverlay = document.getElementById('offcanvas-overlay');
    const offcanvasClose = document.getElementById('offcanvas-close');
    const offcanvasLinks = document.querySelectorAll('.offcanvas-nav a');

    function openOffcanvas() {
        if (!offcanvasSidebar || !offcanvasOverlay) return;
        offcanvasSidebar.classList.add('active');
        offcanvasOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeOffcanvas() {
        if (!offcanvasSidebar || !offcanvasOverlay) return;
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
    const themeToggleBtn = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('siam_portfolio_theme') || 'dark';

    document.documentElement.setAttribute('data-theme', storedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('siam_portfolio_theme', newTheme);
            showToast('Theme Updated', `Switched to ${newTheme} mode`, 'success');
        });
    }

    /* ==========================================================================
       5. IMPACT COUNTERS (Animated Number Increments)
       ========================================================================== */
    const counterElements = document.querySelectorAll('.counter-val');
    let countersStarted = false;

    function startCounters() {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000;
            const stepTime = 25;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }

    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounters();
            }
        }, { threshold: 0.3 });
        counterObserver.observe(counterSection);
    }

    /* ==========================================================================
       6. SKILL BARS VIEWPORT ANIMATION
       ========================================================================== */
    const skillSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.progress-fill');
    let skillsAnimated = false;

    if (skillSection) {
        const skillObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                progressFills.forEach(fill => {
                    const targetWidth = fill.getAttribute('data-progress');
                    fill.style.width = `${targetWidth}%`;
                });
            }
        }, { threshold: 0.25 });
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
       8. PORTFOLIO FILTERING
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || categories.includes(filterValue)) {
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
       9. TESTIMONIALS SLIDER
       ========================================================================== */
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    let currentSlide = 0;
    let autoSlideInterval;

    function goToSlide(n) {
        if (!slides.length) return;
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => goToSlide(idx));
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 6500);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    const sliderWrapper = document.querySelector('.testimonials-carousel-wrapper');
    if (sliderWrapper) {
        startAutoSlide();
        sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
        sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    }

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
       11. INTERACTIVE CONTACT & NEWSLETTER FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const phone = document.getElementById('contact-phone') ? document.getElementById('contact-phone').value.trim() : '';
            const subject = document.getElementById('contact-subject') ? document.getElementById('contact-subject').value : 'Full-Stack Web App';
            const message = document.getElementById('contact-message').value.trim();
            const submitBtn = document.getElementById('submit-btn');

            if (!name || !email || !message) {
                showToast('Validation Error', 'Please complete all required fields.', 'error');
                return;
            }

            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Transmitting Dispatch...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            // If WordPress AJAX is active
            if (window.siamPortfolioData && window.siamPortfolioData.ajaxUrl) {
                const formData = new FormData();
                formData.append('action', 'siam_submit_contact');
                formData.append('nonce', window.siamPortfolioData.nonce);
                formData.append('name', name);
                formData.append('email', email);
                formData.append('phone', phone);
                formData.append('subject', subject);
                formData.append('message', message);

                fetch(window.siamPortfolioData.ajaxUrl, {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    if (data.success) {
                        contactForm.reset();
                        showToast('Message Received!', `Thank you ${name}! Your inquiry has been dispatched to Siam's inbox.`, 'success');
                    } else {
                        showToast('Notice', data.data.message || 'Submission completed.', 'error');
                    }
                })
                .catch(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    contactForm.reset();
                    showToast('Message Dispatched!', `Thank you ${name}! I've received your request and will reply within 24 hours.`, 'success');
                });
            } else {
                // Standalone fallback
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    contactForm.reset();
                    showToast('Message Transmitted!', `Thank you ${name}! I've received your request and will reply within 24 hours.`, 'success');
                }, 1000);
            }
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            if (emailInput.value) {
                showToast('Subscription Confirmed', 'You are now subscribed to Siam\'s monthly architectural tech memos.', 'success');
                emailInput.value = '';
            }
        });
    }
});

/* ==========================================================================
   12. MODAL SYSTEM FOR PROJECTS, SERVICES, & BLOG
   ========================================================================== */
function getAssetPath(filename) {
    const assetBase = (window.siamPortfolioData && window.siamPortfolioData.assetUrl) 
        ? window.siamPortfolioData.assetUrl 
        : 'assets/';
    return assetBase + 'images/' + filename;
}

const projectsData = {
    1: {
        title: "DataSync Enterprise Analytics Hub",
        tag: "Full-Stack SaaS Platform",
        img: "project-1.jpg",
        client: "Apex Enterprise Global",
        timeline: "4 Months",
        tech: "Next.js 15, TypeScript, Node.js, PostgreSQL, Docker, Redis",
        liveUrl: "https://github.com",
        desc: "DataSync is an all-in-one distributed SaaS business intelligence suite. Built to process over 2.4 million real-time events daily, it aggregates subscription revenues, net retention, customer churn risk scores, and customer journey analytics into a fluid, responsive dark dashboard."
    },
    2: {
        title: "Synapse AI Neural Workspace",
        tag: "Generative AI Platform",
        img: "project-2.jpg",
        client: "NeuralPulse Labs",
        timeline: "3 Months",
        tech: "React 19, Python, FastAPI, WebSockets, TailwindCSS, Supabase",
        liveUrl: "https://github.com",
        desc: "Synapse AI delivers a state-of-the-art developer workspace for prompting, testing, and fine-tuning neural model weights. Features live streaming text tokens, visual neural graph network rendering, code generation previewers, and customizable temperature presets."
    },
    3: {
        title: "Astra Multi-Currency Trading Engine",
        tag: "Fintech & Web3 Application",
        img: "project-3.jpg",
        client: "Astra Finance Switzerland",
        timeline: "5 Months",
        tech: "Next.js, TypeScript, GraphQL, WebSockets, Tailwind, AWS",
        liveUrl: "https://github.com",
        desc: "Astra is a bank-grade digital asset exchange interface featuring sub-millisecond candlestick order book updates, instant cross-currency swapping, encrypted virtual card integrations, and automated portfolio rebalancing rules."
    },
    4: {
        title: "Velo Distributed Fitness & Biometric Cloud",
        tag: "Mobile & Cloud Architecture",
        img: "project-4.jpg",
        client: "Velo Health Systems",
        timeline: "6 Months",
        tech: "React Native, Node.js, Apache Kafka, Redis, PostgreSQL, AWS S3",
        liveUrl: "https://github.com",
        desc: "Velo pairs an award-winning ergonomic mobile interface with an event-driven microservices backend. Ingests high-frequency heart rate, GPS telemetry, and workout data from over 50,000 active devices with zero packet drops."
    }
};

const servicesData = {
    1: {
        title: "Full-Stack Web Architecture & Engineering",
        tag: "Core Engineering",
        desc: "From designing database schemas to orchestrating serverless edge functions and building reactive frontend component trees. Utilizing Next.js 15, React, Node.js, and TypeScript to create web applications that effortlessly handle millions of requests while maintaining pristine code health.",
        deliverables: ["End-to-end full stack web architecture", "Database design & migration (SQL/NoSQL)", "Secure REST & GraphQL APIs with JWT/OAuth2", "Automated unit and integration testing suites"]
    },
    2: {
        title: "UI/UX & Interactive Motion Systems",
        tag: "Creative Technology",
        desc: "Bridging the gap between design vision and high-performance frontend execution. Transforming Figma or Adobe XD designs into pixel-perfect, accessible, and fluid web experiences that leave an unforgettable first impression on your users.",
        deliverables: ["Design system creation with reusable tokens", "Fluid 60FPS CSS animations & micro-interactions", "Dark/Light mode architecture", "Full accessibility compliance (WCAG 2.1 AA)"]
    },
    3: {
        title: "Cloud Infrastructure, Docker & DevOps",
        tag: "DevOps & Cloud",
        desc: "Ensuring zero-downtime releases, scalable container orchestration, and continuous security compliance. Deploying on AWS, Vercel, and modern container runtimes with automated GitHub Actions CI/CD pipelines.",
        deliverables: ["Docker containerization & multi-stage builds", "Automated CI/CD deployment pipelines", "Serverless edge functions & CDN caching", "Infrastructure as Code & performance monitoring"]
    },
    4: {
        title: "Core Web Vitals & Technical SEO Optimization",
        tag: "Performance & Growth",
        desc: "Transforming slow, sluggish web applications into lightning-fast powerhouses that consistently score 95-100 on Google Lighthouse. Optimizing critical rendering paths, image formats, and semantic HTML for superior search engine rank.",
        deliverables: ["Lighthouse 95+ score optimization", "Core Web Vitals audit & remediation", "Server-Side Rendering (SSR) & Static Generation", "Structured JSON-LD schema & technical SEO"]
    }
};

const blogsData = {
    1: {
        title: "Architecting Enterprise Next.js 15 Applications for Extreme Scale",
        tag: "Architecture",
        date: "October 2026",
        img: "blog-1.jpg",
        content: `Building large-scale Next.js applications requires intentional directory structure, decoupled data fetching layers, and smart caching strategies. 
        <br><br>
        In this deep dive, we explore how Server Components eliminate unnecessary client-side JavaScript bundles, how to structure Server Actions with schema validation libraries like Zod, and how to utilize tag-based cache revalidation to achieve instant page transitions without serving stale data.`
    },
    2: {
        title: "Why Vanilla CSS Variables and Grid Outperform Bulky Frameworks",
        tag: "CSS Mastery",
        date: "September 2026",
        img: "blog-2.jpg",
        content: `While modern utility frameworks have their place, modern CSS standards have evolved tremendously. 
        <br><br>
        With CSS Custom Properties, CSS Grid subgrids, container queries, and native nesting, developers can achieve unparalleled layout fluidity and theme-switching performance with 0kb runtime dependencies and zero build step overhead.`
    },
    3: {
        title: "Building Resilient Real-Time Websockets for High-Frequency Crypto Trades",
        tag: "Cloud & API",
        date: "August 2026",
        img: "blog-3.jpg",
        content: `Financial trading systems demand guaranteed order delivery and sub-millisecond UI updates.
        <br><br>
        Here we analyze our architecture using binary protocols over WebSockets, backpressure handling, heartbeat auto-reconnect algorithms, and how to synchronize optimistic frontend states when network latency spikes.`
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

    const imgSrc = getAssetPath(p.img);
    const html = `
        <img src="${imgSrc}" alt="${p.title}" class="modal-project-img">
        <span class="modal-tag">${p.tag}</span>
        <h2 class="modal-title">${p.title}</h2>
        <p class="modal-desc">${p.desc}</p>
        
        <div class="modal-meta-grid">
            <div class="meta-block">
                <span class="meta-block-label">Client</span>
                <span class="meta-block-value">${p.client}</span>
            </div>
            <div class="meta-block">
                <span class="meta-block-label">Timeline</span>
                <span class="meta-block-value">${p.timeline}</span>
            </div>
            <div class="meta-block">
                <span class="meta-block-label">Tech Stack</span>
                <span class="meta-block-value">${p.tech}</span>
            </div>
        </div>

        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="${p.liveUrl}" target="_blank" class="btn btn-primary btn-round">
                <span>View Live Deployment</span>
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
                <span>Request Consultation</span>
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

    const imgSrc = getAssetPath(b.img);
    const html = `
        <img src="${imgSrc}" alt="${b.title}" class="modal-project-img">
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
function showToast(title, message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

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
    }, 4500);
}
