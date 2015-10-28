(function ($) {
    var container = $('.dartboard-container').dartboard({}).on('slice-click', function (e, slice, origEvent) {
        console.log(slice, origEvent);
        var dart = $('<i class="fa fa-map-marker"></i>');
        dart.css({
            position: 'absolute',
            top: origEvent.offsetY + 'px',
            left: origEvent.offsetX + 'px'
        })
        container.append(dart);
    });
}(window.jQuery));

