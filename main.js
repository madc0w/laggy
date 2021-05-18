let imageContainer, optionsDiv, mask, image, intervalId, initMaskTop;

function load() {
	imageContainer = document.getElementById('image-container');
	image = document.getElementById('image');
	optionsDiv = document.getElementById('options');
	mask = document.getElementById('mask');

	showImage();
}

function showImage() {
	clearInterval(intervalId);
	const imageData = data[Math.floor(Math.random() * data.length)];
	image.src = `img/${imageData.filename}`;

	optionsDiv.innerHTML = '';
	const options = [];
	for (const option of imageData.options) {
		options.push({
			text: option,
			isCorrect: options.length == 0,
		});
	}
	shuffleArray(options);
	for (const option of options) {
		optionsDiv.innerHTML += `<div onClick="optionClicked(${option.isCorrect})">${option.text}</div>`;
	}

	if (!initMaskTop) {
		initMaskTop = parseInt(getComputedStyle(mask, null).getPropertyValue('top'));
	}
	let maskHeight = image.height;
	intervalId = setInterval(() => {
		mask.style = `top: ${initMaskTop + image.height - maskHeight}px; height: ${maskHeight}px;`;
		maskHeight--;
	}, 60);
}

function optionClicked(isCorrect) {
	showImage();
}


function shuffleArray(array) {
	let curId = array.length;
	// There remain elements to shuffle
	while (0 !== curId) {
		// Pick a remaining element
		const randId = Math.floor(Math.random() * curId);
		curId--;
		// Swap it with the current element.
		const tmp = array[curId];
		array[curId] = array[randId];
		array[randId] = tmp;
	}
	return array;
}
