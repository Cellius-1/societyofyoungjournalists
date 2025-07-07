// Simplified Articles page functionality with Alpine.js integration
document.addEventListener('DOMContentLoaded', function() {
    console.log('Articles page loaded with Alpine.js');
    
    // Initialize AOS for animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
    
    // Newsletter form handling
    const newsletterForms = document.querySelectorAll('form');
    newsletterForms.forEach(form => {
        // Only handle forms that don't have Alpine.js directives
        if (!form.hasAttribute('x-data') && !form.closest('[x-data]')) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]')?.value;
                
                if (email && validateEmail(email)) {
                    showSuccessMessage(`Successfully subscribed with ${email}!`);
                    this.reset();
                } else {
                    showErrorMessage('Please enter a valid email address.');
                }
            });
        }
    });
    
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function showSuccessMessage(message) {
        showAlert(message, 'success');
    }
    
    function showErrorMessage(message) {
        showAlert(message, 'danger');
    }
    
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
        alert.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
});

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Export utility functions for global access
window.ArticlesPageUtils = {
    showAlert: function(message, type = 'info') {
        // Function available globally for other scripts
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
        alert.innerHTML = `
            <i class="fas fa-info-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
};
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Read Full Article</button>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modalElement);
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
                
                modalElement.addEventListener('hidden.bs.modal', () => {
                    modalElement.remove();
                });
            }
        });
    });

    // Newsletter signup
    const newsletterForms = document.querySelectorAll('form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]')?.value;
            
            if (email) {
                // Show success alert
                const alert = document.createElement('div');
                alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
                alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
                alert.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Successfully subscribed with ${email}!
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                
                document.body.appendChild(alert);
                this.reset();
                
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.remove();
                    }
                }, 5000);
            }
        });
    });

    // Initialize
    filterArticles('all');
});
        // Step 2: Find and activate the "All Articles" button
        const allArticlesBtn = document.querySelector('.category-btn[data-category="all"]');
        if (allArticlesBtn) {
            allArticlesBtn.classList.add('active');
            console.log('Added active to "All Articles" button');
        } else {
            console.error('All Articles button not found!');
        }
        
        // Step 3: Show all articles immediately
        articleItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
            item.style.animation = '';
        });
        
        // Step 4: Update results count
        updateResultsCount('all');
        
        // Step 5: Force visual refresh
        setTimeout(() => {
            // Verify button states after reset
            console.log('After reset verification:');
            allButtons.forEach(btn => {
                console.log(`Button ${btn.getAttribute('data-category')}: ${btn.classList.contains('active') ? 'ACTIVE' : 'inactive'}`);
            });
        }, 100);
    

    // Enhanced article click handlers
    articleItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('button, a')) {
                const title = this.querySelector('.card-title')?.textContent;
                const category = this.querySelector('.badge')?.textContent;
                const author = this.querySelector('small')?.textContent;
                
                // Create Bootstrap modal
                const modalElement = document.createElement('div');
                modalElement.className = 'modal fade';
                modalElement.innerHTML = `
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <span class="badge bg-primary mb-3">${category}</span>
                                <p class="text-muted mb-3">${author}</p>
                                <p>This is a preview of the article. The full article page would contain the complete content, related articles, and sharing options.</p>
                                <div class="alert alert-info">
                                    <i class="fas fa-info-circle me-2"></i>
                                    Full article functionality will be implemented with a content management system.
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Read Full Article</button>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modalElement);
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
                
                modalElement.addEventListener('hidden.bs.modal', () => {
                    modalElement.remove();
                });
            }
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            if (this.style.display !== 'none') {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (this.style.display !== 'none') {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            }
        });
    });

    // Enhanced featured article handler
    const featuredArticle = document.querySelector('.card:first-of-type');
    if (featuredArticle) {
        featuredArticle.addEventListener('click', function(e) {
            if (!e.target.closest('button, a')) {
                const title = this.querySelector('.card-title')?.textContent || 'Featured Article';
                
                // Show toast notification
                const toastElement = document.createElement('div');
                toastElement.className = 'toast position-fixed top-0 end-0 m-3';
                toastElement.innerHTML = `
                    <div class="toast-header">
                        <i class="fas fa-newspaper text-primary me-2"></i>
                        <strong class="me-auto">Article Preview</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        Opening "${title}" - Full article functionality coming soon!
                    </div>
                `;
                
                document.body.appendChild(toastElement);
                const toast = new bootstrap.Toast(toastElement);
                toast.show();
                
                setTimeout(() => {
                    if (toastElement.parentNode) {
                        toastElement.remove();
                    }
                }, 5000);
            }
        });
    }

    // Enhanced load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', async function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
            this.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success toast
                const toastElement = document.createElement('div');
                toastElement.className = 'toast position-fixed top-0 end-0 m-3';
                toastElement.innerHTML = 
                    <div class="toast-header bg-success text-white">
                        <i class="fas fa-check me-2"></i>
                        <strong class="me-auto">Success</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        More articles loaded successfully!
                    </div>

                    <div class="toast-body">
                        More articles loaded successfully!
                    </div>
                `;

                document.body.appendChild(toastElement);
                const toast = new bootstrap.Toast(toastElement);
                toast.show();
                
            } catch (error) {
                console.error('Failed to load more articles:', error);
            } finally {
                this.innerHTML = originalText;
                this.disabled = false;
            }
        });
    }

    // Enhanced newsletter signup
    const newsletterForms = document.querySelectorAll('form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]')?.value;
            
            if (email) {
                // Show success alert
                const alert = document.createElement('div');
                alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
                alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
                alert.innerHTML = 
                    <i class="fas fa-check-circle me-2"></i>
                    Successfully subscribed with ${email}!
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                
                document.body.appendChild(alert);
                this.reset();
                
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.remove();
                    }
                }, 5000);
            }
        });
    });

    // Initialize with all articles visible
    updateResultsCount('all');
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent =
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .results-indicator {
            background: rgba(52, 152, 219, 0.1);
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            transition: all 0.3s ease;
        }
        
        .category-btn {
            position: relative;
            overflow: hidden;
        }
        
        .category-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .category-btn:hover::before {
            left: 100%;
        }
        
        .article-item {
            transition: all 0.3s ease !important;
        }
    ;
    document.head.appendChild(style);

    // Initialize tooltips for any elements that have them
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

// Global functions for external access
window.ArticlesPage = {
    filterByCategory: function(category) {
        const button = document.querySelector(`[data-category="${category}"]`);
        if (button) {
            button.click();
        }
    },
    
    resetFilters: function() {
        const clearBtn = document.getElementById('clearFiltersBtn');
        if (clearBtn) {
            clearBtn.click();
        }
    },
    
    searchArticles: function(query) {
        const articles = document.querySelectorAll('.article-item');
        articles.forEach(article => {
            const text = article.textContent.toLowerCase();
            const matches = text.includes(query.toLowerCase());
            article.style.display = matches ? 'block' : 'none';
        });
    }
};
