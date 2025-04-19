// Import the configuration
import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById("fileInput");
    const urlParams = new URLSearchParams(window.location.search);
    const selectedConversion = urlParams.get('conversion');
    
    // Debug log
    console.log("URL parameters:", window.location.search);
    console.log("Selected conversion type:", selectedConversion);
    
    // Optional: Display conversion type on page
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && selectedConversion) {
        const conversionInfo = document.createElement('p');
        conversionInfo.style.marginTop = '20px';
        conversionInfo.style.fontWeight = 'bold';
        conversionInfo.innerHTML = `Selected conversion: <span style="color: #ffffff; background: rgba(0,0,0,0.2); padding: 3px 8px; border-radius: 4px;">${selectedConversion}</span>`;
        heroContent.appendChild(conversionInfo);
    }

    fileInput.addEventListener("change", async () => {
        const file = fileInput.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("uploaded-file", file);
        formData.append("conversion", selectedConversion);
        
        // Debug log
        console.log("File being uploaded:", file.name);
        console.log("Conversion type being sent:", selectedConversion);
        console.log("API URL:", `${config.apiBaseUrl}/user/upload`);

        // Show loading indicator
        const uploadButton = document.querySelector('.upload-btn');
        const originalButtonText = uploadButton.innerHTML;
        uploadButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        uploadButton.style.pointerEvents = 'none';

        try {
            const response = await fetch(`${config.apiBaseUrl}/user/upload`, {
                method: "POST",
                body: formData,
            });

            console.log("Response status:", response.status);
            
            if (response.ok) {
                const responseData = await response.json();
                console.log("Success response:", responseData);
                window.location.href = `/download.html?file=${encodeURIComponent(responseData.outputPath)}`;
            } else {
                let errorMessage = "Unknown error";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || "Unknown error";
                    console.error("Error response:", errorData);
                } catch (e) {
                    console.error("Could not parse error response");
                }
                
                alert(`Upload failed: ${errorMessage}`);
                
                // Reset button
                uploadButton.innerHTML = originalButtonText;
                uploadButton.style.pointerEvents = 'auto';
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert(`Error uploading file: ${err.message}`);
            
            // Reset button
            uploadButton.innerHTML = originalButtonText;
            uploadButton.style.pointerEvents = 'auto';
        }
    });
});