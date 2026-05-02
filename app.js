// Load the key from storage on page load
window.onload = () => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) document.getElementById('apiKey').value = savedKey;
};

async function generatePath() {
    const key = document.getElementById('apiKey').value;
    const lang = document.getElementById('language').value;
    const subject = document.getElementById('subject').value;
    const topic = document.getElementById('topic').value;
    const output = document.getElementById('output');

    if (!key) {
        alert("Please enter an API Key first!");
        return;
    }

    // Save the key for next time so the user doesn't have to re-type it
    localStorage.setItem('gemini_api_key', key);

    output.innerHTML = "<div class='animate-pulse'>Generating your personalized path...</div>";

    const prompt = `Act as an expert tutor. Create a detailed learning path for ${topic} in ${subject}. 
                   Language: ${lang}. 
                   Structure: 1. Overview, 2. Prerequisites, 3. Step-by-step concepts, 4. Practice project. 
                   Format as clean Markdown.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);

        const content = data.candidates[0].content.parts[0].text;
        
        // Simple Markdown conversion for display
        output.innerHTML = content.replace(/\n/g, '<br>').replace(/###/g, '<h3 class="font-bold">');
    } catch (error) {
        output.innerHTML = `<div class="text-red-500 font-bold">Error: ${error.message}</div>`;
    }
}
