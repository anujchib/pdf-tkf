/**
 * Configuration file for the PDF Toolkit frontend
 * Contains API endpoints and environment-specific settings
 */

const config = {
    // Base URL for API requests - changes based on environment
    apiBaseUrl: (() => {
        // Check if running locally
        const isLocalhost = 
            window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname.includes('192.168.');

        // For local development
        if (isLocalhost) {
            return 'http://localhost:3001/api/v1';
        }
        
        // For production - Deploy your backend and replace this URL
        return 'https://pdf-tkb-production.up.railway.app/api/v1'; 
        
        // If your backend isn't deployed on Vercel, replace with your actual backend URL
        // For example: 'https://pdf-toolkit-api.herokuapp.com/api/v1'
        // or 'https://api.your-domain.com/api/v1'
    })(),
    
    // Individual API endpoints
    endpoints: {
        upload: '/user/upload',
        download: '/user/download',
        convert: '/user/convert'
    },
    
    // Feature flags
    features: {
        darkMode: true,
        analytics: !window.location.hostname.includes('localhost')
    },
    
    // App information
    appInfo: {
        name: 'PDF Toolkit',
        version: '1.0.0',
        supportEmail: 'support@pdftoolkit.example.com'
    }
};

console.log('API Base URL:', config.apiBaseUrl);

export default config;