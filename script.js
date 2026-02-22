document.addEventListener('DOMContentLoaded', () => {
    // Load header and footer without jQuery
    const loadInclude = (selector, path) => {
        const element = document.querySelector(selector);
        if (element) {
            fetch(path)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${path}`);
                    return response.text();
                })
                .then(data => {
                    element.innerHTML = data;
                })
                .catch(err => console.error('Error loading include:', err));
        }
    };

    // Use absolute paths from root for includes
    loadInclude('[data-include="header"]', '/header.html');
    loadInclude('[data-include="footer"]', '/footer.html');

    // Novel Reader Logic
    const textBody = document.getElementById('text-body');
    const chapterTitle = document.getElementById('chapter-title');
    
    if (textBody) {
        const params = new URLSearchParams(window.location.search);
        const chapter = params.get('ch') || '1';
        
        // Set title immediately so it does not stay on "Loading..."
        if (chapterTitle) {
            chapterTitle.innerText = `Chapter ${chapter}`;
        }

        // Fetch chapter text relative to the reader page
        fetch(`chapters/chapter_${chapter}.txt`)
            .then(response => {
                if (!response.ok) throw new Error(`Chapter ${chapter} not found`);
                return response.text();
            })
            .then(text => {
                textBody.innerText = text;
            })
            .catch(err => {
                textBody.innerText = `Error: Could not load Chapter ${chapter}. Please verify the file exists in the chapters folder.`;
                console.error(err);
            });
    }
});