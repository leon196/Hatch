import demo from './demo';


let started = false;

function start(event) {
	event.preventDefault();

	if (!started) {
		started = true;

		document.getElementById('overlay').remove();

		setTimeout(demo, 0);
	}
}

addEventListener('click', start);