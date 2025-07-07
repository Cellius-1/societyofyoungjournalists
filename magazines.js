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
