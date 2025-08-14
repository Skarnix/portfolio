// Enhanced Contact Form and Validation Logic

class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.querySelector('.submit-btn');
        this.isSubmitting = false;
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.setupEventListeners();
        this.setupValidation();
        this.initEmailJS();
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                this.validateField(e.target);
            });

            input.addEventListener('input', (e) => {
                this.clearFieldError(e.target);
            });
        });

        // Enhanced UX interactions
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                this.animateLabel(e.target, 'focus');
            });

            input.addEventListener('blur', (e) => {
                if (!e.target.value) {
                    this.animateLabel(e.target, 'blur');
                }
            });
        });
    }

    setupValidation() {
        this.validationRules = {
            name: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Please enter a valid name (letters only, min 2 characters)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            subject: {
                required: true,
                minLength: 3,
                message: 'Subject must be at least 3 characters long'
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000,
                message: 'Message must be between 10 and 1000 characters'
            }
        };
    }

    initEmailJS() {
        // Initialize EmailJS (you'll need to replace with your actual EmailJS credentials)
        // emailjs.init("your_public_key");
        console.log('EmailJS initialized (demo mode)');
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        const formData = this.getFormData();
        const isValid = this.validateForm(formData);

        if (!isValid) {
            this.shakeForm();
            return;
        }

        this.isSubmitting = true;
        this.setLoadingState(true);

        try {
            // Demo mode - replace with actual email sending
            await this.sendEmail(formData);
            this.showSuccess();
            this.resetForm();
        } catch (error) {
            console.error('Error sending email:', error);
            this.showError('Failed to send message. Please try again.');
        } finally {
            this.isSubmitting = false;
            this.setLoadingState(false);
        }
    }

    getFormData() {
        const formData = new FormData(this.form);
        return {
            name: formData.get('name')?.trim(),
            email: formData.get('email')?.trim(),
            subject: formData.get('subject')?.trim(),
            message: formData.get('message')?.trim()
        };
    }

    validateForm(data) {
        let isValid = true;
        
        Object.entries(this.validationRules).forEach(([field, rules]) => {
            const value = data[field];
            const fieldElement = document.getElementById(field);
            
            if (!this.validateField(fieldElement, value, rules)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(fieldElement, value = null, rules = null) {
        if (!fieldElement) return true;

        const fieldName = fieldElement.name;
        const fieldValue = value !== null ? value : fieldElement.value.trim();
        const fieldRules = rules || this.validationRules[fieldName];

        if (!fieldRules) return true;

        // Clear previous errors
        this.clearFieldError(fieldElement);

        // Required validation
        if (fieldRules.required && !fieldValue) {
            this.showFieldError(fieldElement, `${this.capitalizeFirst(fieldName)} is required`);
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!fieldValue && !fieldRules.required) return true;

        // Length validation
        if (fieldRules.minLength && fieldValue.length < fieldRules.minLength) {
            this.showFieldError(fieldElement, fieldRules.message);
            return false;
        }

        if (fieldRules.maxLength && fieldValue.length > fieldRules.maxLength) {
            this.showFieldError(fieldElement, fieldRules.message);
            return false;
        }

        // Pattern validation
        if (fieldRules.pattern && !fieldRules.pattern.test(fieldValue)) {
            this.showFieldError(fieldElement, fieldRules.message);
            return false;
        }

        // Success state
        this.showFieldSuccess(fieldElement);
        return true;
    }

    showFieldError(fieldElement, message) {
        fieldElement.classList.add('error');
        fieldElement.classList.remove('success');
        
        const errorElement = document.getElementById(`${fieldElement.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        // Animate field
        fieldElement.style.animation = 'shake 0.3s ease-in-out';
        setTimeout(() => {
            fieldElement.style.animation = '';
        }, 300);
    }

    showFieldSuccess(fieldElement) {
        fieldElement.classList.remove('error');
        fieldElement.classList.add('success');
        this.clearFieldError(fieldElement);
    }

    clearFieldError(fieldElement) {
        fieldElement.classList.remove('error');
        
        const errorElement = document.getElementById(`${fieldElement.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    async sendEmail(data) {
        // Demo mode - simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) { // 90% success rate for demo
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });

        // Real EmailJS implementation would look like:
        /*
        return emailjs.send(
            'your_service_id',
            'your_template_id',
            {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                to_email: 'Sudarshankarn@gmail.com'
            }
        );
        */
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showSuccess() {
        const successElement = document.getElementById('form-success');
        if (successElement) {
            successElement.classList.add('show');
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                successElement.classList.remove('show');
            }, 5000);
        }

        // Show toast notification
        this.showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
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
            max-width: 400px;
            word-wrap: break-word;
        `;

        // Toast close button styles
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.2s;
        `;

        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });

        // Auto remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }

    resetForm() {
        this.form.reset();
        
        // Clear all validation states
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
            this.clearFieldError(input);
        });

        // Reset labels
        inputs.forEach(input => {
            this.animateLabel(input, 'blur');
        });
    }

    shakeForm() {
        this.form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.form.style.animation = '';
        }, 500);
    }

    animateLabel(input, action) {
        const label = input.parentElement.querySelector('label');
        if (!label) return;

        if (action === 'focus') {
            label.style.transform = 'translateY(-1.5rem) scale(0.875)';
            label.style.color = 'var(--primary-color)';
        } else if (action === 'blur' && !input.value) {
            label.style.transform = 'translateY(0) scale(1)';
            label.style.color = 'var(--text-secondary)';
        }
    }

    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

