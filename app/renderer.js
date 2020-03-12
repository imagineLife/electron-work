const marked = require('marked');
const path = require('path')
/*
	an electron import
	https://www.electronjs.org/docs/api/remote#remote
	...provides a simple way to do inter-process 
	communication (IPC) between the renderer process
	 (web page) and the main process
*/
const { remote, ipcRenderer } = require('electron')
const mainP = remote.require('./main7');
const curWindow = remote.getCurrentWindow()

/*
	File-name vars for app title
*/ 
let filePathStr = null;
let originalContent = ''
let isEdited = false;

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

const updateUserInterface = (isEdited) => {
	console.log('HERE TWO?!');
	let title = 'Fire Sale';
	if(filePathStr){
		let thisFileName = path.basename(filePathStr)
		title = `${thisFileName}${isEdited && "*"} ${title}`
	}
	console.log({isEdited});
	curWindow.setTitle(title)
}

markdownView.addEventListener('keyup', event => {
  const currentContent = event.target.value;

  //changed edited val
  isEdited = currentContent !== originalContent;

  renderMarkdownToHtml(currentContent);
  updateUserInterface(isEdited)
});

// handle the open-file button
openFileButton.addEventListener('click', () => {
	mainP.getFileFromUser()
})

// runs on file-opened

ipcRenderer.on('file-opened', (e, file, fileContent) => {
	console.log('A');
	
	// Update app title
	filePathStr = file;
	originalContent = fileContent;

	markdownView.value = fileContent;
	renderMarkdownToHtml(fileContent)
	console.log('HERE?!');
	updateUserInterface(isEdited)
})