<?php
/**
 * SIAM AHMED - SENIOR FULL-STACK DEVELOPER PORTFOLIO
 * WordPress Page Template
 */

if (!defined('ABSPATH')) {
    exit;
}

$dev_name   = get_option('siam_portfolio_name', 'Siam Ahmed');
$dev_role   = get_option('siam_portfolio_role', 'Senior Full-Stack Developer');
$dev_email  = get_option('siam_portfolio_email', 'siam.ahmed@example.com');
$dev_phone  = get_option('siam_portfolio_phone', '+880 1700-000000');
$avatar_url = get_option('siam_portfolio_avatar_url');

if (empty($avatar_url)) {
    $avatar_url = SIAM_PORTFOLIO_URL . 'assets/images/user-profile.jpg';
}

$logo_url = SIAM_PORTFOLIO_URL . 'assets/images/logo.jpg';
$alt_avatar_url = SIAM_PORTFOLIO_URL . 'assets/images/developer-alt.jpg';
$p1_url = SIAM_PORTFOLIO_URL . 'assets/images/project-1.jpg';
$p2_url = SIAM_PORTFOLIO_URL . 'assets/images/project-2.jpg';
$p3_url = SIAM_PORTFOLIO_URL . 'assets/images/project-3.jpg';
$p4_url = SIAM_PORTFOLIO_URL . 'assets/images/project-4.jpg';
$b1_url = SIAM_PORTFOLIO_URL . 'assets/images/blog-1.jpg';
$b2_url = SIAM_PORTFOLIO_URL . 'assets/images/blog-2.jpg';
$b3_url = SIAM_PORTFOLIO_URL . 'assets/images/blog-3.jpg';
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="dark">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo esc_html($dev_name); ?> | <?php echo esc_html($dev_role); ?></title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="<?php echo esc_url(SIAM_PORTFOLIO_URL . 'assets/css/style.css?v=' . SIAM_PORTFOLIO_VERSION); ?>">

    <style>
        /* Overrides to ensure complete full-bleed canvas across any WordPress theme */
        html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
        }
        #wpadminbar {
            opacity: 0.85;
            transition: opacity 0.2s;
        }
        #wpadminbar:hover {
            opacity: 1;
        }
        body.admin-bar .main-header {
            top: 32px;
        }
        @media screen and (max-width: 782px) {
            body.admin-bar .main-header {
                top: 46px;
            }
        }
    </style>

    <?php wp_head(); ?>
