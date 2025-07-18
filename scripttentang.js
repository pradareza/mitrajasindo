/**
 * tentang Page Script
 * Handles toggles for company information and mobile menu
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
    });
    
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Add keyboard event listener for Escape key, back button
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hideCompanyInfo();
        }
    });
    document.addEventListener('backbutton', function(event) {
        event.preventDefault();
        hideCompanyInfo();
    }, false);
});

// Company Info Toggle
function showCompany(company) {
    document.querySelectorAll('.company-info').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(company + '-info').classList.add('active');
    
    document.querySelectorAll('.company-selector img').forEach(img => {
        img.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Hide Company Info
function hideCompanyInfo() {
    document.querySelectorAll('.company-info').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll('.company-selector img').forEach(img => {
        img.classList.remove('active');
    });
    
}
