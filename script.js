// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// Enhanced Navigation
class Navigation {
    constructor() {
        this.navbar = document.getElementById('mainNavbar');
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleNavigation();
        this.handleMobileMenu();
    }

    handleScroll() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    handleNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                
                // Smooth scroll for anchor links
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    handleMobileMenu() {
        const toggler = document.querySelector('.navbar-toggler');
        const collapse = document.querySelector('.navbar-collapse');
        
        if (toggler && collapse) {
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navbar.contains(e.target) && collapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(collapse)?.hide();
                }
            });
        }
    }
}

// Enhanced Form Handling
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        this.handleNewsletterForms();
        this.handleContactForms();
        this.enhanceFormFields();
    }

    handleNewsletterForms() {
        const newsletterForms = document.querySelectorAll('form[class*="newsletter"], form:has(input[type="email"])');
        
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitNewsletter(form);
            });
        });
    }

    handleContactForms() {
        const contactForms = document.querySelectorAll('.contact-form, form[class*="contact"]');
        
        contactForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitContact(form);
            });
        });
    }

    async submitNewsletter(form) {
        const button = form.querySelector('button[type="submit"]');
        const email = form.querySelector('input[type="email"]').value;
        
        if (!this.validateEmail(email)) {
            this.showAlert('Please enter a valid email address', 'warning');
            return;
        }

        this.setButtonLoading(button, true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showAlert('Successfully subscribed to our newsletter!', 'success');
            form.reset();
        } catch (error) {
            this.showAlert('Something went wrong. Please try again.', 'danger');
        } finally {
            this.setButtonLoading(button, false);
        }
    }

    async submitContact(form) {
        const button = form.querySelector('button[type="submit"], .submit-btn');
        const formData = new FormData(form);
        
        this.setButtonLoading(button, true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showAlert('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            this.showAlert('Failed to send message. Please try again.', 'danger');
        } finally {
            this.setButtonLoading(button, false);
        }
    }

    enhanceFormFields() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    setButtonLoading(button, loading) {
        if (!button) return;
        
        if (loading) {
            button.dataset.originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
            button.disabled = true;
        } else {
            button.innerHTML = button.dataset.originalText || button.innerHTML;
            button.disabled = false;
        }
    }

    showAlert(message, type = 'info') {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
}

// Article and Content Management
class ContentManager {
    constructor() {
        this.init();
    }

    init() {
        this.handleArticleCards();
        this.handleCategoryFilters();
        this.handleLoadMore();
        this.handleSearch();
    }

    handleArticleCards() {
        const articleCards = document.querySelectorAll('.card');
        
        articleCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button, a')) {
                    const title = card.querySelector('.card-title')?.textContent;
                    if (title) {
                        this.openArticle(title);
                    }
                }
            });
        });
    }

    handleCategoryFilters() {
        const filterButtons = document.querySelectorAll('.category-btn, .filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter content
                const category = button.dataset.category || button.dataset.filter;
                this.filterContent(category);
            });
        });
    }

    handleLoadMore() {
        const loadMoreButtons = document.querySelectorAll('.load-more-btn');
        
        loadMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.loadMoreContent(button);
            });
        });
    }

    handleSearch() {
        const searchInputs = document.querySelectorAll('input[type="search"], .search-input');
        
        searchInputs.forEach(input => {
            let timeout;
            input.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.searchContent(e.target.value);
                }, 300);
            });
        });
    }

    openArticle(title) {
        // Create modal for article preview
        const modal = new bootstrap.Modal(document.createElement('div'));
        modal._element.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>Article preview functionality will be implemented here.</p>
                        <p>Full article page: <strong>${title}</strong></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Read Full Article</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal._element);
        modal.show();
        
        modal._element.addEventListener('hidden.bs.modal', () => {
            modal._element.remove();
        });
    }

    filterContent(category) {
        const items = document.querySelectorAll('[data-category]');
        
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.style.display = 'none';
            }
        });
    }

    async loadMoreContent(button) {
        const originalText = button.textContent;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
        button.disabled = true;
        
        try {
            // Simulate loading more content
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Here you would typically fetch more content from an API
            console.log('Loading more content...');
            
        } catch (error) {
            console.error('Failed to load more content:', error);
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    searchContent(query) {
        const items = document.querySelectorAll('.card, .article-item');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(query.toLowerCase());
            
            item.style.display = matches ? 'block' : 'none';
        });
    }
}

