$(document).ready(function() {
    $('.minus').click(function() {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function() {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
    $('.back-link').click(function() {
        parent.history.back();
        return false;
    })
    $('.size label').click(function() {
        if ($(this).is('.sold')) {
            $('.sold-out').addClass('active');
        } else {
            $('.sold-out').removeClass('active');
        }
    });
    if ($(window).width() < 1280) {
        $('.size label').click(function() {
            $('.price').addClass('hidden');
            $('.add-basket').addClass('visible');
            $('.size').removeClass('fadeInUp').addClass('fadeOutDown');
            $('.body').removeClass('after');
        });
    } else {
        $('.size').removeClass('animated fadeOutDown');
    }
    $('.size-open').click(function() {
        $('.body').addClass('after');
        $('.size').removeClass('fadeOutDown').addClass('animated fadeInUp');
    });
    $('.close-size').click(function() {
        $('.body').removeClass('after');
        $('.size').removeClass('fadeInUp').addClass('fadeOutDown');
    });
    $('.left-menu-open').click(function() {
        $('.left-menu').addClass('open');
        $('.left-menu > .head').removeClass('fadeOut').addClass('animated fadeIn');
        $('.left-menu > .body').addClass('animated fadeInLeft');
    });
    $('.left-menu-close').click(function() {
        $('.left-menu > .head').removeClass('fadeIn').addClass('fadeOut');
        $('.left-menu > .body').removeClass('animated fadeInLeft');
        setTimeout(function() {
            $('.left-menu').removeClass('open');
        }, 400);
    });
    $('.right-menu-open').click(function() {
        $(this).toggleClass('open');
        $('.right-menu').toggleClass('open');
        $('.right-menu > .body').toggleClass('animated fadeInRight');
        $('.right-menu .social-links').toggleClass('animated fadeIn')
    });

    $('.gallery-tab').click(function() {
        if ($(this).find('li:nth-child(2)').hasClass('active')) {
            $('.footer-line').removeClass('w3 w4 w5 w6').addClass('w2')
        } else if ($(this).find('li:nth-child(3)').hasClass('active')) {
            $('.footer-line').removeClass('w2 w4 w5 w6').addClass('w3')
        } else if ($(this).find('li:nth-child(4)').hasClass('active')) {
            $('.footer-line').removeClass('w3 w2 w5 w6').addClass('w4')
        } else if ($(this).find('li:nth-child(5)').hasClass('active')) {
            $('.footer-line').removeClass('w3 w2 w4 w6').addClass('w5')
        } else if ($(this).find('li:nth-child(6)').hasClass('active')) {
            $('.footer-line').removeClass('w3 w2 w5 w4').addClass('w6')
        } else if ($(this).find('li:first-child').hasClass('active')) {
            $('.footer-line').removeClass('w3 w2 w5 w4 w6')
        }
    });

    $('.coll-item a').click(function() {
        var href = $(this).attr('href')
        $('#white').addClass('fadeIn');
        setTimeout(function() {
            window.location = href
        }, 500);
        return false;
    });

    var $window = $(window);

    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize <= 1279) {
            $('.menu, #header .close').removeClass('open');
        }
    }
    checkWidth();
    $(window).resize(checkWidth);

    // ORDER FORM
    $('#order-modal').submit(function(e) {
        e.preventDefault();
        var form = $(this);

        //console.log(form.find('[name="email"]').val());

        var c_name = form.find('#name').val();
        var c_phone = form.find('#phone').val();
        var success = form.find('.success');
        var submit = form.find('.btn');
        var vendor = $('.cart-form .head span').text();
        var size = $('input[name="cart-size"]:checked').attr('id');

        var formData = {
            'name': c_name,
            'phone': c_phone,
            'vendor': vendor,
            'size': size
        };


        $.ajax({
            type: 'POST',
            url: '/assets/php/contact.php',
            data: formData,
            dataType: 'json',
            encode: true,
            success: function(res) {
                console.log(res);
                //var res = $.parseJSON(JSON.stringify(res));
                if (!res.error) {
                    $('.show-success').click();
                    form[0].reset();
                } else {
                    alert(res.error);
                }
            },
            error: function(e) {
                alert('Ошибка. Попробуйте ещё раз.');
            }
        });

        return false;
    });

});

// tabs
$(function(e) {

    $('.tabcontent').hide().filter(':first').show();

    $('#tabs li[data-tabs]').on('click', function() {

        $('#tabs li[data-tabs]').removeClass('active');
        $('.tabcontent').hide();

        var tab = $(this).data('tabs');
        $(this).addClass('active');
        $('#' + tab).fadeIn().show();
    });

    $("#tabs li").click(function() {
        var cur = $("#tabs li").index(this);
        var elm = $('.tabcontent:eq(' + cur + ')');
        elm.addClass("fadeIn");
        setTimeout(function() {
            elm.removeClass("fadeIn");
        }, 220);
    });

    $('.tabcontent img').click(function() {
        $('#gallery-main').attr('src', $(this).attr('src')).addClass('animated fadeIn');
        setTimeout(function() {
            $('#gallery-main').removeClass('fadeIn');
        }, 500);
        $('.tabcontent .gallery-block').removeClass('active');

        $(this).parent().addClass('active');
    });
    $('head').append('<script type="text/javascript" src="/assets/js/jquery.maskedinput.js"></script>');
    //$('input[name="phone"]').attr('type', 'text');
    $('input[name="phone"]').mask('+7 (999) 999-99-99');
});

$(function() {
    $(".tabcontent").hide().first().show();
    $(".collection-tab li:first").addClass("active");

    $(".collection-tab a").on('click', function(e) {
        e.preventDefault();
        $(this).closest('li').addClass("active").siblings().removeClass("active");
        $($(this).attr('href')).show().siblings('.tabcontent').hide();
    });

    var hash = $.trim(window.location.hash);

    if (hash) $('.collection-tab a[href$="' + hash + '"]').trigger('click');

});
