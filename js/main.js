$(document).ready(() => {
    let wow = new WOW(
        {
            animateClass: 'animate__animated',
            offset: 50
        }
    );
    wow.init();


    $('.team-items').slick({
        refresh: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 910,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    });

    $('.gallery-images').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        variableWidth: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $("#accordion").accordion({});

    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        }
    });

    $('#dtBox').DateTimePicker(
        {
            shortDayNames: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            fullDayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
            fullMonthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            shortMonthNames: ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"]
        }
    );

    let productClick = $('.products-item-btn');
    let popup = $('.popup-order-container');
    let selectOption = $('.select-option');
    productClick.click((e) => {
        popup.addClass('active');
        for (let i = 0; i < selectOption.length; i++) {
            selectOption[i].removeAttribute('selected');
            if (e.target.dataset.name === selectOption[i].id) {
                selectOption[i].setAttribute('selected', 'true');
            }
        }
    })

    $('.gift-btn').click(() => {
        popup.addClass('active');
        $('#stoneMassage')[0].setAttribute('selected', 'true');
    })

    popup.click((e) => {
        if (e.target.className === 'popup-order-container active') {
            popup.removeClass('active');
        }
    })
    $('.popup-close').click(() => {
        popup.removeClass('active');
    })

    let userName = $('#userName');
    let userPhone = $('#userPhone');
    let userProduct = $('#userProduct');
    let userDate = $('#userDate');

    userPhone.inputmask({"mask": "+ 7 (999) 999-9999"});


    $('.popup-order-btn').click(() => {

        if (userName.val() && userPhone.val() && userProduct.val() && userDate.val()) {

            $.ajax({
                type: 'POST',
                url: 'mail.php',
                data: 'userName=' + userName.val() + '&userPhone=' + userPhone.val() + '&userProduct=' + userProduct.val() + '&userDate=' + userDate.val(),
                success: () => {
                    $('#popup-order-form').hide();
                    $('.popup-order-sent').show();
                },
                error: () => {
                    popup.removeClass('active');
                    alert('Ошибка бронирования. Свяжитесь, пожалуйста, по номеру телефона.');
                }
            });
        } else {

            $('.form-error').show();

            if (!userName.val()) {
                userName.css('border-color', 'red');
            }
            if (!userPhone.val()) {
                userPhone.css('border-color', 'red');
            }
            if (!userProduct.val()) {
                userProduct.css('border-color', 'red');
            }
            if (!userDate.val()) {
                userDate.css('border-color', 'red');
            }
        }
    })


    let callMeNumber = $('#callMeNumber');
    callMeNumber.inputmask({"mask": "+ 7 (999) 999-9999"});

    let callMeBtn = $('#questions-btn');
    callMeBtn.click(() => {
        if (callMeNumber.val()) {
            $.ajax({
                type: 'POST',
                url: 'callme.php',
                data: 'phoneNumber=' + callMeNumber.val(),
                success: () => {
                    $('.questions-form').css('display', 'none');
                    $('.questions-form-sent').css('display','flex');
                },
                error: () => {
                    $('.call-error').removeClass('error-active');
                    callMeNumber.css('border-color', 'rgb(114, 17, 99)');
                    alert('Ошибка запроса. Свяжитесь, пожалуйста, по номеру телефона +7 (981) 458 85 96.');
                }
            });
        } else {
            $('.call-error').addClass('error-active');
            callMeNumber.css('border-color', 'red');
        }
    })

    $('#burger').click(() => {
        $('.header-menu').toggleClass('open-menu');
    });

    $('.header-menu .header-menu-item').click(() => {
        $('.header-menu').removeClass('open-menu');
    });


})