// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initEventFilters();
    initGalleryFilters();
    initGalleryModal();
    initContactForm();
    initFAQ();
    initAnimations();
});

// Navigation functionality for Tailwind version
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('a[href^="#"], .mobile-menu a');

    // Mobile menu toggle
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
            // Toggle mobile menu
            mobileMenu.classList.toggle('transform');
            mobileMenu.classList.toggle('-translate-x-full');
            mobileMenu.classList.toggle('translate-x-0');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('span');
            navToggle.classList.toggle('active');
            
            if (navToggle.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && !mobileMenu.classList.contains('-translate-x-full')) {
                mobileMenu.classList.add('-translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
                
                // Reset hamburger menu
                const bars = navToggle.querySelectorAll('span');
                navToggle.classList.remove('active');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && navToggle && 
            !navToggle.contains(event.target) && 
            !mobileMenu.contains(event.target) &&
            !mobileMenu.classList.contains('-translate-x-full')) {
            
            mobileMenu.classList.add('-translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            
            // Reset hamburger menu
            const bars = navToggle.querySelectorAll('span');
            navToggle.classList.remove('active');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Scroll effects for Tailwind version
function initScrollEffects() {
    const header = document.getElementById('header');
    
    // Header scroll effect
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 100) {
            header.classList.add('shadow-xl');
            header.classList.remove('shadow-lg');
        } else {
            header.classList.add('shadow-lg');
            header.classList.remove('shadow-xl');
        }
    }, 16));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Smooth scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Event filters functionality for Tailwind
function initEventFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const eventCards = document.querySelectorAll('.upcoming, .past, .workshop');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button styles
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-transparent', 'border-2', 'border-primary', 'text-primary');
            });
            
            this.classList.remove('bg-transparent', 'border-2', 'border-primary', 'text-primary');
            this.classList.add('bg-primary', 'text-white');
            
            // Filter events with animation
            eventCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.classList.add('animate-fade-in-up');
                    setTimeout(() => {
                        card.classList.remove('animate-fade-in-up');
                    }, 600);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Gallery filters functionality for Tailwind
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filters [data-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button styles
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-transparent', 'border-2', 'border-primary', 'text-primary');
            });
            
            this.classList.remove('bg-transparent', 'border-2', 'border-primary', 'text-primary');
            this.classList.add('bg-primary', 'text-white');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.classList.add('animate-fade-in-up');
                    setTimeout(() => {
                        item.classList.remove('animate-fade-in-up');
                    }, 600);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            this.classList.add('opacity-50', 'cursor-not-allowed');
            
            setTimeout(() => {
                this.textContent = 'Load More Photos';
                this.classList.remove('opacity-50', 'cursor-not-allowed');
                showNotification('More photos loaded!', 'success');
            }, 1000);
        });
    }
}

// Gallery modal functionality for Tailwind
function initGalleryModal() {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.getElementById('modalClose');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!modal) return;

    // Open modal when clicking on gallery item
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-info h3');
            const description = this.querySelector('.gallery-info p');

            if (img && title && description) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalTitle.textContent = title.textContent;
                modalDescription.textContent = description.textContent;
                
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.classList.add('overflow-hidden');
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// Contact form functionality for Tailwind
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                submitBtn.disabled = false;
                this.reset();
                showNotification('Thank you! Your message has been sent successfully.', 'success');
            }, 2000);
        });
    }
}

// FAQ functionality for Tailwind
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqAnswer = faqItem.querySelector('.faq-answer');
                    const faqToggle = faqItem.querySelector('.faq-toggle');
                    if (faqAnswer) faqAnswer.classList.add('max-h-0');
                    if (faqToggle) faqToggle.classList.remove('rotate-45');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    answer.classList.remove('max-h-0');
                    answer.classList.add('max-h-48');
                    toggle.classList.add('rotate-45');
                }
            });
        }
    });
}

// Animation on scroll for Tailwind
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hover\\:transform, .group, [class*="hover:"]');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    
    // Base Tailwind classes
    let classes = 'fixed top-5 right-5 px-6 py-4 rounded-lg text-white font-medium z-50 max-w-sm transform translate-x-full transition-transform duration-300 shadow-lg';
    
    // Add type-specific classes
    switch (type) {
        case 'success':
            classes += ' bg-green-500';
            break;
        case 'error':
            classes += ' bg-red-500';
            break;
        case 'warning':
            classes += ' bg-yellow-500';
            break;
        default:
            classes += ' bg-blue-500';
    }
    
    notification.className = classes;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('translate-x-0');
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Accessibility improvements for Tailwind
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-white px-4 py-2 rounded z-50 transition-all duration-300';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id if it doesn't exist
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility features
initAccessibility();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        showNotification,
        throttle
    };
}