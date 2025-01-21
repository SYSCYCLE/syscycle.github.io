setTimeout(() => {
	const element = document.querySelector('#first-content');
	element.style.setProperty('--dynamic-content', '""');
}, 3000);

setTimeout(() => {
	const element = document.querySelector('#first-content');
	element.style.setProperty('--dynamic-content', '"Burada"');
}, 3200);

setTimeout(() => {
	const element = document.querySelector('#first-content');
	element.style.setProperty('--dynamic-content', '"Burada herşeyi"');
}, 3400);

setTimeout(() => {
	const element = document.querySelector('#first-content');
	element.style.setProperty('--dynamic-content', '"Burada herşeyi tek"');
}, 3600);

setTimeout(() => {
	const element = document.querySelector('#first-content');
	element.style.setProperty('--dynamic-content', '"Burada herşeyi tek tek"');
}, 3800);

setTimeout(() => {
	const element = document.querySelector('#first-content');
	element.style.setProperty('--dynamic-content', '"Burada herşeyi tek tek Öğreneceksiniz..."');
}, 4000);

setTimeout(() => {
	const goElement = document.querySelector('#go');
	goElement.style.display = 'block';
	goElement.style.setProperty('--dynamic-go-content', '"Hazırsanız başlayalım!"');
}, 6000);
setTimeout(() => {
	const element = document.querySelector('#first-content');
	const goElement = document.querySelector('#go');
	element.style.opacity = '0';
	element.style.transition = '450ms all ease';
	goElement.style.opacity = '0';
	goElement.style.transition = '450ms all ease';
}, 9500);
setTimeout(() => {
	const element = document.querySelector('#first-content');
	const goElement = document.querySelector('#go');
	element.remove();
	goElement.remove();
}, 10000);

setTimeout(() => {
	var main = document.querySelector('main');
	main.style.height = '100vh';
	main.style.position = 'absolute';
	main.style.top = '0';
	main.style.left = '0';
	main.style.transition = '2s all ease';
}, 11000);

setTimeout(() => {
	let pic1 = document.createElement('img');
	pic1.src = 'https://syscycle.github.io/brawl-stars-team-code-finder/pic1.png';
	pic1.setAttribute('width', '100%');
	pic1.setAttribute('id', 'pic1');
	pic1.style.position = 'absolute';
	pic1.style.top = '50%';
	pic1.style.transform = 'translateY(-50%)';
	var main = document.querySelector('main').appendChild(pic1);
	document.body.style.backgroundColor = '#202030';
	document.body.style.transition = '300ms all ease';

}, 13000);

setTimeout(() => {
	let pic1 = document.getElementById('pic1');
	pic1.style.filter = 'brightness(34%)';
	pic1.style.transition = '400ms all ease';
}, 15000);

setTimeout(() => {
	let createDivPic1 = document.createElement('div');
	createDivPic1.setAttribute('id', 'pic1-content');
	createDivPic1.style.position = 'absolute';
	createDivPic1.style.zIndex = '2';
	createDivPic1.style.top = '50%';
	createDivPic1.style.left = '50%';
	createDivPic1.style.transform = 'translate(-50%, -50%)';
	createDivPic1.style.width = '100%';
	createDivPic1.style.fontSize = '1.5rem';
	createDivPic1.style.textAlign = 'center';
	createDivPic1.style.color = '#fff';
	var main = document.querySelector('main').appendChild(createDivPic1);
}, 16000);

setTimeout(() => {
	let pic1 = document.querySelector('#pic1');
	let createDivPic1 = document.querySelector('#pic1-content');
	pic1.style.opacity = '0';
	pic1.style.transition = '300ms all ease';
	createDivPic1.style.opacity = '0';
	createDivPic1.style.transition = '300ms all ease';
}, 19000);

setTimeout(() => {
	let pic1 = document.querySelector('#pic1');
	let createDivPic1 = document.querySelector('#pic1-content');
	pic1.remove();
	createDivPic1.remove();
}, 19500);

setTimeout(() => {
	let pic2 = document.createElement('img');
	pic2.src = 'https://syscycle.github.io/brawl-stars-team-code-finder/pic2.png';
	pic2.setAttribute('width', '100%');
	pic2.setAttribute('id', 'pic2');
	pic2.style.position = 'absolute';
	pic2.style.top = '50%';
	pic2.style.transform = 'translateY(-50%)';
	var main = document.querySelector('main').appendChild(pic2);
}, 21000);

