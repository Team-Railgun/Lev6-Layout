Math.randomRange = function(max, min){
  min = min || 0;

  return Math.round(Math.random() * (max - min)) + min;
};

var camera = new THREE.PerspectiveCamera(40, 1.5, 1, 1000);
camera.position.z = 600;
camera.aspect = 1.5;
camera.updateProjectionMatrix();

var scene = new THREE.Scene();

var renderer = new THREE.CSS3DRenderer();
renderer.setSize(600, 400);

//name$append : 템플릿 'name'을 사용하며, 이름 뒤에 'append'를 붙임
//name#replace: 템플릿 'name'을 사용하며, 이름이 'replace'로 출력됨

var cards = {
  1: 'korean$b',
  2: 'career',
  3: 'physics',
  4: 'english',
  5: 'mathematics_i',
  6: 'korean$a',
  7: 'club#학급'
};

var cardObjects = {};
var moveTarget = {};
var animateDuration = 2000;

_.forEach(cards, function(v, period){
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
    )
    .append(
      $(document.createElement('h7')).text(period + '교시 ' + text)
    );

  var object = new THREE.CSS3DObject(elem.get(0));

  //Randomize Object position
  object.position.x = Math.randomRange(-300, 300);
  object.position.y = Math.randomRange(300, -300);
  object.position.z = Math.randomRange(-300, 300);

  object.rotateX(Math.randomRange(0, 360));
  object.rotateY(Math.randomRange(0, 360));
  object.rotateZ(Math.randomRange(0, 360));

  cardObjects[period] = object;
  moveTarget[period] = {
    position: {
      x: period * 200 - 750, //FIXME
      y: 0, //FIXME
      z: 0
    },

    rotation: {
      x: 0,
      y : 0,
      z : 0
    }
  };

  scene.add(object);
});

function animate(){
  requestAnimationFrame(animate);
  TWEEN.update();
}

function startAnimation(){
  TWEEN.removeAll();
  _.forEach(cardObjects, function(object, k){
    var target = moveTarget[k];

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
      console.log("Tweening");
      renderer.render(scene, camera);
    })
    .start();
}

animate();

$(document).ready(function(){
  var renderView = $(renderer.domElement);
  renderView.css({
    width: '100%'
  });
  $('.timetable').append(renderView);
  startAnimation();
});
