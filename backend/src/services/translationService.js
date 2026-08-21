const fetch = require('node-fetch');

const translateToAmharic = async (text, retries = 2) => {
    if (!text || text === 'Information not provided' || text === 'N/A') return '';
    
    // Truncate text to avoid 413 Payload Too Large from Google Translate API
    const safeText = text.length > 800 ? text.substring(0, 800) + "..." : text;
    
    try {
        const response = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=am&dt=t", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ q: safeText }).toString()
        });
        
        if (!response.ok) {
            if (retries > 0) return await translateToAmharic(text, retries - 1);
            return text;
        }
        
        const data = await response.json();
        // Google Translate returns a nested array where data[0] contains the sentences
        if (data && data[0]) {
            return data[0].map(item => item[0]).join('');
        }
        return text;
    } catch (error) {
        if (retries > 0) return await translateToAmharic(text, retries - 1);
        console.error("Translation error:", error);
        return text;
    }
};

module.exports = { translateToAmharic };
