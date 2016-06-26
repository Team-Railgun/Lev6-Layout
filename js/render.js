Math.randomRange = function(max, min) {
	min = min || 0;

	return Math.round(Math.random() * (max - min)) + min;
};

var parent;
var camera = new THREE.PerspectiveCamera(40, 1.5, 1, 10000);
camera.position.y = 0;
camera.position.z = 3000;
//name$append : 템플릿 'name'을 사용하며, 이름 뒤에 'append'를 붙임
//name#replace: 템플릿 'name'을 사용하며, 이름이 'replace'로 출력됨

var cards = {
	1: {
		1: { // 1-1
			1: 'korean$b',
			2: 'career',
			3: 'physics',
			4: {
				extends: 'english',
				name: '영어',
				desc: '영어실 수업<br>준비물: 단어노트'
			},
			5: 'mathematics_i',
			6: 'korean$a',
			7: 'club#학급',
			8: 'club#학급'
		},
		2: { // 1-2
			1: 'korean$b',
			2: 'career',
			3: 'physics',
			4: {
				extends: 'english',
				name: '영어',
				desc: '영어실 수업<br>준비물: 단어노트'
			},
			5: 'mathematics_i',
			6: 'korean$a',
			7: 'club#학급',
			8: 'club#학급'
		},
		3: { // 1-1
			1: 'korean$b',
			2: 'career',
			3: 'physics',
			4: {
				extends: 'english',
				name: '영어',
				desc: '영어실 수업<br>준비물: 단어노트'
			},
			5: 'mathematics_i',
			6: 'korean$a',
			7: 'club#학급',
			8: 'club#학급'
		}
	},
	2: {
		1: { // 2-1
			1: 'korean$b',
			2: 'career',
			3: 'physics',
			4: 'english',
			5: 'mathematics_i',
			6: 'korean$a',
			7: 'club#학급',
			8: 'club#학급'
		}
	},
	3: {
		1: { // 3-1
			1: 'korean$b',
			2: 'career',
			3: 'physics',
			4: 'english',
			5: 'mathematics_i',
			6: 'korean$a',
			7: 'club#학급',
			8: 'club#학급'
		}
	}
};

var scene = {};

var renderer = {};

_.forEach(cards, function(v, grade) {
	renderer[grade] = new THREE.CSS3DRenderer();
	scene[grade] = new THREE.Scene();
});

var cardObjects = {};
var moveTarget = {};
var animateDuration = 2000;

var width = undefined;
var height = undefined;

var cardWidth = 350; // default : 300
var cardHeight = 650; // default : 600
var cardsPerRow = undefined;
var cardZ = 1000;

function animate() {
	requestAnimationFrame(animate);
	TWEEN.update();
}

function registerAnimation(object, target) {
	new TWEEN.Tween(object.position)
		.to(target.position, animateDuration)
		.easing(TWEEN.Easing.Quintic.In)
		.start();

	new TWEEN.Tween(object.rotation)
		.to(target.rotation, animateDuration)
		.easing(TWEEN.Easing.Quintic.In)
		.start();
}

function renderAnimation(renderer, scene) {
	new TWEEN.Tween(this)
		.to({}, animateDuration)
		.onUpdate(function() {
			renderer.render(scene, camera);
		})
		.start();
}

function startAnimation(grade, kClass) {
	if (kClass !== undefined) {
		_.forEach(cardObjects[grade][kClass], function(object, period) {
			if (period === 'classCard') return;
			var target = moveTarget[grade][kClass][period];

			registerAnimation(object, target);
		});
	} else {
		_.forEach(cardObjects[grade], function(object, kClass) {
			var target = moveTarget[grade][kClass].classCard;
			var object = object.classCard;

			registerAnimation(object, target);
		});
	}

	renderAnimation(renderer[grade], scene[grade]);
}

