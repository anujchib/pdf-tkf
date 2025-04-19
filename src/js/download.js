import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get the file parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const file = params.get("file");
    const downloadLink = document.getElementById("downloadLink");

    if (file) {
        // Set the download link to point to the backend
        downloadLink.href = `${config.apiBaseUrl}/user/download?file=${encodeURIComponent(file)}`;
    } else {
        alert("Download URL not found. Please try uploading again.");
        // Redirect to home page after a short delay
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    }

    // Confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);

    // Track analytics (if enabled)
    if (config.features.analytics) {
        // This would connect to your analytics service
        console.log("Download success tracked");
    }
});