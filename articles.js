// Enhanced Articles page functionality with Bootstrap integration
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const articleItems = document.querySelectorAll('.article-item');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    // Category filtering with smooth animations
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Add loading state
            articleItems.forEach(item => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '0.5';
            });
            
            setTimeout(() => {
                articleItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                    }
                });
            }, 150);
        });
    });

    // Enhanced article click handlers
    articleItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('button, a')) {
                const title = this.querySelector('.card-title')?.textContent;
                const category = this.querySelector('.badge')?.textContent;
                const author = this.querySelector('small')?.textContent;
                
                // Create Bootstrap modal
                const modal = new bootstrap.Modal(document.createElement('div'));
                modal._element.innerHTML = `
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
                
                document.body.appendChild(modal._element);
                modal.show();
                
                modal._element.addEventListener('hidden.bs.modal', () => {
                    modal._element.remove();
                });
            }
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Enhanced featured article handler
    const featuredArticle = document.querySelector('.hero-article, .card:first-of-type');
    if (featuredArticle) {
        featuredArticle.addEventListener('click', function(e) {
            if (!e.target.closest('button, a')) {
                const title = this.querySelector('.card-title')?.textContent || 'Featured Article';
                
                // Show toast notification
                const toast = new bootstrap.Toast(document.createElement('div'));
                toast._element.className = 'toast position-fixed top-0 end-0 m-3';
                toast._element.innerHTML = `
                    <div class="toast-header">
                        <i class="fas fa-newspaper text-primary me-2"></i>
                        <strong class="me-auto">Article Preview</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        Opening "${title}" - Full article functionality coming soon!
                    </div>
                `;
                
                document.body.appendChild(toast._element);
                toast.show();
                
                setTimeout(() => {
                    if (toast._element.parentNode) {
                        toast._element.remove();
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
                const toast = new bootstrap.Toast(document.createElement('div'));
                toast._element.className = 'toast position-fixed top-0 end-0 m-3';
                toast._element.innerHTML = `
                    <div class="toast-header bg-success text-white">
                        <i class="fas fa-check me-2"></i>
                        <strong class="me-auto">Success</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        More articles loaded successfully!
                    </div>
                `;
                
                document.body.appendChild(toast._element);
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

    // Initialize tooltips for any elements that have them
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Add smooth scrolling for category navigation
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Export functions for global use
window.ArticlesPage = {
    filterByCategory: function(category) {
        const button = document.querySelector(`[data-category="${category}"]`);
        if (button) {
            button.click();
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
