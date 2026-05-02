async function generatePath() {
    const key = document.getElementById('apiKey').value;
    const lang = document.getElementById('language').value;
    const subject = document.getElementById('subject').value;
    const topic = document.getElementById('topic').value;
    const output = document.getElementById('output');

    output.innerHTML = "Generating your personalized path...";

    const prompt = `Create a 5-step learning path for ${topic} in the field of ${subject}. 
                   Language: ${lang}. 
                   Include resources and a mini-quiz for each step. 
                   Format the output in clear Markdown.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text;
        
        // Simple Markdown-to-HTML (Using a library like 'marked' is better for production)
        output.innerHTML = content.replace(/\n/g, '<br>');
    } catch (error) {
        output.innerHTML = "Error: " + error.message;
    }
}
