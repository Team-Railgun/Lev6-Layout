var time = undefined;

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();

  m = checkTime(m);
  s = checkTime(s);
  time.text(h + ":" + m);
  setTimeout(startTime, 500);
}

$(document).ready(function(){
  time = $('#time');
  startTime();
});

// 10보다 작을때 앞에 0 생성
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
