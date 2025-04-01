/**
 * Harmonyplan Insurance Website JavaScript
 * This file contains all JavaScript functionality for the website
 */

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Add breadcrumbs schema dynamically
    addBreadcrumbsSchema();
    
    // Set up smooth scrolling for anchor links
    setupSmoothScrolling();
});

/**
 * Adds structured data for breadcrumbs
 */
function addBreadcrumbsSchema() {
    const breadcrumbsSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://anandvip.github.io/rekha-2-canada/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Insurance Services",
                "item": "https://anandvip.github.io/rekha-2-canada/#services"
            }
        ]
    };
    
    const breadcrumbsScript = document.createElement('script');
    breadcrumbsScript.type = 'application/ld+json';
    breadcrumbsScript.text = JSON.stringify(breadcrumbsSchema);
    document.head.appendChild(breadcrumbsScript);
}

/**
 * Sets up smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Modal functionality
 */
const modal = document.getElementById('contactModal');

/**
 * Opens the contact modal
 */
function openContactModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Accessibility improvements
    modal.setAttribute('aria-hidden', 'false');
    
    // Set focus to the modal close button
    setTimeout(() => {
        document.querySelector('.modal-close').focus();
    }, 100);
}

/**
 * Closes the contact modal
 */
function closeContactModal() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Allow scrolling again
    
    // Accessibility improvements
    modal.setAttribute('aria-hidden', 'true');
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        closeContactModal();
    }
};

// Keyboard accessibility - close on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeContactModal();
    }
});

// Listen for messages from the iframe
window.addEventListener('message', function(event) {
    // Make sure the message is from our form page
    if (event.origin === 'https://anandvip.github.io') {
        const data = event.data;
        
        // If the message indicates form submission success
        if (data.type === 'formSubmitted') {
            // You can add additional actions here when the form is submitted
            console.log('Form submitted successfully');
        }
        
        // If the message indicates to close the modal
        if (data.type === 'closeModal') {
            closeContactModal();
        }
    }
});
