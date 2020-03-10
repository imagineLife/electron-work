const fs = require('fs');
const { app, BrowserWindow, dialog } = require('electron')

let eWin = null;

app.on('ready', () => {

	eWin = new BrowserWindow({ show: false })

	eWin.loadFile(`${__dirname}/index.html`)

	// CALL the getFileFromUser
	// getFileFromUser();

	eWin.once('ready-to-show', () => {
		eWin.show();
	})
})

const getFileFromUser = () => {
	const loadedFiles = dialog.showOpenDialog({
		//Contains which features the dialog should use.
		properties: [ 'openFile' ],
		//file-type limiter
		filters: [
			{ 
				name: 'Markdown Files', 
				extensions: ['md', 'mdown', 'markdown']
			}
		],
		//custom 'open' button txt
		buttonLabel: 'Reveal',
		//windows-only open-dialog title text
		title: 'Windows only title. meh.'
	})

	//load && parse the file
	if(!loadedFiles) return;
	const selectedFile = loadedFiles[0]
	const fileContent = fs.readFileSync(selectedFile).toString()
	console.log('fileContent')
	console.log(fileContent)
	
}