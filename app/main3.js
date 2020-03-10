const { app, BrowserWindow } = require('electron')

/*
	store the window @ 'global' scope 
	to avoid js garbage-collection
*/
let eWin = null;
app.on('ready', () => {

	/*
		V1, shows window with a white loading 'flash'
	*/
	// BROWSER WINDOW 
	// https://www.electronjs.org/docs/api/browser-window#browserwindow
	// eWin = new BrowserWindow()

	// LOAD FILE
	// https://www.electronjs.org/docs/api/browser-window#winloadfilefilepath-options
	// eWin.loadFile(`${__dirname}/index.html`)

	/*
		V2
		doesn't show window till loaded
	*/
	eWin = new BrowserWindow({ show: false })
	eWin.loadFile(`${__dirname}/index.html`)

	/*
		NODE api doc on ONCE
		https://nodejs.org/api/events.html#events_emitter_once_eventname_listener
		...Adds a one-time listener 
			function for the event named eventName. 
			The next time eventName is triggered, 
			this listener is removed and then invoked.
	*/
	eWin.once('ready-to-show', () => {
		eWin.show()
	})

})
