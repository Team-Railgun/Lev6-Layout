function openSide(){
  $('.ui.sidebar').sidebar('toggle');
  return false;
}

$(document).ready(function(){
  $('.tabular.menu a.item').tab();
});
