(function ($) {
    "use strict";
    $(window).on("load resize",function(e){
        const headerHeight =   document.querySelector('.header').offsetHeight;
        document.querySelector('.offcanvas-area').style.top = `${headerHeight}px`;
    });

    jQuery(document).ready(function ($) {



        $('.bar , .offcanvas-overlay').click(function () {

            $('.offcanvas-area , .offcanvas-overlay').addClass('active');

        });
        $('.menu-close , .offcanvas-overlay').click(function () {

            $('.offcanvas-area , .offcanvas-overlay').removeClass('active');

        });



        // $(".package-slider").owlCarousel({
        //     items: 3,
        //     nav: true,
        //     dot: false,
        //     loop: true,
        //     margin: 20,
        //     autoplay: false,
        //     autoplayTimeout: 3000,
        //     smartSpeed: 1000,
        //     responsiveClass: true,
        //     navText: ["<i class='fas fa-chevron-right'></i>", "<i class='fas fa-chevron-left'></i>"],
        //     responsive: {
        //         0: {
        //             items: 1,
        //         },
        //         575: {
        //             items: 1,
        //             margin: 7,
        //         },
        //         750: {
        //             items: 2,
        //             margin: 7,
        //         },
        //         768: {
        //             items: 2,
        //         },
        //         991: {
        //             items: 3,
        //             margin: 12,
        //         },
        //         1200: {
        //             items: 3,
        //             margin: 14,
        //         },
        //         1360: {
        //             items: 3,
        //             margin: 20,
        //         }
        //     }


        // });


    });

    jQuery(window).load(function () {


    });
 

}(jQuery));