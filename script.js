// ===================== VivuStay Landing Page Scripts =====================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- Mobile nav toggle ----
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('nav-open');
        });

        // Close mobile nav when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('nav-open');
            });
        });
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Number counting animation ----
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    let statAnimated = false;

    function animateStats() {
        if (statAnimated) return;
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statAnimated = true;
            statNumbers.forEach(el => {
                const target = parseInt(el.getAttribute('data-count'));
                const duration = 1500;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    el.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }
                requestAnimationFrame(update);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats();

    // ---- FAQ accordion ----
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ---- Scroll-triggered animations ----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card, .more-card, .detail-block, .wf-step, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add staggered delay for grid items
    document.querySelectorAll('.features-grid .feature-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 80}ms`;
    });
    document.querySelectorAll('.more-grid .more-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 60}ms`;
    });
    document.querySelectorAll('.testimonials-grid .testimonial-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 100}ms`;
    });

    // Style for animated-in elements
    const style = document.createElement('style');
    style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    // ---- Active nav link highlight ----
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.style.color = 'var(--green-600)';
                } else {
                    link.style.color = '';
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

});
