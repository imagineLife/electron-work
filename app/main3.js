const { app, BrowserWindow } = require('electron')

/*
	store the window @ 'global' scope 
	to avoid js garbage-collection
*/
let eWin = null;
app.on('ready', () => {

	// BROWSER WINDOW 
	// https://www.electronjs.org/docs/api/browser-window#browserwindow
	eWin = new BrowserWindow()

	// LOAD FILE
	// https://www.electronjs.org/docs/api/browser-window#winloadfilefilepath-options
	eWin.loadFile(`${__dirname}/index.html`)
})
