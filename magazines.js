// Archive filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const archiveItems = document.querySelectorAll('.archive-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            archiveItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Archive item click handlers
    archiveItems.forEach(item => {
        item.addEventListener('click', function() {
            const magazineName = this.querySelector('h4').textContent;
            alert(`Opening ${magazineName} - Flipbook functionality will be implemented here`);
        });
    });
    
    // Submission button handlers
    const submitButtons = document.querySelectorAll('.submit-btn');
    submitButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const magazineType = this.closest('.guideline-card').querySelector('h3').textContent;
            alert(`Submission form for ${magazineType} will open here`);
        });
    });
});

// Preview functionality
function previewMagazine(magazineId) {
    const modal = document.getElementById('preview-modal');
    const container = document.getElementById('preview-container');
    
    let previewContent = '';
    
    switch(magazineId) {
        case 'magazine1':
            previewContent = `
                <div class="preview-content">
                    <h3>Creative Minds Quarterly - Preview</h3>
                    <div class="preview-pages">
                        <img src="https://via.placeholder.com/250x350/3498db/ffffff?text=Page+1" alt="Page 1">
                        <img src="https://via.placeholder.com/250x350/3498db/ffffff?text=Page+2" alt="Page 2">
                        <img src="https://via.placeholder.com/250x350/3498db/ffffff?text=Page+3" alt="Page 3">
                    </div>
                    <p>Preview of the latest Creative Minds Quarterly issue featuring exceptional creative works.</p>
                    <button class="read-btn" onclick="closePreview(); openFlipbook('magazine1');">Read Full Magazine</button>
                </div>
            `;
            break;
        case 'magazine2':
            previewContent = `
                <div class="preview-content">
                    <h3>Tech Tomorrow - Preview</h3>
                    <div class="preview-pages">
                        <img src="https://via.placeholder.com/250x350/e74c3c/ffffff?text=Page+1" alt="Page 1">
                        <img src="https://via.placeholder.com/250x350/e74c3c/ffffff?text=Page+2" alt="Page 2">
                        <img src="https://via.placeholder.com/250x350/e74c3c/ffffff?text=Page+3" alt="Page 3">
                    </div>
                    <p>Preview of the latest Tech Tomorrow issue exploring cutting-edge technology trends.</p>
                    <button class="read-btn" onclick="closePreview(); openFlipbook('magazine2');">Read Full Magazine</button>
                </div>
            `;
            break;
        case 'magazine3':
            previewContent = `
                <div class="preview-content">
                    <h3>Global Perspectives - Preview</h3>
                    <div class="preview-pages">
                        <img src="https://via.placeholder.com/250x350/27ae60/ffffff?text=Page+1" alt="Page 1">
                        <img src="https://via.placeholder.com/250x350/27ae60/ffffff?text=Page+2" alt="Page 2">
                        <img src="https://via.placeholder.com/250x350/27ae60/ffffff?text=Page+3" alt="Page 3">
                    </div>
                    <p>Preview of the latest Global Perspectives issue featuring international stories and insights.</p>
                    <button class="read-btn" onclick="closePreview(); openFlipbook('magazine3');">Read Full Magazine</button>
                </div>
            `;
            break;
    }
    
    container.innerHTML = previewContent;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePreview() {
    const modal = document.getElementById('preview-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close preview modal when clicking outside
window.addEventListener('click', function(event) {
    const previewModal = document.getElementById('preview-modal');
    if (event.target === previewModal) {
        closePreview();
    }
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .preview-content {
        padding: 2rem;
        text-align: center;
    }
    
    .preview-pages {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin: 2rem 0;
        flex-wrap: wrap;
    }
    
    .preview-pages img {
        max-width: 150px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style);

// Enhanced Magazine Flipbook Functionality
class FlipbookManager {
    constructor() {
        this.magazines = {
            'sonderful': {
                title: 'Sonderful Writings',
                subtitle: 'Literary Magazine • Issue #12',
                pages: 32,
                description: 'A collection of creative works showcasing emerging literary talents.',
                previewPages: [
                    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop'
                ]
            },
            'neuronuggets': {
                title: 'NeuroNuggets',
                subtitle: 'Science Blog • Latest Edition',
                pages: 28,
                description: 'Exploring the fascinating world of neuroscience through engaging articles.',
                previewPages: [
                    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop'
                ]
            },
            'eunoia': {
                title: 'Eunoia Magazine',
                subtitle: 'Youth Culture • Volume 3',
                pages: 40,
                description: 'Celebrating youth culture and diverse perspectives worldwide.',
                previewPages: [
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop'
                ]
            },
            'pavlovs': {
                title: "Pavlov's Daughters",
                subtitle: 'Feminist Zine • Issue #8',
                pages: 24,
                description: 'A powerful feminist zine featuring voices that challenge and inspire.',
                previewPages: [
                    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=400&fit=crop'
                ]
            },
            'syj-special': {
                title: 'SYJ Times Special Edition',
                subtitle: 'Year-End Edition • 2024',
                pages: 48,
                description: 'Our comprehensive year-end special featuring the best of 2024.',
                previewPages: [
                    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
                ]
            },
            'global-voices': {
                title: 'Global Voices',
                subtitle: 'International Stories • Issue #1',
                pages: 36,
                description: 'Stories from young journalists across continents and cultures.',
                previewPages: [
                    'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=400&fit=crop'
                ]
            }
        };
        this.init();
    }

    init() {
        // Initialize flipbook events
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Make functions globally available
        window.openFlipbook = (magazineId) => this.openFlipbook(magazineId);
        window.closeFlipbook = () => this.closeFlipbook();
        window.previewMagazine = (magazineId) => this.previewMagazine(magazineId);
        window.closePreview = () => this.closePreview();
    }

    openFlipbook(magazineId) {
        const magazine = this.magazines[magazineId];
        if (!magazine) return;

        const modal = document.getElementById('flipbook-modal');
        const container = document.getElementById('flipbook-container');
        
        // Show loading state
        container.innerHTML = `
            <div class="flipbook-placeholder">
                <i class="fas fa-book-open fa-3x text-primary mb-3"></i>
                <p class="text-muted">Loading ${magazine.title}...</p>
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;

        // Update modal title
        modal.querySelector('.modal-title').textContent = magazine.title;
        
        // Show modal
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        // Simulate loading and show flipbook
        setTimeout(() => {
            this.loadFlipbook(container, magazine);
        }, 1500);
    }

    loadFlipbook(container, magazine) {
        container.innerHTML = `
            <div class="flipbook-reader h-100">
                <div class="flipbook-header p-3 bg-dark text-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">${magazine.title}</h6>
                            <small class="text-muted">${magazine.subtitle}</small>
                        </div>
                        <div class="flipbook-controls">
                            <button class="btn btn-sm btn-outline-light me-2" onclick="this.previousPage()">
                                <i class="fas fa-chevron-left"></i> Prev
                            </button>
                            <span class="page-indicator">1 / ${magazine.pages}</span>
                            <button class="btn btn-sm btn-outline-light ms-2" onclick="this.nextPage()">
                                Next <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flipbook-content flex-grow-1 d-flex">
                    <div class="page-container w-100 h-100 d-flex">
                        <div class="page left-page" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">
                            <div class="page-content p-4">
                                <h3 class="text-center mb-4">${magazine.title}</h3>
                                <div class="text-center mb-4">
                                    <img src="${magazine.previewPages[0]}" alt="Cover" style="max-width: 200px; border-radius: 8px;">
                                </div>
                                <p class="lead text-center">${magazine.description}</p>
                                <div class="text-center">
                                    <small class="text-muted">${magazine.subtitle}</small>
                                </div>
                            </div>
                        </div>
                        <div class="page right-page" style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);">
                            <div class="page-content p-4">
                                <h4 class="mb-4">Table of Contents</h4>
                                <ul class="list-unstyled">
                                    <li class="mb-2"><strong>Editorial</strong> <span class="float-end">3</span></li>
                                    <li class="mb-2">Featured Articles <span class="float-end">5</span></li>
                                    <li class="mb-2">Student Spotlight <span class="float-end">12</span></li>
                                    <li class="mb-2">Creative Corner <span class="float-end">18</span></li>
                                    <li class="mb-2">Reviews & Opinion <span class="float-end">24</span></li>
                                    <li class="mb-2">Community News <span class="float-end">30</span></li>
                                </ul>
                                <div class="mt-4 p-3 bg-light rounded">
                                    <small class="text-muted">
                                        <i class="fas fa-info-circle me-1"></i>
                                        This is a demo flipbook. Full interactive features will be available with the complete magazine viewer.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    previewMagazine(magazineId) {
        const magazine = this.magazines[magazineId];
        if (!magazine) return;

        const modal = document.getElementById('preview-modal');
        const container = document.getElementById('preview-container');
        
        modal.querySelector('.modal-title').textContent = `${magazine.title} - Preview`;
        
        container.innerHTML = `
            <div class="preview-content">
                <h4 class="mb-3">${magazine.title}</h4>
                <p class="text-muted mb-4">${magazine.description}</p>
                
                <div class="preview-pages">
                    ${magazine.previewPages.map((page, index) => `
                        <div class="preview-page">
                            <img src="${page}" alt="Page ${index + 1}" class="img-fluid rounded shadow">
                            <small class="d-block text-center mt-2 text-muted">Page ${index + 1}</small>
                        </div>
                    `).join('')}
                </div>
                
                <div class="preview-info">
                    <div class="row text-center">
                        <div class="col-md-4">
                            <div class="info-item">
                                <i class="fas fa-file-alt fa-2x text-primary mb-2"></i>
                                <h6>Pages</h6>
                                <span class="text-muted">${magazine.pages}</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="info-item">
                                <i class="fas fa-calendar fa-2x text-success mb-2"></i>
                                <h6>Published</h6>
                                <span class="text-muted">December 2024</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="info-item">
                                <i class="fas fa-download fa-2x text-info mb-2"></i>
                                <h6>Format</h6>
                                <span class="text-muted">Interactive PDF</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-4">
                    <button class="btn btn-primary btn-lg" onclick="closePreview(); openFlipbook('${magazineId}')">
                        <i class="fas fa-book-open me-2"></i>Read Full Magazine
                    </button>
                </div>
            </div>
        `;
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }

    closeFlipbook() {
        const modal = document.getElementById('flipbook-modal');
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) bsModal.hide();
    }

    closePreview() {
        const modal = document.getElementById('preview-modal');
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) bsModal.hide();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize flipbook manager
    new FlipbookManager();
    
    // Add enhanced hover effects for magazine cards
    const magazineCards = document.querySelectorAll('.magazine-flipbook-card');
    magazineCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
