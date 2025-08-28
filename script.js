// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
const animateElements = document.querySelectorAll('.service-card, .benefit-item, .step-item, .stat-item');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// EMI Calculator (Simple Implementation)
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.querySelector('.hero-card .btn-primary');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            alert('EMI Calculator: This feature will calculate your loan EMI based on the entered values. Integration with actual calculation logic would be implemented here.');
        });
    }
});

// Button Click Handlers
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add click effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Handle specific button actions
        const buttonText = this.textContent.toLowerCase();
        
        if (buttonText.includes('apply')) {
            // Handle apply now clicks
            console.log('Apply Now button clicked');
            // Here you would typically redirect to an application form or modal
        } else if (buttonText.includes('eligibility')) {
            // Handle check eligibility clicks
            console.log('Check Eligibility button clicked');
            // Here you would typically show eligibility criteria or form
        } else if (buttonText.includes('expert')) {
            // Handle talk to expert clicks
            console.log('Talk to Expert button clicked');
            // Here you would typically show contact form or phone number
        }
    });
});

// Form Validation (for the calculator inputs)
const inputs = document.querySelectorAll('.input-group input');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        // Remove non-numeric characters except for decimal point
        if (this.type === 'text' && this.placeholder.includes('₹')) {
            this.value = this.value.replace(/[^\d.]/g, '');
        }
        
        // Add validation styling
        if (this.value.trim() === '') {
            this.style.borderColor = '#e5e7eb';
        } else {
            this.style.borderColor = '#1BAA8A';
        }
    });
    
    input.addEventListener('blur', function() {
        // Format currency values
        if (this.placeholder.includes('₹') && this.value) {
            const value = parseFloat(this.value.replace(/,/g, ''));
            if (!isNaN(value)) {
                this.value = '₹' + value.toLocaleString('en-IN');
            }
        }
    });
    
    input.addEventListener('focus', function() {
        // Remove formatting for editing
        if (this.placeholder.includes('₹')) {
            this.value = this.value.replace(/₹|,/g, '');
        }
    });
});



// Statistics Counter Animation
const statsItems = document.querySelectorAll('.stat-item h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/\d/g, '');
            
            if (number) {
                animateCounter(target, 0, number, suffix, 2000);
                statsObserver.unobserve(target);
            }
        }
    });
});

statsItems.forEach(item => statsObserver.observe(item));

function animateCounter(element, start, end, suffix, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

function handleSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    if (name && email && phone) {
        alert('Form submitted successfully! Name: ' + name + ', Email: ' + email + ', Phone: ' + phone);
    } else {
        alert('Please fill out all fields.');
    }
}

// 