// Advanced form features
class FormEnhancements {
    constructor(formHandler) {
        this.formHandler = formHandler;
        this.setupEnhancements();
    }

    setupEnhancements() {
        this.setupCharacterCounters();
        this.setupAutoResize();
        this.setupFormStorage();
        this.setupAdvancedValidation();
    }

    setupCharacterCounters() {
        const textareas = document.querySelectorAll('textarea[maxlength]');
        
        textareas.forEach(textarea => {
            const maxLength = textarea.getAttribute('maxlength');
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.style.cssText = `
                font-size: 0.875rem;
                color: var(--text-light);
                text-align: right;
                margin-top: 0.25rem;
                transition: color 0.2s ease;
            `;
            
            textarea.parentElement.appendChild(counter);
            
            const updateCounter = () => {
                const remaining = maxLength - textarea.value.length;
                counter.textContent = `${remaining} characters remaining`;
                
                if (remaining < 50) {
                    counter.style.color = '#ef4444';
                } else if (remaining < 100) {
                    counter.style.color = '#f59e0b';
                } else {
                    counter.style.color = 'var(--text-light)';
                }
            };
            
            textarea.addEventListener('input', updateCounter);
            updateCounter(); // Initial count
        });
    }

    setupAutoResize() {
        const textareas = document.querySelectorAll('textarea');
        
        textareas.forEach(textarea => {
            const autoResize = () => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            };
            
            textarea.addEventListener('input', autoResize);
            autoResize(); // Initial resize
        });
    }

    setupFormStorage() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const STORAGE_KEY = 'portfolioContactForm';
        
        // Load saved data
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.entries(data).forEach(([field, value]) => {
                    const input = form.querySelector(`[name="${field}"]`);
                    if (input && value) {
                        input.value = value;
                        this.formHandler.animateLabel(input, 'focus');
                    }
                });
            } catch (error) {
                console.error('Error loading saved form data:', error);
            }
        }
        
        // Save data on input
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const data = {};
                inputs.forEach(inp => {
                    if (inp.value.trim()) {
                        data[inp.name] = inp.value.trim();
                    }
                });
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            });
        });
        
        // Clear storage on successful submission
        form.addEventListener('submit', (e) => {
            if (e.defaultPrevented) return;
            
            setTimeout(() => {
                if (document.getElementById('form-success').classList.contains('show')) {
                    localStorage.removeItem(STORAGE_KEY);
                }
            }, 100);
        });
    }

    setupAdvancedValidation() {
        // Email domain suggestions
        const emailInput = document.getElementById('email');
        if (emailInput) {
            this.setupEmailSuggestions(emailInput);
        }

        // Spam detection
        this.setupSpamDetection();
    }

    setupEmailSuggestions(emailInput) {
        const commonDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'live.com', 'aol.com', 'icloud.com', 'protonmail.com'
        ];

        let suggestionTimeout;

        emailInput.addEventListener('input', () => {
            clearTimeout(suggestionTimeout);
            suggestionTimeout = setTimeout(() => {
                this.checkEmailSuggestion(emailInput, commonDomains);
            }, 1000);
        });
    }

    checkEmailSuggestion(emailInput, commonDomains) {
        const email = emailInput.value.trim();
        if (!email.includes('@') || email.includes(' ')) return;

        const [localPart, domain] = email.split('@');
        if (!domain) return;

        // Simple typo detection
        const suggestions = commonDomains.filter(commonDomain => {
            return this.calculateSimilarity(domain, commonDomain) > 0.6 && domain !== commonDomain;
        });

        if (suggestions.length > 0) {
            this.showEmailSuggestion(emailInput, localPart, suggestions[0]);
        }
    }

    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.calculateEditDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    calculateEditDistance(str1, str2) {
        const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));
        
        for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
        
        for (let j = 1; j <= str2.length; j++) {
            for (let i = 1; i <= str1.length; i++) {
                if (str1[i - 1] === str2[j - 1]) {
                    matrix[j][i] = matrix[j - 1][i - 1];
                } else {
                    matrix[j][i] = Math.min(
                        matrix[j - 1][i - 1] + 1,
                        matrix[j][i - 1] + 1,
                        matrix[j - 1][i] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    showEmailSuggestion(emailInput, localPart, suggestedDomain) {
        const suggestion = document.createElement('div');
        suggestion.className = 'email-suggestion';
        suggestion.innerHTML = `
            <span>Did you mean <strong>${localPart}@${suggestedDomain}</strong>?</span>
            <button type="button" class="suggestion-accept">Yes</button>
            <button type="button" class="suggestion-dismiss">No</button>
        `;
        
        suggestion.style.cssText = `
            background: #f3f4f6;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            padding: 0.75rem;
            margin-top: 0.5rem;
            font-size: 0.875rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInFromBottom 0.3s ease-out;
        `;

        // Style buttons
        const buttons = suggestion.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.cssText = `
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.25rem 0.75rem;
                border-radius: 0.25rem;
                cursor: pointer;
                font-size: 0.75rem;
                transition: all 0.2s ease;
            `;
            
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'var(--accent-blue)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'var(--primary-color)';
            });
        });

        // Event listeners
        suggestion.querySelector('.suggestion-accept').addEventListener('click', () => {
            emailInput.value = `${localPart}@${suggestedDomain}`;
            suggestion.remove();
            this.formHandler.validateField(emailInput);
        });

        suggestion.querySelector('.suggestion-dismiss').addEventListener('click', () => {
            suggestion.remove();
        });

        // Insert after email input
        const existingSuggestion = emailInput.parentElement.querySelector('.email-suggestion');
        if (existingSuggestion) {
            existingSuggestion.remove();
        }
        
        emailInput.parentElement.appendChild(suggestion);
    }

    setupSpamDetection() {
        const messageInput = document.getElementById('message');
        if (!messageInput) return;

        const spamKeywords = [
            'free money', 'click here', 'guaranteed', 'act now',
            'limited time', 'make money', 'work from home'
        ];

        messageInput.addEventListener('input', () => {
            const text = messageInput.value.toLowerCase();
            const suspiciousWords = spamKeywords.filter(keyword => 
                text.includes(keyword.toLowerCase())
            );

            if (suspiciousWords.length > 2) {
                this.showSpamWarning(messageInput);
            } else {
                this.hideSpamWarning(messageInput);
            }
        });
    }

    showSpamWarning(messageInput) {
        const existing = messageInput.parentElement.querySelector('.spam-warning');
        if (existing) return;

        const warning = document.createElement('div');
        warning.className = 'spam-warning';
        warning.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>Your message may be flagged as spam. Please use professional language.</span>
        `;
        
        warning.style.cssText = `
            background: #fef3cd;
            border: 1px solid #fbbf24;
            color: #92400e;
            padding: 0.5rem;
            border-radius: 0.5rem;
            margin-top: 0.5rem;
            font-size: 0.875rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;

        messageInput.parentElement.appendChild(warning);
    }

    hideSpamWarning(messageInput) {
        const warning = messageInput.parentElement.querySelector('.spam-warning');
        if (warning) {
            warning.remove();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const formHandler = new ContactFormHandler();
    const formEnhancements = new FormEnhancements(formHandler);
    
    console.log('📧 Contact form initialized with advanced features!');
});
