const fs = require('fs');
const { 
	app, 
	BrowserWindow, 
	dialog, 
	Menu 
} = require('electron')

let eWin = null;

app.on('ready', () => {

	//connect menu to app using appMenu below
	Menu.setApplicationMenu(appMenu)
	eWin = new BrowserWindow({ show: false })
	eWin.loadFile(`${__dirname}/index.html`)
	eWin.once('ready-to-show', () => {
		eWin.show();
	})
})

const getFileFromUser = () => {
	const loadedFiles = dialog.showOpenDialog(eWin, {
		properties: [ 'openFile' ],
		filters: [
			{ 
				name: 'Markdown Files', 
				extensions: ['md', 'mdown', 'markdown']
			}
		],
		buttonLabel: 'Reveal', 
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

/*
	Customize toolbar menu
	NOTE mac-os makes first menu default to application name
	THIS ends up being os/platform-specific
*/
const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Open File',
				click(){
					exports.getFileFromUser()
				},
				//custom hot-key
				accelerator: 'CommandOrControl+O'
			},
			{
				label: 'Save File',
				click(){
					//emit event to server
					eWin.webContents.send('save-markdown')
				},
				//custom hot-key
				accelerator: 'CommandOrControl+S'
			},
			{
				label: 'Save HTML',
				click(){
					//emit event to server
					eWin.webContents.send('save-html')
				},
				//custom hot-key
				accelerator: 'CommandOrControl+Shift+S'
			},
			{
				label: 'Copy',
				role: 'copy'
			},
			{
				label: 'Paste',
				role: 'paste'
			}
		]
	}
]

//taking advantage of node process
// IS MAC
if(process.platform === 'darwin'){
	const applicationName = 'Fire Sale'
	//add to first menu item
	menuTemplate.unshift({
		label: applicationName,
		submenu: [
			{
				label: `About ${applicationName}`,
				role: 'about'
			},
			{
				label: `Quit ${applicationName}`,
				// click(){
				// 	//quits app
				// 	// app.quit()
				// }
				//uses the ROLE attr
				//  https://www.electronjs.org/docs/api/menu
				role: 'quit'
			}
		]
	})
}

const appMenu = Menu.buildFromTemplate(menuTemplate)

module.exports.saveHtml = content => {
	const thisFile = dialog.showSaveDialog(eWin,{
		title: 'Save HTML',
		defaultPath: app.getPath('desktop'),
		filters: [
			{
				name: 'HTML Files',
				extensions: ['html', 'htm']
			}
		]
	})

	if(!thisFile) return;

	fs.writeFileSync(thisFile, content)
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
		f = dialog.showSaveDialog(eWin,{
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
	
	//save
	fs.writeFileSync(f, content);

	//re-open file
	openFile(f)
}

module.exports.openFile = openFile;
module.exports.getFileFromUser = getFileFromUser;