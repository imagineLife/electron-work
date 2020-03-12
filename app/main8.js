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
	
	openFile(selectedFile)
}

const openFile = (f) => {
	const fileContent = fs.readFileSync(f).toString()
	
	/*
		add-recent-document
		https://www.electronjs.org/docs/api/app#appaddrecentdocumentpath-macos-windows
		... adds the path to the recent documents list
	*/ 
	app.addRecentDocument(f)
	/*
		webContents
		https://www.electronjs.org/docs/api/web-contents#webcontents
		...responsible for rendering and controlling a web page and is a property of the BrowserWindow object
	*/
	eWin.webContents.send('file-opened', f, fileContent)
}

module.exports.saveMarkdown = (f, content) => {

	//if no file
	//give user option to pick-a-filename to save to
	if(!f){

		/*
			Show-save-dialog
			https://www.electronjs.org/docs/api/dialog#dialogshowsavedialogbrowserwindow-options
			... RETURNS a promise
			... RESOLVES with an object containing:
				- canceled
				- filePath (opt)
				- bookmark (opt)
		*/ 
		f = dialog.showSaveDialog({
			title: 'Save Markdown',

			/*
				get-path
				https://www.electronjs.org/docs/api/app#appgetpathname
				... returns string, path to a directory or file
				 associated with param 
			*/ 
			defaultPath: app.getPath('desktop'),
			/*
				filters
				https://www.electronjs.org/docs/api/dialog#dialogshowsavedialogbrowserwindow-options
				...docs not helpful?!
			*/
			filters: [
				{
					name: 'Markdown Files',
					extensions: [ 'md', 'markdown', 'mdown' ]
				}
			]
		})
	}

	if(!f) return;
	let res = fs.writeFileSync(f, content);
}

module.exports.getFileFromUser = getFileFromUser;