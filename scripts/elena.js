// Tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            const tabsContainer = button.closest('.tabs');
            const currentActive = tabsContainer.querySelector('.tab-btn.active');
            const currentPanel = tabsContainer.querySelector('.tab-panel.active');
            
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            if (currentPanel) {
                currentPanel.classList.remove('active');
            }
            
            // Add active class to clicked button and its panel
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const newPanel = document.getElementById(tabId);
            if (newPanel) {
                newPanel.classList.add('active');
            }
        });
    });

    // Accordion functionality
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const accordionItem = button.parentElement;
            accordionItem.classList.toggle('active');
        });
    });
}); 

// Range slider value update
const rangeSlider = document.querySelector('.range-slider');
const rangeValue = document.querySelector('.range-value');

if (rangeSlider && rangeValue) {
    rangeSlider.addEventListener('input', (e) => {
        rangeValue.textContent = e.target.value;
        const thumbPosition = (e.target.value - e.target.min) / (e.target.max - e.target.min);
        const rangeWidth = rangeSlider.offsetWidth;
        const thumbOffset = thumbPosition * (rangeWidth - 20); // 20 is thumb width
        rangeValue.style.right = `${rangeWidth - thumbOffset - 10}px`;
    });
}

// File upload name display
const fileInput = document.querySelector('.file-input');
const fileName = document.querySelector('.file-name');

if (fileInput && fileName) {
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fileName.textContent = e.target.files[0].name;
        } else {
            fileName.textContent = 'No file chosen';
        }
    });
} 

// Toast Notifications
const toastMessages = {
    success: {
        icon: 'fas fa-check-circle',
        message: 'Operation completed successfully!'
    },
    error: {
        icon: 'fas fa-times-circle',
        message: 'An error occurred. Please try again.'
    },
    warning: {
        icon: 'fas fa-exclamation-circle',
        message: 'Warning: Please check your input.'
    },
    info: {
        icon: 'fas fa-info-circle',
        message: 'Here is some useful information.'
    }
};

function showToast(type) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const { icon, message } = toastMessages[type];
    
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;

    // Add to container
    container.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('toast-leaving');
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);

    // Click to dismiss
    toast.addEventListener('click', () => {
        toast.classList.add('toast-leaving');
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    });
} 

// Copy to Clipboard functionality
document.querySelectorAll('[data-clipboard]').forEach(button => {
    button.addEventListener('click', async () => {
        // Get the text to copy
        const container = button.closest('.copy-wrapper, .code-block');
        let textToCopy;
        
        if (container.classList.contains('code-block')) {
            textToCopy = container.querySelector('code').textContent;
        } else {
            textToCopy = container.querySelector('.copy-input').value;
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Visual feedback
            button.classList.add('copied');
            
            // Show toast
            const toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.textContent = 'Copied to clipboard!';
            document.body.appendChild(toast);
            
            // Reset button and remove toast
            setTimeout(() => {
                button.classList.remove('copied');
                toast.remove();
            }, 2000);

        } catch (err) {
            console.error('Failed to copy text: ', err);
            
            // Error toast
            const toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.style.backgroundColor = '#DC2626';
            toast.textContent = 'Failed to copy text';
            document.body.appendChild(toast);
            
            setTimeout(() => toast.remove(), 2000);
        }
    });
}); 