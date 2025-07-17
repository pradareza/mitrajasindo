// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const heroSection = document.querySelector('.hero-section');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
        // End of main DOMContentLoaded
    });
    
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

// Existing mobile menu and other code...

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Initialize carousel with arrows and swipe
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-arrow.prev');
const nextBtn = document.querySelector('.carousel-arrow.next');
let currentIndex = 0;
let isDragging = false;
let startPosX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Set initial position
updateCarouselPosition();

// Arrow button event listeners
prevBtn.addEventListener('click', goToPrevSlide);
nextBtn.addEventListener('click', goToNextSlide);

// Touch event listeners for mobile
track.addEventListener('touchstart', touchStart, { passive: false });
track.addEventListener('touchmove', touchMove, { passive: false });
track.addEventListener('touchend', touchEnd);

// Mouse event listeners for desktop
track.addEventListener('mousedown', touchStart);
track.addEventListener('mousemove', touchMove);
track.addEventListener('mouseup', touchEnd);
track.addEventListener('mouseleave', touchEnd);

function goToPrevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length - 1;
    }
    updateCarouselPosition();
}

function goToNextSlide() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarouselPosition();
}

function updateCarouselPosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function touchStart(e) {
    if (e.type === 'mousedown') {
        isDragging = true;
        startPosX = e.clientX;
        e.preventDefault();
    } else {
        isDragging = true;
        startPosX = e.touches[0].clientX;
    }
    prevTranslate = currentIndex * -track.offsetWidth;
    currentTranslate = prevTranslate;
    track.style.transition = 'none';
}

function touchMove(e) {
    if (!isDragging) return;
    
    let currentPosX;
    if (e.type === 'mousemove') {
        currentPosX = e.clientX;
    } else {
        currentPosX = e.touches[0].clientX;
        e.preventDefault();
    }
    
    const diffX = currentPosX - startPosX;
    currentTranslate = prevTranslate + diffX;
    track.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex++;
    } else if (movedBy > 100 && currentIndex > 0) {
        currentIndex--;
    }
    
    track.style.transition = 'transform 0.5s ease';
    updateCarouselPosition();
}


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