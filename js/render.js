Math.randomRange = function(max, min){
  min = min || 0;

  return Math.round(Math.random() * (max - min)) + min;
};

var parent;
var camera = new THREE.PerspectiveCamera(40, 1.5, 1, 10000);
camera.position.y = 0;
camera.position.z = 3000;

var scene = {
	1: new THREE.Scene(),
	2: new THREE.Scene()
};

var renderer = {
	1: new THREE.CSS3DRenderer(),
	2: new THREE.CSS3DRenderer()
};

//name$append : 템플릿 'name'을 사용하며, 이름 뒤에 'append'를 붙임
//name#replace: 템플릿 'name'을 사용하며, 이름이 'replace'로 출력됨

var cards = {
	1: {
		1: {
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
  2: {
	  1: { //2학년 1반
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
  	  1: {
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

var cardObjects = {
	1: {},
	2: {},
	3: {}
};
var moveTarget = {};
var animateDuration = 2000;

var width = undefined;
var height = undefined;

var cardWidth = 350; // default : 300
var cardHeight = 650; // default : 600
var cardsPerRow = undefined;
var cardsRow = undefined;
var cardZ = 1000;

function animate(){
  requestAnimationFrame(animate);
  TWEEN.update();
}

function startAnimation(grade){
  TWEEN.removeAll();
  _.forEach(cardObjects[grade], function(object, kClass){
    var target = moveTarget[grade][kClass];

    new TWEEN.Tween(object.position)
      .to(target.position, animateDuration)
      .easing(TWEEN.Easing.Quintic.In)
      .start();

    new TWEEN.Tween(object.rotation)
      .to(target.rotation, animateDuration)
      .easing(TWEEN.Easing.Quintic.In)
      .start();
  });

  new TWEEN.Tween(this)
    .to({}, animateDuration)
    .onUpdate(function(){
      renderer.render(scene[grade], camera[grade]);
    })
    .start();
}

function addCards(grade, class){
	_.forEach(cards, function(v1, grade){
		cardObjects[grade] = {};
		_.forEach(cards[grade], function(v2, kClass){
			var elem = $(document.createElement('div')).addClass('gg card')
			  .append(
				$(document.createElement('h2')).html(grade + ' - ' + kClass);
			  );

			var object = new THREE.CSS3DObject(elem.get(0));

			object.position.x = Math.randomRange(-300, 300);
			object.position.y = Math.randomRange(300, -300);
			object.position.z = Math.randomRange(-300, 300);

			object.rotateX(Math.randomRange(0, 360));
			object.rotateY(Math.randomRange(0, 360));
			object.rotateZ(Math.randomRange(0, 360));
			cardObject[grade].gradeCard = object;

			cardObject[grade][kClass] = {};
			_.forEach(cards[grade][kClass], function(v, period){
				var match = v.match(/^([^\s$#]+)(?:(\$|#)([^]+))?$/);
			    if(match){
			      v = match[1];
			    }

			    var text = assigned[v].text;

			    if(match && match[2] && match[3]){
			      text = (match[2] === '$') ? text + match[3] : match[3];
			    }

			    var elem = $(document.createElement('div')).addClass('gg card')
			      .append(
			        $(document.createElement('h2'))
			          .append($(document.createElement('i')).addClass(assigned[v].icon))
			      );
			      .append(
			        $(document.createElement('h3')).text(period + '교시 ' + text)
			      );

			    var object = new THREE.CSS3DObject(elem.get(0));

			    //Randomize Object position
			    /*
				object.position.x = Math.randomRange(-300, 300);
			    object.position.y = Math.randomRange(300, -300);
			    object.position.z = Math.randomRange(-300, 300);

			    object.rotateX(Math.randomRange(0, 360));
			    object.rotateY(Math.randomRange(0, 360));
			    object.rotateZ(Math.randomRange(0, 360));
				*/ //TODO update period code

			    cardObjects[grade][kClass][period] = object;
			});
		});
	});
}

function writeMoveTarget(){
	_.forEach(cards, function(v1, grade){
		moveTarget[grade] = {};
		_.forEach(cards[grade], function(v2, kClass){
			var cardX = (kClass - 1) % Math.floor(cardsPerRow);
		    var cardY = Math.floor((kClass - 1) / Math.floor(cardsPerRow));
		    var parentWidth = parseInt(window.getComputedStyle(parent).width.replace(/[^0-9\.]/g, ''));
		    moveTarget[grade][kClass] = {
		      position: {
		        x: ((cardX) * cardWidth) - ((cardsPerRow + 1) * cardWidth / 2)  - (parentWidth - 640) / 4,
		        y: (((cardsRow - 1) / 2) - cardY) * (cardHeight / 2),
		        z: cardZ
		      },

		      rotation: {
		        x: 0,
		        y: 0,
		        z: 0
		      }
			});
		});
	});
}

function update(){
  width = parseInt(window.getComputedStyle(parent).width.replace(/[^0-9\.]/g, ''));
  height = 600;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  _.forEach(cards, function(v1, grade){
	  renderer[grade].setSize(width, height);
  });

  cardsPerRow = width / (cardWidth / 2.24);
  if(cardsPerRow < 1) cardsPerRow = 1;

  cardsRow = Math.ceil(Object.keys(cards).length / cardsPerRow);
  writeMoveTarget();
}

function resize(){
  update();
  startAnimationAll();
}

animate();

$(document).ready(function(){
  parent = $('#top').get(0);
  update();
  addCards();


  _.forEach(cards, function(v, grade){
	  var renderView = $(renderer[grade].domElement);
	  $('#timetable-' + grade + 'grade').append(renderView);
  });
  startAnimationAll();
});

function startAnimationAll(){
	_.forEach(cards, function(v, grade){
		startAnimation(grade);
	});
}

$(window).resize(resize);
