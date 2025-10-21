// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const rotatingTitles = document.querySelectorAll('.rotating-title');
const statNumbers = document.querySelectorAll('.stat-number');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Rotating job titles
let currentTitleIndex = 0;
function rotateJobTitles() {
    // Hide current title
    rotatingTitles[currentTitleIndex].classList.remove('active');
    
    // Move to next title
    currentTitleIndex = (currentTitleIndex + 1) % rotatingTitles.length;
    
    // Show next title
    rotatingTitles[currentTitleIndex].classList.add('active');
}

// Start rotating titles every 3 seconds
setInterval(rotateJobTitles, 3000);

// Animated counters
function animateCounter(element, target, duration = 2000) {
    const start = parseInt(element.textContent) || 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Special handling for the "Days Intern" counter
        if (target === 45) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = Math.floor(current);
        }
        
        element.classList.add('counting');
    }, 16);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Animate counters when stats section comes into view
            if (entry.target.classList.contains('stats-grid')) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
            
            // Animate skill bars when skills section comes into view
            if (entry.target.classList.contains('skills-grid')) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                        bar.classList.add('animate');
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const revealElements = document.querySelectorAll('section, .stat-card, .skill-category, .project-card, .timeline-item, .achievement-card');
revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.9)';
    }
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click handlers for project buttons with "Coming Soon" tooltip
const projectLinks = document.querySelectorAll('.project-buttons a');
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            alert('Coming Soon! This project will be available shortly.');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero tagline
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const tagline = document.querySelector('.hero-tagline');
    const originalText = tagline.textContent;
    setTimeout(() => {
        typeWriter(tagline, originalText, 30);
    }, 1500);
});

// Add smooth reveal animation for sections
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Apply reveal animation to all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealOnScroll.observe(section);
});

// Add interactive hover effects to navigation
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Add dynamic gradient animation to hero background
function animateHeroGradient() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const time = Date.now() * 0.002;
        const x = Math.sin(time) * 50 + 50;
        const y = Math.cos(time * 0.7) * 50 + 50;
        
        hero.style.background = `
            radial-gradient(circle at ${x}% ${y}%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${100-x}% ${100-y}%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)
        `;
    }
}

// Start gradient animation
setInterval(animateHeroGradient, 100);

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #6366f1, #8b5cf6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add floating particles effect
function createFloatingParticles() {
    const particleCount = 20;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        
        particle.x = Math.random() * window.innerWidth;
        particle.y = Math.random() * window.innerHeight;
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
        
        document.body.appendChild(particle);
        particles.push(particle);
    }
    
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
            
            particle.style.left = particle.x + 'px';
            particle.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Initialize particles on load
window.addEventListener('load', () => {
    setTimeout(createFloatingParticles, 2000);
});

// Add loading screen
function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const spinnerContainer = document.createElement('div');
    spinnerContainer.style.cssText = `
        text-align: center;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(99, 102, 241, 0.3);
        border-top: 3px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    `;
    
    const loadingText = document.createElement('p');
    loadingText.textContent = 'Loading Portfolio...';
    loadingText.style.cssText = `
        color: #ffffff;
        font-size: 1.1rem;
        font-weight: 500;
        margin: 0;
    `;
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    spinnerContainer.appendChild(spinner);
    spinnerContainer.appendChild(loadingText);
    loader.appendChild(spinnerContainer);
    document.body.appendChild(loader);
    
    // Remove loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize loading screen
createLoadingScreen();

// Console message
console.log(`
%c👋 Welcome to Mahadevu Pratheep's Portfolio!
%cBuilt with passion using HTML, CSS, and JavaScript.
%cFeel free to explore and reach out for collaborations!
`, 
'color: #6366f1; font-size: 16px; font-weight: bold;',
'color: #8b5cf6; font-size: 14px;',
'color: #cbd5e0; font-size: 12px;'
);