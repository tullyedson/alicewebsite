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

    loadInclude('[data-include="header"]', '/header.html');
    loadInclude('[data-include="footer"]', '/footer.html');

    // Novel Reader Logic
    const textBody = document.getElementById('text-body');
    const chapterTitle = document.getElementById('chapter-title');
    const chapterImage = document.getElementById('chapter-image');
    const nextChapterLink = document.getElementById('next-chapter');
    const prevChapterLink = document.getElementById('prev-chapter');
    
    if (textBody) {
        const params = new URLSearchParams(window.location.search);
        const chapter = parseInt(params.get('ch')) || 1;
        
        if (chapterTitle) {
            chapterTitle.innerText = `Chapter ${chapter}`;
        }

        if (chapterImage) {
            chapterImage.src = `../images/novel/chapter_${chapter}.png`;
            chapterImage.style.display = 'block';
            chapterImage.onerror = () => { chapterImage.style.display = 'none'; };
        }

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

        if (nextChapterLink && chapter < 20) {
            nextChapterLink.href = `reader.html?ch=${chapter + 1}`;
            nextChapterLink.style.display = 'inline-block';
        }
        if (prevChapterLink && chapter > 1) {
            prevChapterLink.href = `reader.html?ch=${chapter - 1}`;
            prevChapterLink.style.display = 'inline-block';
        }
    }
});