// Magazine Flipbook Handler
class MagazineManager {
    constructor() {
        this.init();
    }

    init() {
        this.handleMagazineCards();
        this.handleFlipbook();
        this.handlePreview();
    }

    handleMagazineCards() {
        const magazineCards = document.querySelectorAll('.magazine-card');
        
        magazineCards.forEach(card => {
            const readBtn = card.querySelector('.read-btn');
            const previewBtn = card.querySelector('.preview-btn');
            
            if (readBtn) {
                readBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const magazineId = readBtn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                    if (magazineId) {
                        this.openFlipbook(magazineId);
                    }
                });
            }
            
            if (previewBtn) {
                previewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const magazineId = previewBtn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                    if (magazineId) {
                        this.previewMagazine(magazineId);
                    }
                });
            }
        });
    }

    handleFlipbook() {
        // Initialize flipbook functionality
        window.openFlipbook = (magazineId) => {
            this.openFlipbook(magazineId);
        };
        
        window.closeFlipbook = () => {
            this.closeFlipbook();
        };
    }

    handlePreview() {
        window.previewMagazine = (magazineId) => {
            this.previewMagazine(magazineId);
        };
        
        window.closePreview = () => {
            this.closePreview();
        };
    }

    openFlipbook(magazineId) {
        const modal = this.createModal('flipbook-modal', 'modal-xl');
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Magazine Viewer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-0" style="height: 80vh;">
                    <iframe src="https://via.placeholder.com/800x1000/3498db/ffffff?text=Magazine+${magazineId}+Flipbook" 
                            width="100%" height="100%" frameborder="0"></iframe>
                </div>
            </div>
        `;
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }

    previewMagazine(magazineId) {
        const modal = this.createModal('preview-modal', 'modal-lg');
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Magazine Preview</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <div class="row">
                        <div class="col-4">
                            <img src="https://via.placeholder.com/200x300/3498db/ffffff?text=Page+1" 
                                 class="img-fluid rounded shadow" alt="Page 1">
                        </div>
                        <div class="col-4">
                            <img src="https://via.placeholder.com/200x300/e74c3c/ffffff?text=Page+2" 
                                 class="img-fluid rounded shadow" alt="Page 2">
                        </div>
                        <div class="col-4">
                            <img src="https://via.placeholder.com/200x300/27ae60/ffffff?text=Page+3" 
                                 class="img-fluid rounded shadow" alt="Page 3">
                        </div>
                    </div>
                    <p class="mt-3">Preview of Magazine ${magazineId}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="closePreview(); openFlipbook('${magazineId}')">
                        Read Full Magazine
                    </button>
                </div>
            </div>
        `;
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }

    createModal(id, size = 'modal-lg') {
        // Remove existing modal if any
        const existing = document.getElementById(id);
        if (existing) existing.remove();
        
        const modal = document.createElement('div');
        modal.id = id;
        modal.className = 'modal fade';
        modal.innerHTML = `<div class="modal-dialog ${size}"></div>`;
        
        document.body.appendChild(modal);
        return modal.querySelector('.modal-dialog');
    }

    closeFlipbook() {
        const modal = document.getElementById('flipbook-modal');
        if (modal) {
            bootstrap.Modal.getInstance(modal)?.hide();
        }
    }

    closePreview() {
        const modal = document.getElementById('preview-modal');
        if (modal) {
            bootstrap.Modal.getInstance(modal)?.hide();
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new FormHandler();
    new ContentManager();
    new MagazineManager();
    
    // Add fade-in animation to page elements
    const elements = document.querySelectorAll('.card, .btn, .badge');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('animate__animated', 'animate__fadeInUp');
    });
});

// Performance optimization
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});
