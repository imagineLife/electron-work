/*
	Electron API docs
	https://www.electronjs.org/docs/api
*/

/*
	import electron
	...could use 
	const electron = require('electron')
*/

/*
	APP docs
	https://www.electronjs.org/docs/api/app
	contains methods && events
*/
const { app } = require('electron')

/*
	life-cycle events
	...node event-emitting
*/

app.on('ready', () => {
	console.log('App is ready!');
})

console.log('starting up...');

/*
	consoles...
> electron .

starting up...
App is ready!
*/