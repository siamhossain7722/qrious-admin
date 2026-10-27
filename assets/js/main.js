/**
 * SIAM HOSSAIN - FULL STACK DEVELOPER PORTFOLIO
 * High-performance vanilla JavaScript logic, modals, filtering & interactive animations
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. TYPEWRITER EFFECT
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "Full Stack Developer.",
        "Django Developer.",
        "React Developer.",
        "API Engineer.",
        "Digital Marketing Manager.",
        "Software Developer."
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

    /* ==========================================================================
       3. OFFCANVAS SIDEBAR LOGIC
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const offcanvasSidebar = document.getElementById('offcanvas-sidebar');
    const offcanvasOverlay = document.getElementById('offcanvas-overlay');
    const offcanvasClose = document.getElementById('offcanvas-close');
    const offcanvasLinks = document.querySelectorAll('.offcanvas-nav a');

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
    function applyTheme(theme) {
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
    applyTheme(storedTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            showToast('Theme Updated', `Switched to ${newTheme} mode`, 'success');
        });
    });

    /* ==========================================================================
       5. IMPACT COUNTERS (Animated Number Increments)
       ========================================================================== */
    const counterElements = document.querySelectorAll('.counter-val');
    let countersStarted = false;

    function startCounters() {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 1800;
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
    const filterBtns = document.querySelectorAll('.portfolio-filter-tabs .filter-btn');
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
        if (!slides.length) return;
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
            const message = document.getElementById('contact-message').value.trim();
            const submitBtn = document.getElementById('submit-btn');

            if (!name || !email || !message) {
                showToast('Validation Error', 'Please complete all required fields.', 'error');
                return;
            }

            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending Dispatch...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                contactForm.reset();
                showToast('Message Received!', `Thank you ${name}! Your message has been received. Siam will get back to you shortly at ${email}.`, 'success');
            }, 1200);
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
