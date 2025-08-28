// Core utilities - Essential functions that load immediately
// This file contains only critical functionality

// Theme management - loads immediately for proper display
document.addEventListener('DOMContentLoaded', function() {
    const toggleInput = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Function to apply dark mode
    function applyDarkMode() {
        body.classList.add('dark-mode');
        body.classList.remove('bg-gray-50');
        body.classList.add('bg-gray-900');
        
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('bg-white', 'bg-gray-50');
        });
        
        if (toggleInput) toggleInput.checked = true;
    }
    
    // Function to apply light mode
    function applyLightMode() {
        body.classList.remove('dark-mode');
        body.classList.remove('bg-gray-900');
        body.classList.add('bg-gray-50');
        
        if (toggleInput) toggleInput.checked = false;
    }
    
    // Load saved theme immediately
    if (localStorage.getItem('theme') === 'dark') {
        applyDarkMode();
    }
    
    // Theme toggle event listener
    if (toggleInput) {
        toggleInput.addEventListener('change', function() {
            if (this.checked) {
                applyDarkMode();
                localStorage.setItem('theme', 'dark');
            } else {
                applyLightMode();
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

// Essential utilities available immediately
window.SkillMatchCore = {
    // Quick navigation
    navigate: function(url) {
        window.location.href = url;
    },
    
    // Show loading state
    showLoading: function(element) {
        if (element) {
            element.innerHTML = '<span class="loading"></span> Loading...';
        }
    },
    
    // Basic form validation
    validateForm: function(form) {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('border-red-500');
                isValid = false;
            } else {
                input.classList.remove('border-red-500');
            }
        });
        
        return isValid;
    }
};

// Quick button handlers for immediate interactivity
document.addEventListener('click', function(e) {
    // Handle primary CTA buttons
    if (e.target.matches('.btn-primary[href]') || e.target.closest('.btn-primary[href]')) {
        const link = e.target.matches('.btn-primary[href]') ? e.target : e.target.closest('.btn-primary[href]');
        SkillMatchCore.showLoading(link);
    }
});
