(function ($) {
    var total = 0;
    var container = $('.dartboard-container').dartboard({}).on('slice-click', function (e, slice, origEvent) {
        var dart = $('<i class="fa fa-map-marker"></i>').hide();
        container.append(dart);
        dart.css({
            position: 'absolute',
            top: (origEvent.offsetY - dart.outerHeight()) + 'px',
            left: (origEvent.offsetX - (dart.outerWidth() / 2)) + 'px'
        }).show();
        total += slice.total;
        console.log(total);
    });
}(window.jQuery));

