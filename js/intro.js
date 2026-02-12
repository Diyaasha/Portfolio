// Enter button click handler
const enterBtn = document.getElementById('enterBtn');
const introContainer = document.querySelector('.intro-container');

enterBtn.addEventListener('click', () => {
    // Add fade out animation
    introContainer.classList.add('fade-out');
    
    // Redirect to main portfolio after animation
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
});

// Optional: Auto-redirect after a certain time
// Uncomment the lines below if you want automatic redirect after 8 seconds
/*
setTimeout(() => {
    introContainer.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}, 8000);
*/

// Add keyboard support - press Enter or Space to continue
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enterBtn.click();
    }
});