</head>
<body <?php body_class('siam-portfolio-body'); ?>>

    <!-- Toast Notification Container -->
    <div id="toast-container" class="toast-container"></div>

    <!-- Offcanvas Navigation Sidebar -->
    <div id="offcanvas-overlay" class="offcanvas-overlay"></div>
    <aside id="offcanvas-sidebar" class="offcanvas-sidebar">
        <div class="offcanvas-header">
            <a href="#" class="brand-logo">
                <img src="<?php echo esc_url($logo_url); ?>" alt="Siam Logo" class="brand-logo-img">
                <span>Siam<span class="logo-dot">.</span>dev</span>
            </a>
            <button id="offcanvas-close" class="close-btn" aria-label="Close menu">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="offcanvas-body">
            <div class="offcanvas-profile">
                <div class="profile-img-wrap">
                    <img src="<?php echo esc_url($avatar_url); ?>" alt="<?php echo esc_attr($dev_name); ?>" class="sidebar-avatar">
                    <span class="status-indicator" title="Available for hire"></span>
                </div>
                <h4 class="profile-name"><?php echo esc_html($dev_name); ?></h4>
                <p class="profile-role"><?php echo esc_html($dev_role); ?></p>
                <div class="profile-badges">
                    <span class="mini-badge">Full-Stack</span>
                    <span class="mini-badge">Next.js</span>
                    <span class="mini-badge">Architect</span>
                </div>
            </div>

            <nav class="offcanvas-nav">
                <ul>
                    <li><a href="#home" class="nav-link active"><i class="fa-regular fa-house"></i> Home</a></li>
                    <li><a href="#about" class="nav-link"><i class="fa-regular fa-user"></i> About</a></li>
                    <li><a href="#services" class="nav-link"><i class="fa-regular fa-layer-group"></i> Services</a></li>
                    <li><a href="#skills" class="nav-link"><i class="fa-regular fa-code"></i> Skills</a></li>
                    <li><a href="#experience" class="nav-link"><i class="fa-regular fa-briefcase"></i> Experience</a></li>
                    <li><a href="#portfolio" class="nav-link"><i class="fa-regular fa-folder-open"></i> Portfolio</a></li>
                    <li><a href="#testimonials" class="nav-link"><i class="fa-regular fa-comments"></i> Testimonials</a></li>
                    <li><a href="#blog" class="nav-link"><i class="fa-regular fa-newspaper"></i> Blog</a></li>
                    <li><a href="#contact" class="nav-link"><i class="fa-regular fa-paper-plane"></i> Contact</a></li>
                </ul>
            </nav>

            <div class="offcanvas-contact-info">
                <h5>Get In Touch</h5>
                <p><i class="fa-solid fa-envelope"></i> <?php echo esc_html($dev_email); ?></p>
                <p><i class="fa-solid fa-phone"></i> <?php echo esc_html($dev_phone); ?></p>
                <p><i class="fa-solid fa-location-dot"></i> Dhaka, Bangladesh (Global Remote)</p>
            </div>

            <div class="offcanvas-socials">
                <a href="https://github.com" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
                <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="https://dribbble.com" target="_blank" aria-label="Dribbble"><i class="fa-brands fa-dribbble"></i></a>
            </div>
        </div>
    </aside>

    <!-- Header / Navbar -->
    <header id="main-header" class="main-header">
        <div class="header-container container">
            <!-- Brand Logo -->
            <a href="#" class="brand-logo">
                <img src="<?php echo esc_url($logo_url); ?>" alt="Siam Logo" class="brand-logo-img">
                <span>Siam<span class="logo-dot">.</span>dev</span>
            </a>

            <!-- Desktop Menu -->
            <nav class="desktop-nav">
                <ul class="nav-list">
                    <li><a href="#home" class="nav-link active">Home</a></li>
                    <li><a href="#about" class="nav-link">About</a></li>
                    <li><a href="#services" class="nav-link">Services</a></li>
                    <li><a href="#skills" class="nav-link">Skills</a></li>
                    <li><a href="#experience" class="nav-link">Experience</a></li>
                    <li><a href="#portfolio" class="nav-link">Portfolio</a></li>
                    <li><a href="#testimonials" class="nav-link">Reviews</a></li>
                    <li><a href="#blog" class="nav-link">Blog</a></li>
                    <li><a href="#contact" class="nav-link">Contact</a></li>
                </ul>
            </nav>

            <!-- Header Actions -->
            <div class="header-actions">
                <!-- Theme Switcher -->
                <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle theme">
                    <i class="fa-solid fa-sun icon-sun"></i>
                    <i class="fa-solid fa-moon icon-moon"></i>
                </button>

                <!-- Header CTA Button -->
                <a href="#contact" class="btn btn-primary btn-round header-cta d-none-mobile">
                    <span>Hire Me</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </a>

                <!-- Hamburger Menu Button -->
                <button id="hamburger-btn" class="hamburger-btn" aria-label="Open mobile menu">
                    <span class="bar bar-1"></span>
                    <span class="bar bar-2"></span>
                    <span class="bar bar-3"></span>
                </button>
            </div>
        </div>
    </header>

    <main>
        <!-- Hero Section -->
        <section id="home" class="hero-section">
            <div class="container hero-container">
                <div class="hero-grid">
                    <!-- Left Column: Content -->
                    <div class="hero-content">
                        <div class="hero-badge">
                            <span class="badge-dot"></span>
                            <span>AVAILABLE FOR EXCLUSIVE PROJECTS</span>
                        </div>
                        <h1 class="hero-title">
                            Hello, I'm <span class="highlight-text"><?php echo esc_html($dev_name); ?></span>
                            <br>
                            <span class="typed-wrapper">
                                a <span id="typewriter" class="gradient-text"></span><span class="cursor">&nbsp;</span>
                            </span>
                        </h1>
                        <p class="hero-description">
                            Crafting high-octane web ecosystems, modern Next.js architectures, and immersive interactive digital experiences. Focused on clean code, cutting-edge performance, and seamless user experiences.
                        </p>

                        <!-- Tech Pills Strip -->
                        <div class="hero-tech-strip">
                            <span class="tech-tag"><i class="fa-brands fa-react"></i> Next.js 15</span>
                            <span class="tech-tag"><i class="fa-brands fa-js"></i> TypeScript</span>
                            <span class="tech-tag"><i class="fa-brands fa-node"></i> Node.js</span>
                            <span class="tech-tag"><i class="fa-solid fa-database"></i> PostgreSQL</span>
                            <span class="tech-tag"><i class="fa-brands fa-docker"></i> Docker</span>
                        </div>

                        <!-- CTA Buttons -->
                        <div class="hero-buttons">
                            <a href="#portfolio" class="btn btn-primary btn-round btn-icon-flip">
                                <span class="btn-text">View Portfolio</span>
                                <span class="icon-wrap">
                                    <i class="fa-solid fa-arrow-right icon-main"></i>
                                    <i class="fa-solid fa-arrow-right icon-alt"></i>
                                </span>
                            </a>
                            <a href="#contact" class="btn btn-secondary btn-round">
                                <i class="fa-regular fa-calendar-check"></i>
                                <span>Book A Call</span>
                            </a>
                        </div>

                        <!-- Social Links Row -->
                        <div class="hero-social-row">
                            <span class="social-label">Find Me On:</span>
                            <div class="social-links">
                                <a href="https://github.com" target="_blank" class="social-icon" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
                                <a href="https://linkedin.com" target="_blank" class="social-icon" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                                <a href="https://twitter.com" target="_blank" class="social-icon" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                                <a href="https://dribbble.com" target="_blank" class="social-icon" aria-label="Dribbble"><i class="fa-brands fa-dribbble"></i></a>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Visual Showcase -->
                    <div class="hero-visual">
                        <!-- Kinetic Background Outline Typography -->
                        <div class="kinetic-text kinetic-text-1">SENIOR ARCHITECT</div>
                        <div class="kinetic-text kinetic-text-2">FULL STACK DEVELOPER</div>

                        <!-- Image Showcase Card -->
                        <div class="hero-image-wrapper">
                            <div class="hero-glow-effect"></div>
                            <div class="image-frame">
                                <img src="<?php echo esc_url($avatar_url); ?>" alt="<?php echo esc_attr($dev_name); ?> Developer" class="hero-img">
                            </div>

                            <!-- Floating Stat Card 1 -->
                            <div class="floating-badge badge-exp">
                                <div class="badge-icon"><i class="fa-solid fa-award"></i></div>
                                <div class="badge-details">
                                    <span class="badge-num">08+</span>
                                    <span class="badge-txt">Years In Tech</span>
                                </div>
                            </div>

                            <!-- Floating Stat Card 2 -->
                            <div class="floating-badge badge-completed">
                                <div class="badge-icon"><i class="fa-solid fa-code-merge"></i></div>
                                <div class="badge-details">
                                    <span class="badge-num">150+</span>
                                    <span class="badge-txt">Projects Shipped</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Core Capabilities / Services 4-Column Section -->
        <section id="services" class="services-area section-gap">
            <div class="container">
                <div class="section-header text-center">
                    <span class="section-tag">SPECIALIZED EXPERTISE</span>
                    <h2 class="section-title">What I Bring To The Table</h2>
                    <p class="section-subtitle">Delivering high-performance architecture, clean engineering, and pixel-perfect design systems.</p>
                </div>

                <div class="services-grid">
                    <!-- Service 1 -->
                    <div class="service-card" data-service-id="1">
                        <div class="service-card-top">
                            <div class="service-icon-box">
                                <i class="fa-solid fa-cubes"></i>
                            </div>
                            <span class="project-count">48 Projects</span>
                        </div>
                        <h3 class="service-title">Full-Stack Web Apps</h3>
                        <p class="service-desc">End-to-end full stack development using Next.js 15, React, Node.js, and TypeScript with robust edge computing and secure APIs.</p>
                        <a href="javascript:void(0)" class="service-more-link" onclick="openServiceModal(1)">
                            <span>Explore Details</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>

                    <!-- Service 2 -->
                    <div class="service-card" data-service-id="2">
                        <div class="service-card-top">
                            <div class="service-icon-box">
                                <i class="fa-solid fa-bezier-curve"></i>
                            </div>
                            <span class="project-count">36 Projects</span>
                        </div>
                        <h3 class="service-title">UI/UX & Interactive Design</h3>
                        <p class="service-desc">Translating complex workflows into intuitive, slick UI systems with smooth fluid animations, dark modes, and glassmorphism.</p>
                        <a href="javascript:void(0)" class="service-more-link" onclick="openServiceModal(2)">
                            <span>Explore Details</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>

                    <!-- Service 3 -->
                    <div class="service-card" data-service-id="3">
                        <div class="service-card-top">
                            <div class="service-icon-box">
                                <i class="fa-solid fa-cloud-bolt"></i>
                            </div>
                            <span class="project-count">42 Projects</span>
                        </div>
                        <h3 class="service-title">Cloud & DevOps Architecture</h3>
                        <p class="service-desc">Automated CI/CD pipelines, containerization with Docker, scalable microservices, AWS deployment, and database clustering.</p>
                        <a href="javascript:void(0)" class="service-more-link" onclick="openServiceModal(3)">
                            <span>Explore Details</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>

                    <!-- Service 4 -->
                    <div class="service-card" data-service-id="4">
                        <div class="service-card-top">
                            <div class="service-icon-box">
                                <i class="fa-solid fa-gauge-high"></i>
                            </div>
                            <span class="project-count">24 Projects</span>
                        </div>
                        <h3 class="service-title">Core Web Vitals & SEO</h3>
                        <p class="service-desc">Turbocharging site speed, lighthouse 100/100 scores, server-side caching, and semantic technical SEO for top search rankings.</p>
                        <a href="javascript:void(0)" class="service-more-link" onclick="openServiceModal(4)">
                            <span>Explore Details</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats & Impact Counters Section -->
        <section class="counter-section">
            <div class="container">
                <div class="counter-wrapper glass-panel">
                    <div class="counter-left">
                        <div class="counter-highlight-box">
                            <div class="highlight-number-wrap">
                                <span class="counter-val highlight-num" data-target="8">0</span>
                                <span class="highlight-plus">+</span>
                            </div>
                            <h3 class="highlight-title">Years of Elite <br>Engineering</h3>
                        </div>
                        <p class="highlight-para">Helping global startups and enterprises scale their technology stacks from initial ideation to multi-million user deployments.</p>
                    </div>

                    <div class="counter-right-grid">
                        <div class="metric-card">
                            <div class="metric-number-wrap">
                                <span class="counter-val" data-target="150">0</span>
                                <span class="metric-suffix">+</span>
                            </div>
                            <p class="metric-label">Completed Projects</p>
                        </div>

                        <div class="metric-card">
                            <div class="metric-number-wrap">
                                <span class="counter-val" data-target="45">0</span>
                                <span class="metric-suffix">+</span>
                            </div>
                            <p class="metric-label">Enterprise Clients</p>
                        </div>

                        <div class="metric-card">
                            <div class="metric-number-wrap">
                                <span class="counter-val" data-target="99">0</span>
                                <span class="metric-suffix">.9%</span>
                            </div>
                            <p class="metric-label">Client Satisfaction</p>
                        </div>

                        <div class="metric-card">
                            <div class="metric-number-wrap">
                                <span class="counter-val" data-target="18">0</span>
                                <span class="metric-suffix">+</span>
                            </div>
                            <p class="metric-label">Tech Honors & Awards</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Technical Mastery & Skills Section -->
        <section id="skills" class="skills-section section-gap">
            <div class="container">
                <div class="section-header text-center">
                    <span class="section-tag">PROFICIENCY & STACK</span>
                    <h2 class="section-title">Technical Mastery</h2>
                    <p class="section-subtitle">A balanced fusion of robust software engineering, scalable cloud systems, and modern visual design.</p>
                </div>

                <div class="skills-grid">
                    <div class="skill-category-card">
                        <div class="category-header">
                            <div class="cat-icon"><i class="fa-solid fa-code"></i></div>
                            <div>
                                <h3 class="cat-title">Frontend Engineering & UI</h3>
                                <p class="cat-desc">Modern web interfaces, performance & state</p>
                            </div>
                        </div>

                        <div class="skill-bars">
                            <div class="skill-bar-item">
                                <div class="skill-info">
                                    <span class="skill-name">Next.js 15 & React 19</span>
                                    <span class="skill-percent">96%</span>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill" data-progress="96"></div>
                                </div>
                            </div>

                            <div class="skill-bar-item">
                                <div class="skill-info">
                                    <span class="skill-name">TypeScript & Modern JavaScript (ESNext)</span>
                                    <span class="skill-percent">94%</span>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill" data-progress="94"></div>
                                </div>
                            </div>

                            <div class="skill-bar-item">
                                <div class="skill-info">
                                    <span class="skill-name">Vanilla CSS3, Flexbox/Grid & Animations</span>
                                    <span class="skill-percent">98%</span>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill" data-progress="98"></div>
                                </div>
                            </div>

                            <div class="skill-bar-item">
                                <div class="skill-info">
                                    <span class="skill-name">TailwindCSS, SASS & Design Systems</span>
                                    <span class="skill-percent">90%</span>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill" data-progress="90"></div>
                                </div>
                            </div>

                            <div class="skill-bar-item">
                                <div class="skill-info">
                                    <span class="skill-name">Figma to Pixel-Perfect Code</span>
                                    <span class="skill-percent">92%</span>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill" data-progress="92"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="skill-category-card">
                        <div class="category-header">
                            <div class="cat-icon"><i class="fa-solid fa-server"></i></div>
                            <div>
                                <h3 class="cat-title">Backend, Cloud & Databases</h3>
                                <p class="cat-desc">Microservices, APIs & distributed data</p>
                            </div>
                        </div>

                        <div class="skill-bars">
                            <div class="skill-bar-item">
                                <div class="skill-info">
                                    <span class="skill-name">Node.js, Express & NestJS</span>
                                    <span class="skill-percent">92%</span>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill" data-progress="92"></div>
                                </div>
                            </div>

                            <div class="skill-bar-item">
                                <div class="skill-info">
                                    <span class="skill-name">PostgreSQL, Prisma ORM & MongoDB</span>
                                    <span class="skill-percent">88%</span>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill" data-progress="88"></div>
                                </div>
                            </div>

                            <div class="skill-bar-item">
                                <div class="skill-info">
                                    <span class="skill-name">Docker, CI/CD & DevOps Automations</span>
                                    <span class="skill-percent">85%</span>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill" data-progress="85"></div>
                                </div>
                            </div>

                            <div class="skill-bar-item">
                                <div class="skill-info">
                                    <span class="skill-name">GraphQL & RESTful API Architecture</span>
                                    <span class="skill-percent">95%</span>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill" data-progress="95"></div>
                                </div>
                            </div>

                            <div class="skill-bar-item">
                                <div class="skill-info">
                                    <span class="skill-name">AWS, Vercel & Supabase Cloud</span>
                                    <span class="skill-percent">87%</span>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill" data-progress="87"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tech-badge-cloud">
                    <span class="cloud-pill"><i class="fa-brands fa-react text-cyan"></i> React</span>
                    <span class="cloud-pill"><i class="fa-brands fa-node-js text-green"></i> Node.js</span>
                    <span class="cloud-pill"><i class="fa-brands fa-square-js text-yellow"></i> JavaScript</span>
                    <span class="cloud-pill"><i class="fa-brands fa-python text-blue"></i> Python</span>
                    <span class="cloud-pill"><i class="fa-brands fa-git-alt text-orange"></i> Git</span>
                    <span class="cloud-pill"><i class="fa-brands fa-docker text-blue"></i> Docker</span>
                    <span class="cloud-pill"><i class="fa-brands fa-aws text-yellow"></i> AWS</span>
                    <span class="cloud-pill"><i class="fa-brands fa-figma text-purple"></i> Figma</span>
                    <span class="cloud-pill"><i class="fa-brands fa-html5 text-orange"></i> HTML5</span>
                    <span class="cloud-pill"><i class="fa-brands fa-css3-alt text-blue"></i> CSS3</span>
                    <span class="cloud-pill"><i class="fa-solid fa-database text-green"></i> PostgreSQL</span>
                </div>
            </div>
        </section>

        <!-- Featured Strategy Section -->
        <section class="strategy-section section-gap">
            <div class="container">
                <div class="strategy-grid">
                    <div class="strategy-left">
                        <div class="section-tag">ENGINEERING PHILOSOPHY</div>
                        <h2 class="section-title">Inspiring The Digital World, <br><span class="gradient-text">One Line at a Time</span></h2>
                        <p class="section-subtitle mb-4">I believe that sustainable software architecture and expressive aesthetics go hand in hand. Every project is crafted for ultra-low latency, clean readability, and modular growth.</p>

                        <div class="strategy-cards">
                            <div class="strategy-card active">
                                <div class="strategy-num">01.</div>
                                <div class="strategy-info">
                                    <h4 class="strat-title">Architectural Precision & Discovery</h4>
                                    <p class="strat-desc">Thorough system design, data modeling, and performance benchmarking before committing code.</p>
                                </div>
                            </div>

                            <div class="strategy-card">
                                <div class="strategy-num">02.</div>
                                <div class="strategy-info">
                                    <h4 class="strat-title">Pixel-Perfect & Human-Centric UI</h4>
                                    <p class="strat-desc">Creating ergonomic user workflows with responsive typography, micro-interactions, and high accessibility (WCAG AA).</p>
                                </div>
                            </div>

                            <div class="strategy-card">
                                <div class="strategy-num">03.</div>
                                <div class="strategy-info">
                                    <h4 class="strat-title">Continuous Deployment & Edge Speed</h4>
                                    <p class="strat-desc">Automated testing, zero-downtime serverless deployments, and intelligent edge caching for instant load times.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="strategy-right">
                        <div class="strategy-image-box">
                            <div class="glow-backdrop"></div>
                            <img src="<?php echo esc_url($alt_avatar_url); ?>" alt="Developer Studio" class="strategy-img">
                            <div class="code-overlay-card">
                                <div class="card-code-header">
                                    <span class="circle-dot red"></span>
                                    <span class="circle-dot yellow"></span>
                                    <span class="circle-dot green"></span>
                                    <span class="card-filename">PerformanceBenchmark.ts</span>
                                </div>
                                <pre class="code-snippet"><code><span class="keyword">const</span> metrics = <span class="keyword">await</span> analyze({
  firstContentfulPaint: <span class="string">"0.28s"</span>,
  timeToInteractive: <span class="string">"0.45s"</span>,
  lighthouseScore: <span class="number">100</span>,
  status: <span class="string">"PRODUCTION_READY"</span>
});</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Career & Education Experience Timeline -->
        <section id="experience" class="experience-section section-gap">
            <div class="container">
                <div class="section-header text-center">
                    <span class="section-tag">TRACK RECORD</span>
                    <h2 class="section-title">Education & Career Journey</h2>
                    <p class="section-subtitle">A journey of continuous learning, leadership, and shipping world-class digital products.</p>
                </div>

                <div class="journey-grid">
                    <div class="journey-column">
                        <div class="journey-heading">
                            <i class="fa-solid fa-briefcase"></i>
                            <h3>Professional Experience</h3>
                        </div>

                        <div class="timeline-items">
                            <div class="timeline-card">
                                <div class="timeline-badge">2023 - Present</div>
                                <h4 class="role-title">Lead Full-Stack Architect</h4>
                                <h5 class="company-name">Apex Innovations Labs &bull; Remote</h5>
                                <p class="role-desc">Architecting distributed SaaS platforms with Next.js, GraphQL, and microservices. Mentoring frontend teams and reducing load times by 62%.</p>
                            </div>

                            <div class="timeline-card">
                                <div class="timeline-badge">2020 - 2023</div>
                                <h4 class="role-title">Senior Frontend Engineer</h4>
                                <h5 class="company-name">CloudScale Global &bull; Hybrid</h5>
                                <p class="role-desc">Built enterprise-level dashboard components, real-time analytics engines, and comprehensive design systems used by over 80,000 active users.</p>
                            </div>

                            <div class="timeline-card">
                                <div class="timeline-badge">2018 - 2020</div>
                                <h4 class="role-title">Full-Stack Web Developer</h4>
                                <h5 class="company-name">Nexus Digital Studio</h5>
                                <p class="role-desc">Engineered client portals, RESTful API services, and responsive web applications for fintech and international e-commerce clients.</p>
                            </div>
                        </div>
                    </div>

                    <div class="journey-column">
                        <div class="journey-heading">
                            <i class="fa-solid fa-graduation-cap"></i>
                            <h3>Education & Certifications</h3>
                        </div>

                        <div class="timeline-items">
                            <div class="timeline-card">
                                <div class="timeline-badge">2016 - 2020</div>
                                <h4 class="role-title">B.Sc. in Computer Science & Engineering</h4>
                                <h5 class="company-name">University of Engineering & Technology</h5>
                                <p class="role-desc">Major in Software Engineering, Algorithms & Data Structures. Graduated with Magna Cum Laude honors and Dean's List recognition.</p>
                            </div>

                            <div class="timeline-card">
                                <div class="timeline-badge">2022</div>
                                <h4 class="role-title">AWS Certified Solutions Architect</h4>
                                <h5 class="company-name">Amazon Web Services</h5>
                                <p class="role-desc">Credential in architecting scalable, resilient, highly available, and cost-optimized distributed systems on the AWS cloud ecosystem.</p>
                            </div>

                            <div class="timeline-card">
                                <div class="timeline-badge">2021</div>
                                <h4 class="role-title">Full-Stack Cloud & DevOps Mastery</h4>
                                <h5 class="company-name">Linux Foundation & Docker Institute</h5>
                                <p class="role-desc">Specialized in modern container orchestration, Kubernetes, automated CI/CD pipelines, and secure infrastructure as code (IaC).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Brands Marquee Section -->
        <section class="partners-marquee-section">
            <div class="container">
                <p class="marquee-title">TRUSTED TECH STACK & TOOLS I WORK WITH</p>
            </div>
            <div class="marquee-track">
                <div class="marquee-content">
                    <span class="marquee-item"><i class="fa-brands fa-github"></i> GITHUB</span>
                    <span class="marquee-item"><i class="fa-brands fa-aws"></i> AWS CLOUD</span>
                    <span class="marquee-item"><i class="fa-brands fa-docker"></i> DOCKER</span>
                    <span class="marquee-item"><i class="fa-brands fa-react"></i> NEXT.JS</span>
                    <span class="marquee-item"><i class="fa-brands fa-node"></i> NODE.JS</span>
                    <span class="marquee-item"><i class="fa-brands fa-figma"></i> FIGMA</span>
                    <span class="marquee-item"><i class="fa-brands fa-python"></i> FASTAPI</span>
                    <span class="marquee-item"><i class="fa-solid fa-database"></i> POSTGRESQL</span>
                    <span class="marquee-item"><i class="fa-brands fa-stripe"></i> STRIPE PAY</span>
                </div>
                <div class="marquee-content" aria-hidden="true">
                    <span class="marquee-item"><i class="fa-brands fa-github"></i> GITHUB</span>
                    <span class="marquee-item"><i class="fa-brands fa-aws"></i> AWS CLOUD</span>
                    <span class="marquee-item"><i class="fa-brands fa-docker"></i> DOCKER</span>
                    <span class="marquee-item"><i class="fa-brands fa-react"></i> NEXT.JS</span>
                    <span class="marquee-item"><i class="fa-brands fa-node"></i> NODE.JS</span>
                    <span class="marquee-item"><i class="fa-brands fa-figma"></i> FIGMA</span>
                    <span class="marquee-item"><i class="fa-brands fa-python"></i> FASTAPI</span>
                    <span class="marquee-item"><i class="fa-solid fa-database"></i> POSTGRESQL</span>
                    <span class="marquee-item"><i class="fa-brands fa-stripe"></i> STRIPE PAY</span>
                </div>
            </div>
        </section>

        <!-- Latest Portfolio / Projects Showcase Section -->
        <section id="portfolio" class="portfolio-section section-gap">
            <div class="container">
                <div class="section-header text-center">
                    <span class="section-tag">FEATURED CREATIONS</span>
                    <h2 class="section-title">Recent Selected Projects</h2>
                    <p class="section-subtitle">Real-world production applications built with passion, scalability, and extreme attention to detail.</p>
                </div>

                <div class="portfolio-filter-tabs">
                    <button class="filter-btn active" data-filter="all">All Projects</button>
                    <button class="filter-btn" data-filter="fullstack">Full-Stack Apps</button>
                    <button class="filter-btn" data-filter="ai">AI & SaaS</button>
                    <button class="filter-btn" data-filter="fintech">Fintech & Mobile</button>
                </div>

                <div class="portfolio-grid">
                    <!-- Project 1 -->
                    <div class="portfolio-card" data-category="fullstack ai" onclick="openProjectModal(1)">
                        <div class="project-img-box">
                            <img src="<?php echo esc_url($p1_url); ?>" alt="DataSync SaaS Dashboard" class="project-img">
                            <div class="project-overlay">
                                <span class="view-btn"><i class="fa-solid fa-magnifying-glass-plus"></i> View Case Study</span>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="info-meta">
                                <span class="project-cat">Full-Stack SaaS</span>
                                <h3 class="project-title">DataSync Enterprise Analytics</h3>
                                <p class="project-desc">A unified real-time analytics hub aggregating revenue metrics, churn predictions, and customer KPIs.</p>
                            </div>
                            <div class="arrow-btn-wrap">
                                <div class="arrow-btn-inner">
                                    <i class="fa-solid fa-arrow-up-right arrow-1"></i>
                                    <i class="fa-solid fa-arrow-up-right arrow-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project 2 -->
                    <div class="portfolio-card" data-category="ai fullstack" onclick="openProjectModal(2)">
                        <div class="project-img-box">
                            <img src="<?php echo esc_url($p2_url); ?>" alt="Synapse AI Platform" class="project-img">
                            <div class="project-overlay">
                                <span class="view-btn"><i class="fa-solid fa-magnifying-glass-plus"></i> View Case Study</span>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="info-meta">
                                <span class="project-cat">Generative AI Web App</span>
                                <h3 class="project-title">Synapse AI Neural Workspace</h3>
                                <p class="project-desc">Interactive multimodal prompt studio with dynamic model parameter controls and streaming responses.</p>
                            </div>
                            <div class="arrow-btn-wrap">
                                <div class="arrow-btn-inner">
                                    <i class="fa-solid fa-arrow-up-right arrow-1"></i>
                                    <i class="fa-solid fa-arrow-up-right arrow-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project 3 -->
                    <div class="portfolio-card" data-category="fintech fullstack" onclick="openProjectModal(3)">
                        <div class="project-img-box">
                            <img src="<?php echo esc_url($p3_url); ?>" alt="Astra Finance Platform" class="project-img">
                            <div class="project-overlay">
                                <span class="view-btn"><i class="fa-solid fa-magnifying-glass-plus"></i> View Case Study</span>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="info-meta">
                                <span class="project-cat">Fintech & Web3</span>
                                <h3 class="project-title">Astra Multi-Currency Trading</h3>
                                <p class="project-desc">Modern cross-platform portfolio tracker, real-time candlestick charts, and instant crypto swapping engine.</p>
                            </div>
                            <div class="arrow-btn-wrap">
                                <div class="arrow-btn-inner">
                                    <i class="fa-solid fa-arrow-up-right arrow-1"></i>
                                    <i class="fa-solid fa-arrow-up-right arrow-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project 4 -->
                    <div class="portfolio-card" data-category="fintech" onclick="openProjectModal(4)">
                        <div class="project-img-box">
                            <img src="<?php echo esc_url($p4_url); ?>" alt="Velo Cloud Architecture" class="project-img">
                            <div class="project-overlay">
                                <span class="view-btn"><i class="fa-solid fa-magnifying-glass-plus"></i> View Case Study</span>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="info-meta">
                                <span class="project-cat">Mobile & Cloud Engine</span>
                                <h3 class="project-title">Velo Distributed Fitness System</h3>
                                <p class="project-desc">Event-driven Kafka message bus architecture handling real-time biometric telemetry from 50k+ mobile users.</p>
                            </div>
                            <div class="arrow-btn-wrap">
                                <div class="arrow-btn-inner">
                                    <i class="fa-solid fa-arrow-up-right arrow-1"></i>
                                    <i class="fa-solid fa-arrow-up-right arrow-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Dynamic Interactive Services Widget -->
        <section class="interactive-widget-section section-gap">
            <div class="container">
                <div class="section-header text-center">
                    <span class="section-tag">CORE COMPETENCIES</span>
                    <h2 class="section-title">Elevated Solutions, Personalized Experiences</h2>
                    <p class="section-subtitle">Hover or tap on any service area to explore our core execution strengths.</p>
                </div>

                <div class="interactive-slider-widget" id="interactive-widget">
                    <div class="widget-item active" data-index="0">
                        <div class="widget-icon"><i class="fa-solid fa-compass-drafting"></i></div>
                        <div class="widget-head">
                            <h3 class="widget-title">System & Frontend Architecture</h3>
                            <span class="widget-badge">50+ Shipped</span>
                        </div>
                        <p class="widget-text">Drafting decoupled component trees, state machines, and micro-frontend structures that resist technical debt and scale painlessly.</p>
                        <a href="#contact" class="widget-cta">
                            <span>Get A Consultation</span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>

                    <div class="widget-item" data-index="1">
                        <div class="widget-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                        <div class="widget-head">
                            <h3 class="widget-title">Micro-Interactions & Motion Design</h3>
                            <span class="widget-badge">38+ Shipped</span>
                        </div>
                        <p class="widget-text">Bringing static websites alive with fluid 60FPS CSS animations, smooth scroll triggers, and delightful micro-interactions.</p>
                        <a href="#contact" class="widget-cta">
                            <span>Get A Consultation</span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>

                    <div class="widget-item" data-index="2">
                        <div class="widget-icon"><i class="fa-solid fa-shield-halved"></i></div>
                        <div class="widget-head">
                            <h3 class="widget-title">API Security & Database Tuning</h3>
                            <span class="widget-badge">44+ Shipped</span>
                        </div>
                        <p class="widget-text">Hardening authentication flows, JWT/OAuth2 mechanisms, SQL query indexing, and caching layers with Redis.</p>
                        <a href="#contact" class="widget-cta">
                            <span>Get A Consultation</span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>

                    <div class="sliding-active-bg" id="sliding-bg"></div>
                </div>
            </div>
        </section>

        <!-- Client Testimonials Slider Section -->
        <section id="testimonials" class="testimonials-section section-gap">
            <div class="container">
                <div class="section-header text-center">
                    <span class="section-tag">CLIENT ENDORSEMENTS</span>
                    <h2 class="section-title">What Leaders Say About My Work</h2>
                    <p class="section-subtitle">Real feedback from founders, product directors, and engineering peers.</p>
                </div>

                <div class="testimonials-carousel-wrapper">
                    <div class="testimonials-slider" id="testimonial-slider">
                        <div class="testimonial-slide active">
                            <div class="testimonial-card glass-panel">
                                <div class="quote-icon"><i class="fa-solid fa-quote-left"></i></div>
                                <div class="star-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <p class="testimonial-quote">
                                    "Siam is that rare full-stack engineer who truly understands both deep backend architecture and pixel-perfect design aesthetics. He rebuilt our entire platform in Next.js, and our conversion rate jumped by 42% within weeks. Outstanding craftsmanship!"
                                </p>
                                <div class="client-meta">
                                    <div class="client-info">
                                        <h4 class="client-name">Marcus Vance</h4>
                                        <p class="client-role">VP of Product, CloudCore Inc.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-slide">
                            <div class="testimonial-card glass-panel">
                                <div class="quote-icon"><i class="fa-solid fa-quote-left"></i></div>
                                <div class="star-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <p class="testimonial-quote">
                                    "Working with Siam felt effortless. He communicated proactively, proposed thoughtful technical optimizations we hadn't considered, and delivered our AI platform two weeks ahead of schedule. Truly a world-class professional."
                                </p>
                                <div class="client-meta">
                                    <div class="client-info">
                                        <h4 class="client-name">Elena Rostova</h4>
                                        <p class="client-role">Founder & CEO, NeuralPulse Technologies</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-slide">
                            <div class="testimonial-card glass-panel">
                                <div class="quote-icon"><i class="fa-solid fa-quote-left"></i></div>
                                <div class="star-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <p class="testimonial-quote">
                                    "The performance and visual responsiveness of the code Siam produces is unbelievable. Clean folder structures, modern CSS without messy bloat, and rock-solid TypeScript types. He has my highest recommendation!"
                                </p>
                                <div class="client-meta">
                                    <div class="client-info">
                                        <h4 class="client-name">David Lin</h4>
                                        <p class="client-role">Chief Technology Officer, FinApex Labs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="carousel-controls">
                        <button id="slider-prev" class="slider-arrow-btn" aria-label="Previous testimonial">
                            <i class="fa-solid fa-arrow-left"></i>
                        </button>
                        <div class="slider-dots" id="slider-dots">
                            <span class="dot active" data-slide="0"></span>
                            <span class="dot" data-slide="1"></span>
                            <span class="dot" data-slide="2"></span>
                        </div>
                        <button id="slider-next" class="slider-arrow-btn" aria-label="Next testimonial">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tech Insights / Blog Section -->
        <section id="blog" class="blog-section section-gap">
            <div class="container">
                <div class="section-header text-center">
                    <span class="section-tag">ENGINEERING WRITINGS</span>
                    <h2 class="section-title">Latest Articles & Insights</h2>
                    <p class="section-subtitle">Deep dives into modern frontend architecture, backend scalability, and developer experience.</p>
                </div>

                <div class="blog-grid">
                    <article class="blog-card" onclick="openBlogModal(1)">
                        <div class="blog-img-box">
                            <img src="<?php echo esc_url($b1_url); ?>" alt="Next.js 15 Clean Code" class="blog-img">
                            <div class="blog-tag">Architecture</div>
                        </div>
                        <div class="blog-content">
                            <div class="blog-meta">
                                <span><i class="fa-regular fa-user"></i> <?php echo esc_html($dev_name); ?></span>
                                <span><i class="fa-regular fa-clock"></i> 6 min read</span>
                                <span><i class="fa-regular fa-calendar"></i> Oct 2026</span>
                            </div>
                            <h3 class="blog-title">Architecting Enterprise Next.js 15 Applications for Extreme Scale</h3>
                            <p class="blog-excerpt">Practical strategies for structuring server actions, parallel route caching, and zero-bundle hydration.</p>
                            <a href="javascript:void(0)" class="read-post-link">
                                <span>Read Full Article</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </article>

                    <article class="blog-card" onclick="openBlogModal(2)">
                        <div class="blog-img-box">
                            <img src="<?php echo esc_url($b2_url); ?>" alt="CSS Mastery" class="blog-img">
                            <div class="blog-tag">Design Systems</div>
                        </div>
                        <div class="blog-content">
                            <div class="blog-meta">
                                <span><i class="fa-regular fa-user"></i> <?php echo esc_html($dev_name); ?></span>
                                <span><i class="fa-regular fa-clock"></i> 8 min read</span>
                                <span><i class="fa-regular fa-calendar"></i> Sep 2026</span>
                            </div>
                            <h3 class="blog-title">Why Vanilla CSS Variables and Grid Outperform Bulky Frameworks</h3>
                            <p class="blog-excerpt">Unlocking native browser acceleration, subgrid layouts, and fluid typography tokens without npm bloat.</p>
                            <a href="javascript:void(0)" class="read-post-link">
                                <span>Read Full Article</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </article>

                    <article class="blog-card" onclick="openBlogModal(3)">
                        <div class="blog-img-box">
                            <img src="<?php echo esc_url($b3_url); ?>" alt="Fintech Realtime" class="blog-img">
                            <div class="blog-tag">Cloud & API</div>
                        </div>
                        <div class="blog-content">
                            <div class="blog-meta">
                                <span><i class="fa-regular fa-user"></i> <?php echo esc_html($dev_name); ?></span>
                                <span><i class="fa-regular fa-clock"></i> 5 min read</span>
                                <span><i class="fa-regular fa-calendar"></i> Aug 2026</span>
                            </div>
                            <h3 class="blog-title">Building Resilient Real-Time Websockets for High-Frequency Crypto Trades</h3>
                            <p class="blog-excerpt">Handling connection backpressure, heartbeats, and optimistic state reconciliations seamlessly.</p>
                            <a href="javascript:void(0)" class="read-post-link">
                                <span>Read Full Article</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- Contact & Appointment Section -->
        <section id="contact" class="contact-section section-gap">
            <div class="container">
                <div class="contact-panel glass-panel">
                    <div class="contact-grid">
                        <div class="contact-info-col">
                            <span class="section-tag">LET'S CONNECT</span>
                            <h2 class="contact-title">Let's Build Something <br><span class="gradient-text">Extraordinary</span></h2>
                            <p class="contact-desc">
                                Have a project in mind, an architectural challenge, or looking to scale your engineering team? I'm always open to discussing new high-impact opportunities.
                            </p>

                            <div class="contact-details-list">
                                <div class="detail-item">
                                    <div class="detail-icon"><i class="fa-solid fa-envelope"></i></div>
                                    <div class="detail-texts">
                                        <span class="detail-label">Direct Email</span>
                                        <a href="mailto:<?php echo esc_attr($dev_email); ?>" class="detail-value"><?php echo esc_html($dev_email); ?></a>
                                    </div>
                                </div>

                                <div class="detail-item">
                                    <div class="detail-icon"><i class="fa-solid fa-phone"></i></div>
                                    <div class="detail-texts">
                                        <span class="detail-label">Phone & WhatsApp</span>
                                        <a href="tel:<?php echo esc_attr($dev_phone); ?>" class="detail-value"><?php echo esc_html($dev_phone); ?></a>
                                    </div>
                                </div>

                                <div class="detail-item">
                                    <div class="detail-icon"><i class="fa-solid fa-location-dot"></i></div>
                                    <div class="detail-texts">
                                        <span class="detail-label">Current Base</span>
                                        <span class="detail-value">Dhaka, Bangladesh &bull; Global Remote (UTC+6)</span>
                                    </div>
                                </div>
                            </div>

                            <div class="availability-badge">
                                <span class="pulse-dot"></span>
                                <span>Available for Select Contract & Full-Time Roles</span>
                            </div>
                        </div>

                        <div class="contact-form-col">
                            <form id="contact-form" class="styled-form" novalidate>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="contact-name">Your Full Name *</label>
                                        <input type="text" id="contact-name" name="name" class="form-control" placeholder="e.g. John Doe" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="contact-email">Email Address *</label>
                                        <input type="email" id="contact-email" name="email" class="form-control" placeholder="john@company.com" required>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="contact-phone">Phone / WhatsApp</label>
                                        <input type="tel" id="contact-phone" name="phone" class="form-control" placeholder="+1 (555) 000-0000">
                                    </div>
                                    <div class="form-group">
                                        <label for="contact-subject">Project Type</label>
                                        <select id="contact-subject" name="subject" class="form-control">
                                            <option value="Full-Stack Web App">Full-Stack Web Application</option>
                                            <option value="Next.js Migration">Next.js & Frontend Migration</option>
                                            <option value="UI/UX & Design System">UI/UX & Design System</option>
                                            <option value="Technical Consulting">Technical Architecture Consulting</option>
                                            <option value="Other Project">Other Opportunity</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="contact-message">Project Details & Vision *</label>
                                    <textarea id="contact-message" name="message" rows="5" class="form-control" placeholder="Tell me about your goals, timeline, and current tech stack..." required></textarea>
                                </div>

                                <button type="submit" id="submit-btn" class="btn btn-primary btn-round btn-full btn-icon-flip">
                                    <span class="btn-text">Send Message Now</span>
                                    <span class="icon-wrap">
                                        <i class="fa-solid fa-paper-plane icon-main"></i>
                                        <i class="fa-solid fa-paper-plane icon-alt"></i>
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-brand-col">
                    <a href="#" class="brand-logo">
                        <img src="<?php echo esc_url($logo_url); ?>" alt="Siam Logo" class="brand-logo-img">
                        <span>Siam<span class="logo-dot">.</span>dev</span>
                    </a>
                    <p class="footer-bio">
                        Engineering scalable web applications, fluid digital experiences, and high-impact digital solutions with modern technology.
                    </p>
                    <div class="footer-socials">
                        <a href="https://github.com" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
                        <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                        <a href="https://dribbble.com" target="_blank" aria-label="Dribbble"><i class="fa-brands fa-dribbble"></i></a>
                    </div>
                </div>

                <div class="footer-links-col">
                    <h4 class="footer-heading">Navigation</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#skills">Skills & Stack</a></li>
                        <li><a href="#portfolio">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <div class="footer-links-col">
                    <h4 class="footer-heading">Services</h4>
                    <ul>
                        <li><a href="#services">Next.js Development</a></li>
                        <li><a href="#services">Full-Stack Solutions</a></li>
                        <li><a href="#services">UI/UX Engineering</a></li>
                        <li><a href="#services">DevOps & Cloud</a></li>
                        <li><a href="#services">API Architecture</a></li>
                    </ul>
                </div>

                <div class="footer-newsletter-col">
                    <h4 class="footer-heading">Tech Newsletter</h4>
                    <p class="newsletter-desc">Subscribe to receive monthly deep-dives on full-stack architecture and engineering performance.</p>
                    <form id="newsletter-form" class="newsletter-form">
                        <div class="newsletter-input-wrap">
                            <input type="email" id="newsletter-email" placeholder="Your email address" required>
                            <button type="submit" aria-label="Subscribe"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php echo esc_html($dev_name); ?>. Powered by WordPress & Modern Web Architecture.</p>
                <div class="footer-bottom-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="back-to-top" class="back-to-top" aria-label="Back to top">
        <svg class="progress-ring" width="46" height="46">
            <circle class="progress-ring-circle" stroke="rgba(255, 1, 79, 0.8)" stroke-width="3" fill="transparent" r="20" cx="23" cy="23"/>
        </svg>
        <i class="fa-solid fa-arrow-up"></i>
    </button>

    <!-- Modal Dialog for Projects / Services / Blog -->
    <div id="info-modal" class="custom-modal">
        <div class="modal-backdrop" onclick="closeModal()"></div>
        <div class="modal-dialog glass-panel">
            <button class="modal-close-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
            <div id="modal-body-content" class="modal-content-area"></div>
        </div>
    </div>

    <!-- Fallback script loading if not enqueued -->
    <script src="<?php echo esc_url(SIAM_PORTFOLIO_URL . 'assets/js/main.js?v=' . SIAM_PORTFOLIO_VERSION); ?>"></script>

    <?php wp_footer(); ?>
</body>
</html>
