document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });

    // Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Catalog Functionality
    const mainSelectors = document.querySelectorAll('.main-selector');
    const branchContainer = document.getElementById('branchContainer');
    const branchTitle = document.getElementById('branchTitle');
    const branchLogos = document.getElementById('branchLogos');
    
    mainSelectors.forEach(selector => {
        selector.addEventListener('click', function() {
            const branchesJSON = this.getAttribute('data-branches');
            branchLogos.innerHTML = '';
            
            if (branchesJSON) {
                const branches = JSON.parse(branchesJSON);
                branchTitle.textContent = `${this.querySelector('p').textContent} - Available Catalogs`;
                
                branches.forEach(branch => {
                    const branchLogo = document.createElement('div');
                    branchLogo.className = 'branch-logo';
                    branchLogo.innerHTML = `
                        <img src="images/${branch.img}" alt="${branch.name}" loading="lazy">
                        <p>${branch.name} </p>
                    `;
                    branchLogo.addEventListener('click', (e) => {
                        e.stopPropagation();
                        window.open(branch.pdf, '_blank');
                    });
                    branchLogos.appendChild(branchLogo);
                });
                
                branchContainer.style.display = 'block';
                
                // Add this code to scroll to the branch container
                setTimeout(() => {
                    branchContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100); // Small delay to ensure the container is visible
            } else {
                branchContainer.style.display = 'none';
            }
        });
    });

    // PDF Viewer
    const pdfDisplay = document.getElementById('pdf-display');
    const iframe = document.getElementById('catalog-iframe');
    const fallbackLink = document.getElementById('pdf-fallback-link');
    const downloadBtn = document.getElementById('download-pdf');
    const closeBtn = document.getElementById('close-pdf');
    const loadingIndicator = document.querySelector('.pdf-loading');
    const fallbackSection = document.querySelector('.pdf-fallback');
    
    closeBtn.addEventListener('click', () => {
        pdfDisplay.style.display = 'none';
        iframe.src = 'about:blank';
    });

    // E-commerce Modals
    function setupModal(modalId, triggerId, closeId, cancelId, confirmId, url) {
        const modal = document.getElementById(modalId);
        const trigger = document.getElementById(triggerId);
        
        trigger.addEventListener('click', () => modal.style.display = "block");
        
        document.getElementById(closeId).onclick = 
        document.getElementById(cancelId).onclick = () => modal.style.display = "none";
        
        document.getElementById(confirmId).onclick = () => {
            window.open(url, "_blank");
            modal.style.display = "none";
        };
        
        window.addEventListener('click', (e) => {
            if (e.target == modal) modal.style.display = "none";
        });
    }

    setupModal("tokopedia-modal", "tokopedia-modal-btn", "close-tokopedia", "cancel-tokopedia", "confirm-tokopedia", "https://tk.tokopedia.com/ZSBhbnaUd/");
    setupModal("shopee-modal", "shopee-modal-btn", "close-shopee", "cancel-shopee", "confirm-shopee", "https://s.shopee.co.id/6ppSDpbaEj");
});