// Optimized Animation and Effects Engine

class AnimationEngine {
    constructor() {
        this.activeAnimations = new Map();
        this.observedElements = new WeakMap();
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupAdvancedEffects();
        this.initializeParticleSystem();
    }

    // Advanced Scroll Animations
    setupScrollAnimations() {
        const scrollTriggers = document.querySelectorAll('[data-scroll-animation]');
        
        scrollTriggers.forEach(element => {
            const animationType = element.getAttribute('data-scroll-animation');
            const delay = parseInt(element.getAttribute('data-animation-delay')) || 0;
            const threshold = parseFloat(element.getAttribute('data-threshold')) || 0.1;
            
            this.createScrollTrigger(element, animationType, delay, threshold);
        });
    }

    createScrollTrigger(element, animation, delay, threshold) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        this.triggerAnimation(entry.target, animation);
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold });

        observer.observe(element);
    }

    triggerAnimation(element, animationType) {
        switch(animationType) {
            case 'fadeInUp':
                element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                break;
            case 'slideInLeft':
                element.style.animation = 'slideInFromLeft 0.6s ease-out forwards';
                break;
            case 'scaleIn':
                element.style.animation = 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                break;
            case 'bounceIn':
                element.style.animation = 'bounceIn 1s ease-out forwards';
                break;
            case 'typewriter':
                this.typewriterEffect(element);
                break;
            case 'countUp':
                this.countUpAnimation(element);
                break;
            default:
                element.classList.add(animationType);
        }
    }

    // Advanced Intersection Observers
    setupIntersectionObservers() {
        // Skills section observer
        this.createSkillsObserver();
        
        // Project cards observer
        this.createProjectObserver();
        
        // Timeline observer
        this.createTimelineObserver();
        
        // General reveal observer
        this.createRevealObserver();
    }

    createSkillsObserver() {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBars(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.skill-category').forEach(category => {
            skillsObserver.observe(category);
        });
    }

    createProjectObserver() {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInFromBottom 0.8s ease-out forwards';
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.project-card').forEach(card => {
            projectObserver.observe(card);
        });
    }

    createTimelineObserver() {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideInFromLeft 0.6s ease-out forwards';
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.timeline-item').forEach(item => {
            timelineObserver.observe(item);
        });
    }

    createRevealObserver() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal-on-scroll').forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Advanced Effects
    setupAdvancedEffects() {
        this.setupMagneticEffect();
        this.setupTiltEffect();
        this.setupMorphingShapes();
    }

    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic-effect');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.magneticMove(e, element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.magneticReset(element);
            });
        });
    }

    magneticMove(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const strength = 0.3;

        element.style.transform = `translate(${deltaX * strength}px, ${deltaY * strength}px)`;
    }

    magneticReset(element) {
        element.style.transform = 'translate(0, 0)';
    }

    setupTiltEffect() {
        const tiltElements = document.querySelectorAll('.tilt-effect');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.tiltMove(e, element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.tiltReset(element);
            });
        });
    }

    tiltMove(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = (e.clientY - centerY) / 10;
        const rotateY = (centerX - e.clientX) / 10;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    tiltReset(element) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }

    // Particle System
    initializeParticleSystem() {
        this.createFloatingParticles();
        this.setupInteractiveParticles();
    }

    createFloatingParticles() {
        const particleContainer = document.querySelector('.floating-particles');
        if (!particleContainer) return;

        const particleCount = 15;
        const colors = ['#3b82f6', '#8b5cf6', '#059669', '#f59e0b'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                opacity: ${Math.random() * 0.8 + 0.2};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
            particleContainer.appendChild(particle);
        }
    }

    setupInteractiveParticles() {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.95) { // Create particles occasionally
                this.createTrailParticle(e.clientX, e.clientY);
            }
        });
    }

    createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #3b82f6;
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            animation: trailParticle 1s ease-out forwards;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 1000);
    }

    // Text Animations
    typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #3b82f6';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }

    countUpAnimation(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const countInterval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(countInterval);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Skill Bar Animation
    animateSkillBars(category) {
        const skillBars = category.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
                bar.style.transition = 'width 1s ease-out';
            }, index * 200);
        });
    }

    // Advanced Visual Effects
    setupMorphingShapes() {
        const morphingElements = document.querySelectorAll('.morphing-shape');
        
        morphingElements.forEach(element => {
            let morphState = 0;
            
            setInterval(() => {
                morphState = (morphState + 1) % 4;
                this.applyMorphing(element, morphState);
            }, 3000);
        });
    }

    applyMorphing(element, state) {
        const morphStates = [
            'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
        ];
        
        element.style.clipPath = morphStates[state];
        element.style.transition = 'clip-path 1s ease-in-out';
    }

    // Loading Animations
    createLoadingAnimation(element, type = 'pulse') {
        switch(type) {
            case 'pulse':
                element.style.animation = 'pulse 2s ease-in-out infinite';
                break;
            case 'spin':
                element.style.animation = 'spin 1s linear infinite';
                break;
            case 'bounce':
                element.style.animation = 'bounce 1s ease-in-out infinite';
                break;
            case 'shake':
                element.style.animation = 'shake 0.5s ease-in-out infinite';
                break;
        }
    }

    removeLoadingAnimation(element) {
        element.style.animation = '';
    }

    // Performance Optimized Animations
    requestAnimationFrame(callback) {
        if (this.activeAnimations.size < 10) { // Limit concurrent animations
            const id = window.requestAnimationFrame(callback);
            this.activeAnimations.set(id, callback);
            return id;
        }
        return null;
    }

    cancelAnimationFrame(id) {
        if (this.activeAnimations.has(id)) {
            window.cancelAnimationFrame(id);
            this.activeAnimations.delete(id);
        }
    }

    // Cleanup
    cleanup() {
        this.activeAnimations.forEach((callback, id) => {
            window.cancelAnimationFrame(id);
        });
        this.activeAnimations.clear();
    }
}

// Scroll-triggered animations
class ScrollAnimations {
    constructor() {
        this.scrollY = window.scrollY;
        this.setupScrollListeners();
    }

    setupScrollListeners() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateScrollAnimations() {
        this.scrollY = window.scrollY;
        
        // Parallax effect
        this.updateParallax();
        
        // Scale navbar
        this.updateNavbar();
        
        // Update progress indicators
        this.updateProgressBars();
    }

    updateParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const yPos = -(this.scrollY * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (this.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateProgressBars() {
        const progressBars = document.querySelectorAll('.scroll-progress');
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (this.scrollY / documentHeight) * 100;
        
        progressBars.forEach(bar => {
            bar.style.width = `${Math.min(progress, 100)}%`;
        });
    }
}

// Initialize Animation Engine
document.addEventListener('DOMContentLoaded', () => {
    const animationEngine = new AnimationEngine();
    const scrollAnimations = new ScrollAnimations();
    
    // Add custom CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes trailParticle {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(0);
                opacity: 0;
            }
        }
        
        .navbar.scrolled {
            transform: scale(0.95);
            border-radius: 0 0 1rem 1rem;
        }
        
        .parallax {
            will-change: transform;
        }
        
        .magnetic-effect {
            transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .tilt-effect {
            transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎨 Advanced animations initialized!');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationEngine, ScrollAnimations };
}
