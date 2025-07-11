// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const heroSection = document.querySelector('.hero-section');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
    });
    
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Initialize carousel
    const dots = document.querySelectorAll('.carousel-dot');
    const track = document.querySelector('.carousel-track');
    let currentIndex = 0;
    let interval;
    const slideCount = document.querySelectorAll('.carousel-slide').length;
    const slideDuration = 5000;

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        goToSlide(currentIndex);
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, slideDuration);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(interval);
            goToSlide(index);
            startAutoSlide();
        });
    });

    startAutoSlide();


// Brand Marquee Animation
const brandsTrack = document.querySelector('.brands-track');
const brandItems = document.querySelectorAll('.brand-item');
const container = document.querySelector('.brands-container');

// Clone brand items for seamless looping
brandItems.forEach(item => {
    const clone = item.cloneNode(true);
    brandsTrack.appendChild(clone);
});

const items = document.querySelectorAll('.brand-item'); // Now includes clones
let isPaused = false;
let animationId;
let currentPosition = 0;
const speed = 1; // Adjust speed as needed

function normalizeImageSizes() {
    const images = document.querySelectorAll('.brand-item img');
    let maxHeight = 0;
    let maxWidth = 0;
    
    // First pass to find maximum dimensions
    images.forEach(img => {
        img.style.height = 'auto';
        img.style.width = 'auto';
        maxHeight = Math.max(maxHeight, img.naturalHeight || img.offsetHeight);
        maxWidth = Math.max(maxWidth, img.naturalWidth || img.offsetWidth);
    });
    
    // Calculate proportional sizes
    const targetHeight = 60; // From your CSS
    const targetWidth = (targetHeight / maxHeight) * maxWidth;
    
    // Apply consistent sizing
    images.forEach(img => {
        img.style.maxHeight = `${targetHeight}px`;
        img.style.maxWidth = `${targetWidth}px`;
    });
}

function animate() {
    if (isPaused) return;
    
    currentPosition -= speed;
    
    // When we've scrolled all original items, reset to start
    if (currentPosition <= -brandsTrack.scrollWidth / 2) {
        currentPosition = 0;
        // Jump back without animation
        brandsTrack.style.transition = 'none';
        brandsTrack.style.transform = `translateX(${currentPosition}px)`;
        // Force reflow to ensure the jump happens
        void brandsTrack.offsetWidth;
    }
    
    // Apply smooth scrolling
    brandsTrack.style.transition = 'transform 0.5s linear';
    brandsTrack.style.transform = `translateX(${currentPosition}px)`;
    
    animationId = requestAnimationFrame(animate);
}

function startAnimation() {
    isPaused = false;
    if (!animationId) {
        animate();
    }
}

function stopAnimation() {
    isPaused = true;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// Initialize
normalizeImageSizes();
startAnimation();

// Pause on hover
container.addEventListener('mouseenter', stopAnimation);
container.addEventListener('mouseleave', startAnimation);

// Handle window resize
window.addEventListener('resize', function() {
    normalizeImageSizes();
});

    // Static promo click handler
    const staticPromos = document.querySelectorAll('.static-promo');
    
    staticPromos.forEach(promo => {
        promo.addEventListener('click', function() {
            // Get the image source from the clicked promo
            const imgSrc = this.querySelector('img').src;
            
            // Expand the clicked promo
            this.classList.toggle('expanded');
            
            // Collapse other promos
            staticPromos.forEach(otherPromo => {
                if (otherPromo !== this) {
                    otherPromo.classList.remove('expanded');
                }
            });
        });
    });
});

// Background image rotation code remains the same
const images = [
    'Pic/page1.jpeg',
    'Pic/page2.jpeg',
    'Pic/page3.jpeg',
    'Pic/page4.jpeg'
];
    
// Preload images
images.forEach(img => {
    new Image().src = img;
});

let current = 0;
const elem = document.querySelector('.hero-section');
    
// Set initial background
if (images.length > 0) {
    elem.style.backgroundImage = `url('${images[0]}')`;
}
    
function changeBackground() {
    if (images.length === 0) return;
    
    current = (current + 1) % images.length;
    elem.style.backgroundImage = `url('${images[current]}')`;
    
    // Force redraw (helps with transition)
    void elem.offsetWidth;
}
    
// Change every 5 seconds only if we have multiple images
if (images.length > 1) {
    setInterval(changeBackground, 5000);
}
