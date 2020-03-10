const marked = require('marked');
/*
	an electron import
	https://www.electronjs.org/docs/api/remote#remote
	...provides a simple way to do inter-process 
	communication (IPC) between the renderer process
	 (web page) and the main process
*/
const { remote } = require('electron')

const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');
const showFileButton = document.querySelector('#show-file');
const openInDefaultButton = document.querySelector('#open-in-default');

const renderMarkdownToHtml = markdown => {
  htmlView.innerHTML = marked(markdown, { sanitize: true });
};

markdownView.addEventListener('keyup', event => {
  const currentContent = event.target.value;
  renderMarkdownToHtml(currentContent);
});

// handle the open-file button
openFileButton.addEventListener('click', () => {
	console.log('CLICKED the REVEEAL BTN!');
})