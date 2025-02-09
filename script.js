// Alternar tema claro/escuro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.innerHTML = body.classList.contains('dark-mode')
        ? '<i class="fas fa-sun"></i> Tema Claro'
        : '<i class="fas fa-moon"></i> Tema Escuro';
    saveThemePreference();
});

// Salvar preferência de tema no localStorage
function saveThemePreference() {
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Carregar preferência de tema ao iniciar
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Tema Claro';
    }
}

loadThemePreference();

// Inicializar CodeMirror para realce de sintaxe
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
    mode: 'htmlmixed',
    theme: 'dracula',
    lineNumbers: true,
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
    mode: 'css',
    theme: 'dracula',
    lineNumbers: true,
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true,
});

// Executar código
document.getElementById('run-btn').addEventListener('click', function () {
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();

    const outputFrame = document.getElementById('output-frame');
    const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;

    outputDocument.open();
    outputDocument.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}</script>
        </body>
        </html>
    `);
    outputDocument.close();
});

// Limpar códigos
document.getElementById('clear-btn').addEventListener('click', function () {
    htmlEditor.setValue('');
    cssEditor.setValue('');
    jsEditor.setValue('');
});
