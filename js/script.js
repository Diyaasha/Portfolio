// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top button (optional enhancement)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate');
            // Stop observing once animated
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all boxes/cards that should animate on scroll
const animateElements = [
    '.about-card',
    '.about-description',
    '.skill-category',
    '.timeline-item',
    '.project-card',
    '.contact-item'
];

animateElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
        scrollObserver.observe(element);
    });
});

// Timeline Progressive Animation
function animateTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;

    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timeline.offsetTop;
    const timelineHeight = timelineRect.height;
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Calculate when timeline enters viewport
    const timelineStart = timelineTop - viewportHeight + 200; // Start animating 200px before entering viewport
    const timelineEnd = timelineTop + timelineHeight;
    
    // Calculate fill percentage based on scroll progress
    let fillPercentage = 0;
    
    if (scrollPosition >= timelineStart) {
        const scrolledPastStart = scrollPosition - timelineStart;
        const totalScrollable = timelineEnd - timelineStart;
        fillPercentage = (scrolledPastStart / totalScrollable) * 100;
        fillPercentage = Math.min(100, Math.max(0, fillPercentage));
    }

    // Update the blue line height using CSS variable
    timeline.style.setProperty('--timeline-fill', `${fillPercentage}%`);

    // Update individual timeline items visibility
    timelineItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemTop = itemRect.top + window.scrollY;
        const itemCenter = itemTop + (itemRect.height / 2);
        const currentScroll = scrollPosition + viewportHeight;
        
        // Check if item center has passed the viewport (with some offset)
        if (currentScroll >= itemCenter - 150) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
}

// Update timeline on scroll with throttling
let timelineAnimationFrame;
window.addEventListener('scroll', () => {
    if (timelineAnimationFrame) {
        cancelAnimationFrame(timelineAnimationFrame);
    }
    timelineAnimationFrame = requestAnimationFrame(() => {
        animateTimeline();
    });
});

// Initial call on page load
window.addEventListener('load', () => {
    animateTimeline();
});

// Also call immediately if page is already loaded
if (document.readyState === 'complete') {
    animateTimeline();
} else {
    document.addEventListener('DOMContentLoaded', animateTimeline);
}

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth follower animation
function animateFollower() {
    // Smooth easing for follower
    const delay = 0.1;
    followerX += (mouseX - followerX) * delay;
    followerY += (mouseY - followerY) * delay;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

// Add hover effect on interactive elements
const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
});
