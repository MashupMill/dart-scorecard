(function ($) {
    $.fn.dartboard = function (options) {
        var container = this;
        var dartboard = {
            container: this,
            init: function () {
                var fn = 'dartboardload' + (+new Date);
                var obj = $('<object data="img/dartboard.svg" type="image/svg+xml" class="img-responsive center-block">').attr('onload', fn + '()');
                window[fn] = _.bind(function () {
                    delete window[fn];
                    this.container.trigger('load');
                }, this);
                this.container.addClass('dartboard');
                this.container.append(obj);
                this.container.append('<div class="score-preview" />');
                this.container.on('load', _.bind(this.load, this));
            },
            load: function () {
                this.board = $(this.container.find('object')[0].getSVGDocument());
                this.board
                    .on('mouseup', _.bind(this.clickScore, this));
                this.board.find('path, circle')
                    .on('mouseenter', _.bind(this.hoverScore, this));
            },
            hoverScore: function (e) {
                var slice = this.getSlice(e.target.id);
                this.previewScore(slice);
                this.container.trigger('slice-hover', [slice, e]);
            },
            clickScore: function (e) {
                var slice = this.getSlice(e.target.id);
                this.container.trigger('slice-click', [slice, e]);
            },
            getSlice: function (id) {
                id = id || 's0';
                var multiplier = 1;
                var score = 0;
                switch(id) {
                    case 'Outer':
                        score = 25;
                        break;
                    case 'Bull':
                        score = 25;
                        multiplier = 2;
                        break;
                    default:
                        var matches = id.match(/([sdt])(\d+)/);
                        if (matches && matches.length == 3) {
                            switch (matches[1]) {
                                case 'd':
                                    multiplier = 2;
                                    break;
                                case 't':
                                    multiplier = 3;
                                    break;
                            }
                            score = matches[2];
                        }
                        break;
                }
                return {
                    id: id,
                    score: score,
                    multiplier: multiplier,
                    total: score * multiplier
                }
            },
            previewScore: function (slice) {
                this.container.find('.score-preview').html(slice.score * slice.multiplier);
            }
        }
        dartboard.init();
        return this;
    };
}(window.jQuery));