setTimeout(() => {
	let pic2 = document.getElementById('pic2');
	pic2.style.filter = 'brightness(34%)';
	pic2.style.transition = '400ms all ease';
}, 23000);

setTimeout(() => {
	let createDivPic2 = document.createElement('div');
	createDivPic2.setAttribute('id', 'pic2-content');
	createDivPic2.style.position = 'absolute';
	createDivPic2.style.zIndex = '2';
	createDivPic2.style.top = '50%';
	createDivPic2.style.left = '50%';
	createDivPic2.style.transform = 'translate(-50%, -50%)';
	createDivPic2.style.width = '100%';
	createDivPic2.style.fontSize = '1.5rem';
	createDivPic2.style.textAlign = 'center';
	createDivPic2.style.color = '#fff';
	var main = document.querySelector('main').appendChild(createDivPic2);
}, 24000);

setTimeout(() => {
	let pic2 = document.querySelector('#pic2');
	let createDivPic2 = document.querySelector('#pic2-content');
	pic2.style.opacity = '0';
	pic2.style.transition = '300ms all ease';
	createDivPic2.style.opacity = '0';
	createDivPic2.style.transition = '300ms all ease';
}, 27000);

setTimeout(() => {
	let pic2 = document.querySelector('#pic2');
	let createDivPic2 = document.querySelector('#pic2-content');
	pic2.remove();
	createDivPic2.remove();
}, 27500);

setTimeout(() => {
	let pic3 = document.createElement('img');
	pic3.src = 'https://syscycle.github.io/brawl-stars-team-code-finder/pic3.jpg';
	pic3.setAttribute('width', '100%');
	pic3.setAttribute('id', 'pic3');
	pic3.style.position = 'absolute';
	pic3.style.top = '50%';
	pic3.style.transform = 'translateY(-50%)';
	var main = document.querySelector('main').appendChild(pic3);
}, 29000);

setTimeout(() => {
	let pic3 = document.getElementById('pic3');
	pic3.style.filter = 'brightness(34%)';
	pic3.style.transition = '400ms all ease';
}, 31000);

setTimeout(() => {
	let createDivPic3 = document.createElement('div');
	createDivPic3.setAttribute('id', 'pic3-content');
	createDivPic3.style.position = 'absolute';
	createDivPic3.style.zIndex = '2';
	createDivPic3.style.top = '50%';
	createDivPic3.style.left = '50%';
	createDivPic3.style.transform = 'translate(-50%, -50%)';
	createDivPic3.style.width = '100%';
	createDivPic3.style.fontSize = '1.5rem';
	createDivPic3.style.textAlign = 'center';
	createDivPic3.style.color = '#fff';
	var main = document.querySelector('main').appendChild(createDivPic3);
}, 32000);

setTimeout(() => {
	let pic3 = document.querySelector('#pic3');
	let createDivPic3 = document.querySelector('#pic3-content');
	pic3.style.opacity = '0';
	pic3.style.transition = '300ms all ease';
	createDivPic3.style.opacity = '0';
	createDivPic3.style.transition = '300ms all ease';
}, 35000);

setTimeout(() => {
	let pic3 = document.querySelector('#pic3');
	let createDivPic3 = document.querySelector('#pic3-content');
	pic3.remove();
	createDivPic3.remove();
}, 35500);

setTimeout(() => {
	let pic4 = document.createElement('img');
	pic4.src = 'https://syscycle.github.io/brawl-stars-team-code-finder/pic4.jpg';
	pic4.setAttribute('width', '100%');
	pic4.setAttribute('id', 'pic4');
	pic4.style.position = 'absolute';
	pic4.style.top = '50%';
	pic4.style.transform = 'translateY(-50%)';
	var main = document.querySelector('main').appendChild(pic4);
}, 37000);

setTimeout(() => {
	let pic4 = document.getElementById('pic4');
	pic4.style.filter = 'brightness(34%)';
	pic4.style.transition = '400ms all ease';
}, 39000);

setTimeout(() => {
	let createDivPic4 = document.createElement('div');
	createDivPic4.setAttribute('id', 'pic4-content');
	createDivPic4.style.position = 'absolute';
	createDivPic4.style.zIndex = '2';
	createDivPic4.style.top = '50%';
	createDivPic4.style.left = '50%';
	createDivPic4.style.transform = 'translate(-50%, -50%)';
	createDivPic4.style.width = '100%';
	createDivPic4.style.fontSize = '1.5rem';
	createDivPic4.style.textAlign = 'center';
	createDivPic4.style.color = '#fff';
	var main = document.querySelector('main').appendChild(createDivPic4);
}, 40000);

