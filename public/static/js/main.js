(
    function() {
        'use strict';

        $('span.flag_btn').css('visibility', 'visible');

        const au_btn = $('#aussy_language span');
        const body = $('body')

        let isAustralian = false;
        au_btn.on('click', () => {
            au_btn.attr('title', isAustralian ? 'Australian' : 'English');
            au_btn.css('background', isAustralian ? 'url(/content/au_flag.jpg)' : 'url(/content/uk_flag.jpg)')
            isAustralian = !isAustralian;

            body.css('transform', isAustralian ? 'rotate(180deg)' : 'none');
        })

    }
)()