function openSide() {
	$('.ui.sidebar')
		.sidebar('toggle');
	return false;
}

$(document)
	.ready(function() {
		$('.tabular.menu a.item')
			.tab();
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
