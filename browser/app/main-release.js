import demo from './demo';


let started = false;

function start(event) {
	event.preventDefault();

	if (!started) {
		started = true;

		document.getElementById('overlay').remove();
		document.body.style.cursor = 'none';

		setTimeout(demo, 0);
	}
}

addEventListener('click', start);