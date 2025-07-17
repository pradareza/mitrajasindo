// Mobile Menu Toggle - Update this function
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        this.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
    });
    
    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Add keyboard event listener for Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hideCompanyInfo();
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Initialize company info display
    const companyImages = document.querySelectorAll('.company-selector img');
    if (companyImages.length > 0) {
        companyImages[0].classList.add('active');
        document.getElementById('mitra-info').classList.add('active');
    }
});
