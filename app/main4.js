const fs = require('fs');
/*
	Dialog
	https://www.electronjs.org/docs/api/dialog
*/
const { app, BrowserWindow, dialog } = require('electron')

let eWin = null;

app.on('ready', () => {

	eWin = new BrowserWindow({ show: false })

	eWin.loadFile(`${__dirname}/index.html`)

	// CALL the getFileFromUser
	getFileFromUser();

	eWin.once('ready-to-show', () => {
		eWin.show();
	})
})

// dialog is only available in main process
const getFileFromUser = () => {

	/*
		Show Open Dialog
		https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options
		returns array of filenames
	*/
	const loadedFiles = dialog.showOpenDialog({
		//Contains which features the dialog should use.
		properties: [ 'openFile' ],
		/*
			The filters specifies an array of
			 file types that can be displayed or 
			 selected when you want to limit 
			 the user to a specific type.
		*/
		filter: [
			{ name: 'Text Files': extension: ['txt', 'text'] },
			{ name: 'Markdown Files', extensions: ['md', 'mdown', 'markdown']}
		]
	})

	//load && parse the file
	if(!loadedFiles) return;
	const selectedFile = loadedFiles[0]
	const fileContent = fs.readFileSync(selectedFile).toString()
}