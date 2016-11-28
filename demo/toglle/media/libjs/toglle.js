/**
 * Created by a.k.eliseev on 24.11.2016.
 */
(function($) {
    /**
     *
     * @param elem
     * @param settings
     * @param btn
     * @constructor
     */
    var TseAnemateToglle = function TseAnemateToglle(elem, settings, btn){


        // Construct auto play
        if (!(this instanceof arguments.callee)) {
            return new arguments.callee(elem,settings,btn);
        }

        var _ = this;
        _.$elem = $(elem);
        /**
         *
         * @type {{
         * autor: string,
         * plugin: string,
         * metadata: string,
         * dataAnimate: string,
         * dataSpeed: string,
         * pointAnimate: {},
         * pointOriginal: {},
         * cssAnimate: {},
         * cssOriginal: {},
         * speed: number
         * }}
         */
        _.defaults = {
            autor: 'tse',
            plugin: 'toglle',
            metadata: 'tse-toglle',
            dataAnimate: 'tse-toglle-animate',
            dataSpeed: 'tse-toglle-speed',
            pointAnimate: {},
            pointOriginal: {},
            cssAnimate: {},
            cssOriginal: {},
            speed: 500,
            events: 'click'
        };
        // Get settings
        _.options = $.extend({}, _.defaults, settings);
        // Get btn toglle
        _.$btn = btn || $(_.$elem.data(_.options.metadata));
        // Get meta date animate
        if($.isEmptyObject(_.options.pointAnimate) && _.$elem.data(_.options.dataAnimate)) _.options.pointAnimate = _.stringToObj(_.$elem.data(_.options.dataAnimate));
        // Get meta date speed
        if($.isEmptyObject(_.options.speed) && _.$elem.data(_.options.dataSpeed)) _.options.speed = _.$elem.data(_.options.dataSpeed);
        $.data(_.$elem, _.options.dataSpeed, _.options.speed);
        // Set defult point animate
        if($.isEmptyObject(_.options.pointAnimate)) _.options.pointAnimate = {opacity: 0, height: 0};
        $.data(_.$elem, _.options.dataAnimate, $.param(_.options.pointAnimate).replace(/\&/g,';'));
        // Save original points
        if($.isEmptyObject(_.options.pointOriginal)) _.options.pointOriginal = _.saveOptions(_.options.pointAnimate);
        // Save original css
        if($.isEmptyObject(_.options.cssOriginal)) _.options.cssOriginal = _.saveOptions(_.options.cssAnimate);

        _.init();
    };
    /**
     *
     * @type {{
     * init: TseAnemateToglle.init,
     * toglleMove: TseAnemateToglle.toglleMove,
     * stringToObj: TseAnemateToglle.stringToObj,
     * saveOptions: TseAnemateToglle.saveOptions
     * }}
     */
    TseAnemateToglle.prototype ={
        // Plagin inizialization
        init: function () {
            var _ = this;
            // Start position
            if(!_.$elem.hasClass('active')){
                _.$elem.animate(_.options.pointAnimate,0);
            }
            _.$btn.on(_.options.events, function () {
                if(_.$elem.hasClass('active')){
                    return _.toglleMove(_.options.pointAnimate, _.options.cssAnimate);
                }else{
                    return _.toglleMove(_.options.pointOriginal, _.options.cssOriginal);
                }
            });
        },
        toglleMove: function (options, style) {
            var _ = this;
            _.$elem.toggleClass('active');
            _.$elem.animate(options, _.options.speed).css(style);
            return false;
        },
        stringToObj: function (data) {
            if(data){
                var options = data.replace(/\s/g,'').split(';'),
                    option, obj = {};
                options.forEach(function(elem) {
                    if(elem){
                        option = elem.split(':');
                        obj[option[0]] = option[1];
                    }
                });
                return obj;
            }
            return {};
        },
        saveOptions: function (options){
            var _ = this, startPoints = {};
            for(var key in options){
                startPoints[key] = _.$elem.css(key);
            }
            return startPoints;
        }
    };

    $.fn.animatetoglle = function(options, btn) {
        return this.each(function () {
            TseAnemateToglle(this, options, btn);
        });
    };
    $(document).ready(function() {
        $('[data-tse-toglle]').animatetoglle();
    });
})(jQuery);