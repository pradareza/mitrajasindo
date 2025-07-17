/**
 * Contact Page Script
 * Handles mobile menu, form validation, and WhatsApp submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const dom = {
        mobileMenuButton: document.querySelector('.mobile-menu-btn'),
        mobileMenu: document.getElementById('mobileMenu'),
        contactForm: document.getElementById('contactForm'),
        sourceSelect: document.getElementById('source'),
        sourceOtherContainer: document.getElementById('sourceOtherContainer'),
        sourceOtherInput: document.getElementById('sourceOther'),
        subjectSelect: document.getElementById('subject'),
        subjectOtherContainer: document.getElementById('subjectOtherContainer'),
        subjectOtherInput: document.getElementById('subjectOther'),
        yearElement: document.getElementById('year')
    };

    // Initialize the page
    init();

    function init() {
        // Set current year in footer
        if (dom.yearElement) {
            dom.yearElement.textContent = new Date().getFullYear();
        }

        // Setup mobile menu toggle
        setupMobileMenu();

        // Setup dynamic "Other" input fields
        setupDynamicInputs();

        // Setup form submission
        if (dom.contactForm) {
            setupFormSubmission();
        }
    }

    function setupMobileMenu() {
        if (!dom.mobileMenuButton || !dom.mobileMenu) return;

        dom.mobileMenuButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            dom.mobileMenu.classList.toggle('active');

            // Toggle menu icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking on links
        const mobileMenuLinks = dom.mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                dom.mobileMenu.classList.remove('active');
                dom.mobileMenuButton.setAttribute('aria-expanded', 'false');
                const icon = dom.mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    function setupDynamicInputs() {
        // Source select change handler
        if (dom.sourceSelect && dom.sourceOtherContainer) {
            dom.sourceSelect.addEventListener('change', function() {
                const showOther = this.value === 'Other';
                dom.sourceOtherContainer.style.display = showOther ? 'block' : 'none';
                dom.sourceOtherInput.required = showOther;
                
                if (!showOther) {
                    dom.sourceOtherInput.value = '';
                }
            });
        }

        // Subject select change handler
        if (dom.subjectSelect && dom.subjectOtherContainer) {
            dom.subjectSelect.addEventListener('change', function() {
                const showOther = this.value === 'Other';
                dom.subjectOtherContainer.style.display = showOther ? 'block' : 'none';
                dom.subjectOtherInput.required = showOther;
                
                if (!showOther) {
                    dom.subjectOtherInput.value = '';
                }
            });
        }
    }

    function setupFormSubmission() {
        dom.contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            const formData = getFormData();
            const whatsappUrl = generateWhatsAppUrl(formData);
            
            window.open(whatsappUrl, '_blank');
            resetForm();
        });
    }

    function validateForm() {
        const requiredFields = ['name', 'phone', 'message'];
        let isValid = true;

        // Check required fields
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                showError(field, 'Field ini wajib diisi');
                isValid = false;
            }
        });

        // Check "Other" fields if selected
        if (dom.sourceSelect.value === 'Other' && !dom.sourceOtherInput.value.trim()) {
            showError(dom.sourceOtherInput, 'Harap isi sumber informasi Anda');
            isValid = false;
        }

        if (dom.subjectSelect.value === 'Other' && !dom.subjectOtherInput.value.trim()) {
            showError(dom.subjectOtherInput, 'Harap isi penjelasan subjek Anda');
            isValid = false;
        }

        return isValid;
    }

    function showError(field, message) {
        if (!field) return;
        
        // Create or update error message
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('p');
            errorElement.className = 'error-message';
            errorElement.style.color = 'var(--secondary)';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        errorElement.textContent = message;
        field.style.borderColor = 'var(--secondary)';
        
        // Focus on the first invalid field
        if (!document.querySelector('.error-message:first-of-type')) {
            field.focus();
        }
    }

    function getFormData() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        const subject = dom.subjectSelect.value === 'Other' 
            ? dom.subjectOtherInput.value.trim() 
            : dom.subjectSelect.options[dom.subjectSelect.selectedIndex].text;
        
        const source = dom.sourceSelect.value === 'Other'
            ? dom.sourceOtherInput.value.trim()
            : dom.sourceSelect.options[dom.sourceSelect.selectedIndex].text;
        
        const message = document.getElementById('message').value.trim();

        return {
            name,
            phone,
            subject,
            source,
            message
        };
    }

    function generateWhatsAppUrl(formData) {
        const whatsappMessage = 
            `Halo MitraJasindo,\n\nSaya ${formData.name} ingin menghubungi Anda.\n\n` +
            `*Subjek:* ${formData.subject}\n` +
            `*Sumber:* ${formData.source}\n\n` +
            `*Detail Kontak:*\n` +
            `Nama: ${formData.name}\n` +
            `Telepon: ${formData.phone}\n\n` +
            `*Pesan:*\n${formData.message}`;
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '+6285274998496';
        
        return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    }

    function resetForm() {
        dom.contactForm.reset();
        
        // Reset "Other" fields visibility
        if (dom.sourceOtherContainer) {
            dom.sourceOtherContainer.style.display = 'none';
            dom.sourceOtherInput.required = false;
        }
        
        if (dom.subjectOtherContainer) {
            dom.subjectOtherContainer.style.display = 'none';
            dom.subjectOtherInput.required = false;
        }
        
        // Clear any error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }
});

    // Setup location buttons
    setupLocationButtons();


// Add this new function
function setupLocationButtons() {
    const locationButtons = document.querySelectorAll('.location-btn');
    const mapCards = document.querySelectorAll('.map-card');

    locationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const location = this.dataset.location;
            
            // Update button states
            locationButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show/hide maps
            mapCards.forEach(card => {
                card.classList.add('hidden');
            });
            document.getElementById(`${location}-map`).classList.remove('hidden');
        });
    });
}