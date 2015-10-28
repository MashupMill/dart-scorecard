(function ($) {
    $('.dartboard-container').dartboard({}).on('slice-click', function (e, slice) {
        console.log(slice);
    });
}(window.jQuery));

