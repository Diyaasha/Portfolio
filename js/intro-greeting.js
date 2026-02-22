// Greetings in different languages
const greetings = [
    'Hello',      // English
    'Namaste',    // Hindi
    'Hola',       // Spanish
    'Bonjour',    // French
    'Ciao',       // Italian
    'Hallo',      // German
    'Olá',        // Portuguese
    'Vanakkam',   // Tamil
    'Salam',      // Arabic
    'Merhaba',    // Turkish
    'Konnichiwa', // Japanese
    'Annyeong',   // Korean
    'Nǐ hǎo',     // Chinese
    ''
];

let currentIndex = 0;
const greetingElement = document.querySelector('.greeting');

// Change greeting every 700ms for smooth transitions
function changeGreeting() {
    if (greetingElement) {
        greetingElement.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % greetings.length;
            greetingElement.textContent = greetings[currentIndex];
            greetingElement.style.opacity = '1';
        }, 200);
    }
}

// Start changing greetings after initial fade-in (1 second)
setTimeout(() => {
    setInterval(changeGreeting, 700);
}, 1000);
