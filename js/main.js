// Optimized JS for Navigation and Page Interactions

class Portfolio {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = true;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeLoadingScreen();
        this.setupIntersectionObserver();
        this.setupScrollRevealAnimations();
        this.initializeCounters();
        this.setupMobileNavigation();
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.navigateToSection(targetSection);
            });
        });

        // Smooth scroll for buttons
        window.scrollToSection = (sectionId) => {
            this.navigateToSection(sectionId);
        };

        // Copy to clipboard functionality
        window.copyToClipboard = (text) => {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                this.showToast('Failed to copy', 'error');
            });
        };

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Scroll handler for navbar
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    initializeLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        const loadingProgress = document.querySelector('.loading-progress');
        
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    this.isLoading = false;
                    this.startIntroAnimations();
                }, 500);
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }
            
            loadingProgress.style.width = `${progress}%`;
        }, 200);
    }

    startIntroAnimations() {
        // Animate hero text elements
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in-up');
            }, index * 200);
        });

        // Start workspace animations
        this.animateWorkspace();
        
        // Start counter animations
        this.animateCounters();
    }

    animateWorkspace() {
        const workspace = document.querySelector('.workspace-container');
        workspace.classList.add('scale-in');
        
        // Animate individual workspace elements
        setTimeout(() => {
            const monitors = document.querySelectorAll('.monitor');
            monitors.forEach((monitor, index) => {
                setTimeout(() => {
                    monitor.classList.add('fade-in-right');
                }, index * 300);
            });
        }, 500);
    }

    navigateToSection(sectionId) {
        // Update active navigation link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[href="#${sectionId}"]`).classList.add('active');

        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Scroll to top of the section
            setTimeout(() => {
                targetSection.scrollTop = 0;
            }, 100);
        }
        
        this.currentSection = sectionId;

        // Trigger section-specific animations
        this.triggerSectionAnimations(sectionId);

        // Close mobile menu if open
        this.closeMobileMenu();
    }

    triggerSectionAnimations(sectionId) {
        switch(sectionId) {
            case 'skills':
                this.animateSkills();
                break;
            case 'experience':
                this.animateTimeline();
                break;
            case 'projects':
                this.animateProjects();
                break;
            case 'contact':
                this.animateContact();
                break;
        }
    }

    animateSkills() {
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            setTimeout(() => {
                category.classList.add('fade-in-up');
                
                // Animate skill bars within this category
                const skillBars = category.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, barIndex) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        const percentage = category.querySelector(`[data-width="${width}"]`).parentElement.querySelector('.skill-percentage');
                        
                        // Animate the width
                        bar.style.width = `${width}%`;
                        
                        // Animate the counter
                        this.animateCounter(percentage, 0, parseInt(width), 1000);
                        
                    }, barIndex * 200);
                });
            }, index * 300);
        });
    }

    animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in-left');
            }, index * 400);
        });
    }

    animateProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 200);
        });
    }

    animateContact() {
        document.querySelector('.contact-form-container').classList.add('fade-in-left');
        document.querySelector('.contact-info').classList.add('fade-in-right');
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-on-scroll', 'revealed');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.skill-category, .timeline-item, .project-card, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }

    setupScrollRevealAnimations() {
        // Add reveal-on-scroll class to elements that should animate
        const revealElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .contact-item');
        revealElements.forEach(el => {
            el.classList.add('reveal-on-scroll');
        });
    }

    initializeCounters() {
        this.counters = document.querySelectorAll('.stat-number');
        this.hasCounterAnimated = false;
    }

    animateCounters() {
        if (this.hasCounterAnimated) return;
        
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            this.animateCounter(counter, 0, target, 2000);
        });
        
        this.hasCounterAnimated = true;
    }
    
    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + range * easedProgress);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = end; // Ensure final value is exact
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    setupMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.nav-menu').classList.remove('active');
    }

    handleResize() {
        // Handle responsive changes
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        
        // Add/remove navbar background on scroll
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add toast styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
        `;

        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });

        // Remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Particle system for enhanced visual effects
    createParticles(container, count = 5) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #3b82f6;
                border-radius: 50%;
                opacity: 0.6;
                pointer-events: none;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${6 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            container.appendChild(particle);
        }
    }

    // Utility function for smooth animations
    animateElement(element, animation, delay = 0) {
        setTimeout(() => {
            element.classList.add(animation);
        }, delay);
    }
}

// Initialize Portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    
    console.log('🚀 Portfolio initialized successfully!');
});
