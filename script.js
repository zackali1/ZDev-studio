// Initialize EmailJS with your public key
(function() {
    // Public Key from EmailJS
    emailjs.init("TVVd91pnjqvySMxhl");
})();

// Form handling
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic form validation
    if (!name || !email || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    
    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            "service_7q9vx98", // Your EmailJS service ID
            "template_58s189s", // Your EmailJS template ID
            {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'zackbusinesses712@gmail.com',
                reply_to: email
            }
        );

        showMessage('Thank you for your interest! We will contact you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        console.error('EmailJS error:', error);
        showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
        submitButton.classList.remove('loading');
    }
});

// Helper function to show messages
function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Add message after the form
    contactForm.insertAdjacentElement('afterend', messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animation for elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Observe all service cards and process steps
document.querySelectorAll('.service-card, .step').forEach((el) => observer.observe(el));

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});
