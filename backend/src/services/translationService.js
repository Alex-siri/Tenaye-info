const fetch = require('node-fetch');

const translateToAmharic = async (text) => {
    if (!text || text === 'Information not provided' || text === 'N/A') return '';
    try {
        const response = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=am&dt=t", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ q: text }).toString()
        });
        
        if (!response.ok) return text;
        
        const data = await response.json();
        // Google Translate returns a nested array where data[0] contains the sentences
        if (data && data[0]) {
            return data[0].map(item => item[0]).join('');
        }
        return text;
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
};

module.exports = { translateToAmharic };
