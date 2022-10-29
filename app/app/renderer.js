const marked = require('marked');
const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');

// const renderToMarkdown = (markdown) => { 
//     htmlView.innerHTML = marked.parse(markdown);
// }

// markdownView.addEventListener('keyup', e => {
//    const curentContent = e.target.value;
//    renderToMarkdown(curentContent);
// });