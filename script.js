document.addEventListener('DOMContentLoaded', () => {
    const htmlEditor = document.getElementById('htmlEditor');
    const cssEditor = document.getElementById('cssEditor');
    const jsEditor = document.getElementById('jsEditor');
    const previewFrame = document.getElementById('previewFrame');
    const runBtn = document.getElementById('runBtn');
    const tabButtons = document.querySelectorAll('.tab-button');
    const editorPanes = document.querySelectorAll('.editor-pane');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const bodyElement = document.body;

    // Load default templates
    htmlEditor.value = `<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
    <!-- CSS will be injected here -->
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Edit HTML, CSS, and JS to see the preview update.</p>
    <!-- JavaScript will be injected here -->
</body>
</html>`;

    cssEditor.value = `body {\n    font-family: Arial, sans-serif;\n    margin: 20px;\n    background-color: #f0f0f0;\n}\n\nh1 {\n    color: #3498db;\n}`;

    jsEditor.value = `console.log('Hello from the preview!');\n\ndocument.querySelector('h1').addEventListener('click', () => {\n    alert('H1 clicked!');\n});`;

    // Tab switching logic
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            editorPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to the clicked button and corresponding pane
            button.classList.add('active');
            const editorType = button.getAttribute('data-editor');
            document.getElementById(`${editorType}Pane`).classList.add('active');
        });
    });

    // Fullscreen toggle logic
    fullscreenBtn.addEventListener('click', () => {
        bodyElement.classList.toggle('fullscreen-preview');
        
        // Update button text based on state
        if (bodyElement.classList.contains('fullscreen-preview')) {
            fullscreenBtn.textContent = 'Exit Full Screen';
        } else {
            fullscreenBtn.textContent = 'Full Screen';
        }
    });

    // Function to apply theme based on preference
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            bodyElement.classList.add('dark-theme');
            themeToggleBtn.textContent = 'Light Mode'; // Update button text
        } else {
            bodyElement.classList.remove('dark-theme');
            themeToggleBtn.textContent = 'Dark Mode'; // Update button text
        }
    };

    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
    applyTheme(savedTheme);

    // Theme toggle logic
    themeToggleBtn.addEventListener('click', () => {
        const isDark = bodyElement.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save preference
    });

    // Function to update preview
    function updatePreview() {
        const htmlContent = htmlEditor.value;
        const cssContent = cssEditor.value;
        const jsContent = jsEditor.value;

        const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
        
        // Construct the full HTML document for the iframe
        const fullHtml = `\n            <!DOCTYPE html>\n            <html>\n            <head>\n                <style>\n                    ${cssContent}\n                </style>\n            </head>\n            <body>\n                ${htmlContent.includes('<body>') ? htmlContent.substring(htmlContent.indexOf('<body>') + 6, htmlContent.lastIndexOf('</body>')) : htmlContent} \n                <script>\n                    ${jsContent}\n                <\/script>\n            </body>\n            </html>\n        `;

        previewDocument.open();
        previewDocument.write(fullHtml);
        previewDocument.close();
    }

    // Update preview when Run button is clicked
    runBtn.addEventListener('click', updatePreview);

    // Initial preview
    updatePreview();

    // Add keyboard shortcut (Ctrl+Enter) to run the code from any editor
    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
        editor.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                updatePreview();
            }
        });
    });
}); 