setTimeout(() => {
	let pic4 = document.querySelector('#pic4');
	let createDivPic4 = document.querySelector('#pic4-content');
	pic4.style.opacity = '0';
	pic4.style.transition = '300ms all ease';
	createDivPic4.style.opacity = '0';
	createDivPic4.style.transition = '300ms all ease';
}, 43000);

setTimeout(() => {
	let pic4 = document.querySelector('#pic4');
	let createDivPic4 = document.querySelector('#pic4-content');
	pic4.remove();
	createDivPic4.remove();
}, 43500);

setTimeout(() => {
	let pic5 = document.createElement('img');
	pic5.src = 'https://syscycle.github.io/brawl-stars-team-code-finder/pic5.jpg';
	pic5.setAttribute('width', '100%');
	pic5.setAttribute('id', 'pic5');
	pic5.style.position = 'absolute';
	pic5.style.top = '50%';
	pic5.style.transform = 'translateY(-50%)';
	var main = document.querySelector('main').appendChild(pic5);
}, 45000);

setTimeout(() => {
	let pic5 = document.getElementById('pic5');
	pic5.style.filter = 'brightness(34%)';
	pic5.style.transition = '400ms all ease';
}, 47000);

setTimeout(() => {
	let createDivPic5 = document.createElement('div');
	createDivPic5.setAttribute('id', 'pic5-content');
	createDivPic5.style.position = 'absolute';
	createDivPic5.style.zIndex = '2';
	createDivPic5.style.top = '50%';
	createDivPic5.style.left = '50%';
	createDivPic5.style.transform = 'translate(-50%, -50%)';
	createDivPic5.style.width = '100%';
	createDivPic5.style.fontSize = '1.5rem';
	createDivPic5.style.textAlign = 'center';
	createDivPic5.style.color = '#fff';
	var main = document.querySelector('main').appendChild(createDivPic5);
}, 48000);

setTimeout(() => {
	let pic5 = document.querySelector('#pic5');
	let createDivPic5 = document.querySelector('#pic5-content');
	pic5.style.opacity = '0';
	pic5.style.transition = '300ms all ease';
	createDivPic5.style.opacity = '0';
	createDivPic5.style.transition = '300ms all ease';
}, 58000);

setTimeout(() => {
	let pic5 = document.querySelector('#pic5');
	let createDivPic5 = document.querySelector('#pic5-content');
	pic5.remove();
	createDivPic5.remove();
}, 58500);

setTimeout(() => {
	let imageSysCycle = document.createElement('div');
	imageSysCycle.setAttribute('class', 'syscycle');
	imageSysCycle.style.setProperty('--dynamic-image-content', 'url("https://syscycle.github.io/brawl-stars-team-code-finder/syscycle.svg")');
	var main = document.querySelector('main').appendChild(imageSysCycle);
}, 60000);

setTimeout(() => {
	let imageSysCycle = document.querySelector('.syscycle');
	imageSysCycle.style.setProperty('--dynamic-opacity', '1');
	imageSysCycle.style.setProperty('--dynamic-transition', '1.5s all ease');
}, 60500);

setTimeout(() => {
	let imageSysCycle = document.querySelector('.syscycle');
	let happyLottie = document.querySelector('#player');
	imageSysCycle.style.setProperty('--dynamic-transform', 'scaleX(1) scaleY(0)');
	imageSysCycle.style.setProperty('--dynamic-transition', '680ms all ease');
	happyLottie.style.display = 'block';
}, 63500);

setTimeout(() => {
	let happyLottie = document.querySelector('#player');
	let main = document.querySelector('main');
	let themeColorPage = document.querySelector('[content="#202030"]');
	happyLottie.style.opacity = '1';
	happyLottie.style.transition = '400ms all ease';
	document.body.style.backgroundColor = '#F5A623';
	document.body.style.transition = '400ms all ease';
	main.style.backgroundColor = '#F5A623';
	main.style.transition = '400ms all ease';
	themeColorPage.setAttribute('content', '#F5A623');
}, 64500);

setTimeout(() => {
	let happyLottie = document.querySelector('#player');
	happyLottie.style.transform = 'scale(3400)';
	happyLottie.style.transition = '12.5s all linear';
}, 69500);

setTimeout(() => {
	window.location.replace('https://syscycle.github.io/brawl-stars-team-code-finder/');
}, 70000);