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
		properties: [ 'openFile' ]
	})

	console.log('loadedFiles')
	console.log(loadedFiles)
	
}