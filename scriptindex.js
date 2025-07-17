document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
    }
    
    mobileMenuButton.addEventListener('click', toggleMobileMenu);

    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Carousel functionality
    const carousel = {
        track: document.querySelector('.carousel-track'),
        slides: document.querySelectorAll('.carousel-slide'),
        prevBtn: document.querySelector('.carousel-arrow.prev'),
        nextBtn: document.querySelector('.carousel-arrow.next'),
        currentIndex: 0,
        isDragging: false,
        startPosX: 0,
        currentTranslate: 0,
        prevTranslate: 0,

        init() {
            this.prevBtn.addEventListener('click', () => this.goToPrevSlide());
            this.nextBtn.addEventListener('click', () => this.goToNextSlide());
            
            // Touch events
            this.track.addEventListener('touchstart', (e) => this.touchStart(e), { passive: false });
            this.track.addEventListener('touchmove', (e) => this.touchMove(e), { passive: false });
            this.track.addEventListener('touchend', () => this.touchEnd());
            
            // Mouse events
            this.track.addEventListener('mousedown', (e) => this.touchStart(e));
            this.track.addEventListener('mousemove', (e) => this.touchMove(e));
            this.track.addEventListener('mouseup', () => this.touchEnd());
            this.track.addEventListener('mouseleave', () => this.touchEnd());
            
            this.updatePosition();
        },

        goToPrevSlide() {
            this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
            this.updatePosition();
        },

        goToNextSlide() {
            this.currentIndex = this.currentIndex < this.slides.length - 1 ? this.currentIndex + 1 : 0;
            this.updatePosition();
        },

        updatePosition() {
            this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        },

        touchStart(e) {
            this.isDragging = true;
            this.startPosX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            this.prevTranslate = this.currentIndex * -this.track.offsetWidth;
            this.currentTranslate = this.prevTranslate;
            this.track.style.transition = 'none';
            
            if (e.type === 'mousedown') e.preventDefault();
        },

        touchMove(e) {
            if (!this.isDragging) return;
            
            const currentPosX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const diffX = currentPosX - this.startPosX;
            this.currentTranslate = this.prevTranslate + diffX;
            this.track.style.transform = `translateX(${this.currentTranslate}px)`;
            
            if (e.type === 'touchmove') e.preventDefault();
        },

        touchEnd() {
            if (!this.isDragging) return;
            this.isDragging = false;
            
            const movedBy = this.currentTranslate - this.prevTranslate;
            if (movedBy < -100 && this.currentIndex < this.slides.length - 1) {
                this.currentIndex++;
            } else if (movedBy > 100 && this.currentIndex > 0) {
                this.currentIndex--;
            }
            
            this.track.style.transition = 'transform 0.5s ease';
            this.updatePosition();
        }
    };

    // Brand Marquee
    const brandMarquee = {
        track: document.querySelector('.brands-track'),
        container: document.querySelector('.brands-container'),
        animationId: null,
        currentPosition: 0,
        speed: 1,
        isPaused: false,

        init() {
            // Clone brand items for seamless looping
            document.querySelectorAll('.brand-item').forEach(item => {
                this.track.appendChild(item.cloneNode(true));
            });
            
            this.normalizeImageSizes();
            this.startAnimation();
            
            // Event listeners
            this.container.addEventListener('mouseenter', () => this.stopAnimation());
            this.container.addEventListener('mouseleave', () => this.startAnimation());
            window.addEventListener('resize', () => this.normalizeImageSizes());
        },

        normalizeImageSizes() {
            const images = document.querySelectorAll('.brand-item img');
            const targetHeight = 60;
            
            images.forEach(img => {
                
                // Calculate proportional width
                const ratio = img.naturalWidth / img.naturalHeight;
                const targetWidth = targetHeight * ratio;
                
                // Apply constrained dimensions
                img.style.maxHeight = `${targetHeight}px`;
                img.style.maxWidth = `${targetWidth}px`;
            });
        },

        animate() {
            if (this.isPaused) return;
            
            this.currentPosition -= this.speed;
            
            // Reset to start when we've scrolled all original items
            if (this.currentPosition <= -this.track.scrollWidth / 2) {
                this.currentPosition = 0;
                this.track.style.transition = 'none';
                this.track.style.transform = `translateX(${this.currentPosition}px)`;
                void this.track.offsetWidth; // Force reflow
            }
            
            this.track.style.transition = 'transform 0.5s linear';
            this.track.style.transform = `translateX(${this.currentPosition}px)`;
            
            this.animationId = requestAnimationFrame(() => this.animate());
        },

        startAnimation() {
            this.isPaused = false;
            if (!this.animationId) {
                this.animate();
            }
        },

        stopAnimation() {
            this.isPaused = true;
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
        }
    };

    // Static Promos
    const staticPromos = document.querySelectorAll('.static-promo');
    staticPromos.forEach(promo => {
        promo.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            // Collapse other promos
            staticPromos.forEach(otherPromo => {
                if (otherPromo !== this) {
                    otherPromo.classList.remove('expanded');
                }
            });
        });
    });

    // Background Image Rotator
    const bgRotator = {
        images: [
            'Pic/page1.jpeg',
            'Pic/page2.jpeg',
            'Pic/page3.jpeg',
            'Pic/page4.jpeg'
        ],
        current: 0,
        element: document.querySelector('.hero-section'),
        interval: null,

        init() {
            if (this.images.length === 0) return;
            
            // Preload images
            this.images.forEach(img => new Image().src = img);
            
            // Set initial background
            this.element.style.backgroundImage = `url('${this.images[0]}')`;
            
            // Start rotation if multiple images
            if (this.images.length > 1) {
                this.interval = setInterval(() => this.changeBackground(), 5000);
            }
        },

        changeBackground() {
            this.current = (this.current + 1) % this.images.length;
            this.element.style.backgroundImage = `url('${this.images[this.current]}')`;
            void this.element.offsetWidth; // Force redraw
        }
    };

    // Initialize all components
    carousel.init();
    brandMarquee.init();
    bgRotator.init();

    // Run image normalization after all assets load
    window.addEventListener('load', () => {
        brandMarquee.normalizeImageSizes();
    });
});
