function openSide() {
	$('.ui.sidebar')
		.sidebar('toggle');
	return false;
}
var colors = ['Red', 'Orange', 'Yellow', 'Olive', 'Green', 'Teal', 'Blue', 'Violet', 'Purple', 'Pink', 'Brown', 'Grey', 'Black'];
$(document)
	.ready(function() {
		$('.tabular.menu a.item').tab();
		$('.ui.dropdown').dropdown();

		var colorView = $('.colors.drop.menu');
		colors.forEach(function(v){
			colorView.append(
				$(document.createElement('div')).addClass('item').append(
					$(document.createElement('div')).addClass('ui ' + v.toLowerCase() + ' empty must circular label')
				).append(v)
			)
		});

		$('.message .close')
			.on('click', function() {
				$(this)
				.closest('.message')
				.transition('fade');
			});
	});
// semantic icon
semantic = {
	icon: {}
};
// 이벤트 시작
semantic.icon.ready = function() {
	var $grid = $('.ui.five.column.doubling.grid'),
		handler;
};
// attach ready event
$(document)
	.ready(semantic.icon.ready);