function randomize(object) {
	object.position.x = Math.randomRange(-300, 300);
	object.position.y = Math.randomRange(300, -300);
	object.position.z = Math.randomRange(-300, 300);

	object.rotateX(Math.randomRange(0, 360));
	object.rotateY(Math.randomRange(0, 360));
	object.rotateZ(Math.randomRange(0, 360));
}

function addCards() {
	_.forEach(cards, function(v1, grade) {
		cardObjects[grade] = {};
		_.forEach(cards[grade], function(v2, kClass) {
			var elem = $(document.createElement('div'))
				.addClass('gg card class')
				.append(
					$(document.createElement('a'))
					.append(
						$(document.createElement('h1'))
						.addClass('class')
						.html(grade + ' - ' + kClass)
					)
					.on('click', function() {
						updateClass(grade, kClass);
					})
				);

			var object = new THREE.CSS3DObject(elem.get(0));
			randomize(object);

			object.cardType = 'class';
			object.cardData = {
				grade: grade,
				'class': kClass
			};

			cardObjects[grade][kClass] = {};
			cardObjects[grade][kClass].classCard = object;
			scene[grade].add(object);

			var back = $(document.createElement('div'))
				.addClass('gg card class')
				.append(
					$(document.createElement('a'))
					.append(
						$(document.createElement('h1'))
						.append(
							$(document.createElement('i'))
							.addClass('mdi mdi-chevron-left')
						)
						.addClass('class')
						.html('BACK')
					)
				).css({
					opacity: 0,
					display: 'none'
				})
				.on('click', function() {
					backToGrade(grade);
				});
			var backObject = new THREE.CSS3DObject(back.get(0));
			randomize(backObject);

			backObject.cardType = 'period';
			backObject.cardData = {
				grade: grade,
				'class': kClass,
				period: 'backCard'
			};

			cardObjects[grade][kClass] = {};
			cardObjects[grade][kClass].classCard = object;
			cardObjects[grade][kClass].backCard = backObject;
			scene[grade].add(object);
			scene[grade].add(backObject);

			_.forEach(cards[grade][kClass], function(v, period) {
				var cardData;
				if(typeof v === 'string'){
					var match = v.match(/^([^\s$#]+)(?:(\$|#)([^]+))?$/);
					if (match) {
						v = match[1];
					}

					var text = assigned[v].text;
					if (match && match[2] && match[3]) {
						text = (match[2] === '$') ? text + match[3] : match[3];
					}

					cardData = {
						text: text,
						icon: assigned[v].icon,
						desc: '',
						extends: v
					};
				}else{
					cardData = {};
					cardData.extends = '';

					if(v.extends){
						cardData = JSON.parse(JSON.stringify(assigned[v.extends])); //Clones assigned
						cardData.extends = v.extends;
					}
					cardData.desc = '';

					if(v.text) cardData.text = v.text;
					if(v.icon) cardData.icon = v.icon;
					if(v.desc) cardData.desc = v.desc;
				}

				var elem = $(document.createElement('div'))
					.addClass('gg card')
					.append($(document.createElement('h2'))
						.append($(document.createElement('i'))
							.addClass(cardData.icon))
					)
					.append(
						$(document.createElement('h3'))
						.text(period + '교시 ' + cardData.text)
					)
					.append(
						$(document.createElement('span'))
						.html(cardData.desc)
					)
					.css({
						opacity: 0,
						display: 'none'
					});

				var object = new THREE.CSS3DObject(elem.get(0));
				object.cardType = 'period';
				object.cardData = {
					grade: grade,
					'class': kClass,
					period: period
				};

				cardObjects[grade][kClass][period] = object;
				scene[grade].add(object);
			});
		});
	});
}

var filterSameClass = function(grade, kClass) {
	return (function(v) {
		return v.cardType === 'period' && v.cardData.grade === grade && v.cardData['class'] === kClass;
	});
};

var filterNotSameClass = function(grade, kClass) {
	var _filter = filterSameClass(grade, kClass);
	return (function(v) {
		return !(_filter(v));
	});
};

var filterGrade = function(grade){
	return (function(v){
		return v.cardType === 'class' && v.cardData.grade === grade;
	});
};

var filterNotGrade = function(grade){
	var _filter = filterGrade(grade);
	return (function(v){
		return !(_filter(v));
	});
};

function updateClass(grade, kClass) {
	scene[grade].children
		.filter(filterSameClass(grade, kClass))
		.forEach(revealAndRandomizeObject);

	scene[grade].children
		.filter(filterNotSameClass(grade, kClass))
		.forEach(hideObject);

	writePeriodCardMoveTarget(grade, kClass);

	TWEEN.removeAll();
	startAnimation(grade, kClass);
}

function backToGrade(grade){
	scene[grade].children
		.filter(filterGrade(grade))
		.forEach(revealAndRandomizeObject);

	scene[grade].children
		.filter(filterNotGrade(grade))
		.forEach(hideObject);

	TWEEN.removeAll();
	startAnimation(grade);
}

function revealAndRandomizeObject(v){
	$(v.element).css({
		animation: 'fade-in 0.5s linear 1 forwards',
		display: 'initial'
	});
	randomize(v);
}

function hideObject(v){
	$(v.element).css({
		animation: 'fade-out 0.5s linear 1 forwards'
	}).on('animationend', function(e){
		$(this).css({
			display: 'none'
		}).off('animationend');
	});
}

function getPosition(index, cardsRow) {
	var cardX = (index - 1) % Math.floor(cardsPerRow);
	var cardY = Math.floor((index - 1) / Math.floor(cardsPerRow));
	var parentWidth = parseInt(window.getComputedStyle(parent)
		.width.replace(/[^0-9\.]/g, ''));

	return {
		position: {
			x: ((cardX) * cardWidth) - ((cardsPerRow + 1) * cardWidth / 2) - (parentWidth - 640) / 4,
			y: (((cardsRow - 1) / 2) - cardY) * (cardHeight / 2),
			z: cardZ
		},

		rotation: {
			x: 0,
			y: 0,
			z: 0
		}
	};
}

function writeMoveTarget() {
	var cardsRow = Math.ceil(Object.keys(cards)
		.length / cardsPerRow);
	_.forEach(cards, function(v1, grade) {
		moveTarget[grade] = {};
		_.forEach(cards[grade], function(v2, kClass) {
			moveTarget[grade][kClass] = {};
			moveTarget[grade][kClass].classCard = getPosition(kClass, cardsRow);
		});
	});
}

function writePeriodCardMoveTarget(grade, kClass) {
	var cardCount = Object.keys(cards[grade][kClass])
		.length;
	var cardsRow = Math.ceil((cardCount + 1) / cardsPerRow);
	_.forEach(cards[grade][kClass], function(v, period) {
		moveTarget[grade][kClass][period] = getPosition(period, cardsRow);
	});

	moveTarget[grade][kClass].backCard = getPosition(cardCount + 1, cardsRow);
}

function update() {
	width = parseInt(window.getComputedStyle(parent)
		.width.replace(/[^0-9\.]/g, ''));
	height = 600;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	_.forEach(cards, function(v1, grade) {
		renderer[grade].setSize(width, height);
	});

	cardsPerRow = width / (cardWidth / 2.24);
	if (cardsPerRow < 1) cardsPerRow = 1;

	writeMoveTarget();
}

function resize() {
	update();
	startAnimationAll();
}

animate();

$(document)
	.ready(function() {
		parent = $('#top')
			.get(0);
		update();
		addCards();

		_.forEach(cards, function(v, grade) {
			var renderView = $(renderer[grade].domElement);
			$('#timetable-' + grade + 'grade')
				.append(renderView);
		});
		startAnimationAll();
	});

function startAnimationAll() {
	TWEEN.removeAll();
	_.forEach(cards, function(v, grade) {
		startAnimation(grade);
	});
}

$(window)
	.resize(resize);
