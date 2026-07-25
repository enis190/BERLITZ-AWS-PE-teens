var tel = '955099599';


/**LOADER */
$(document).ready(function () {
    $(".jm-loadingpage").fadeOut("slow");
    menuEstatico();
});

/**HEADER */
$(window).scroll(function () {
    if (window.scrollY > $("#slider_page").offset().top) {
        $('#header_page').addClass('c-fixed');
    } else {
        $('#header_page').removeClass('c-fixed');
    }
});

/**WSP */
$(".c-wsp_old").click(function () {
    $(".block-social").addClass('force-active-off');
    $(".c-wsp").addClass('force-active-off');
    $(".back-top").addClass('force-active-off');

    $(".c-wsp-container").addClass('active');

});

$(".close-wsp").click(function () {
    $(".block-social").removeClass('force-active-off');
    $(".c-wsp").removeClass('force-active-off');
    $(".back-top").removeClass('force-active-off');

    $(".c-wsp-container").removeClass('active');
});



/**TIPOLODIA */
function click_tipologia(tipo) {
    //
    $("#slt_interesado").html("");
    // $("#slt_interesado").append('<option value="" hidden>Estoy interesado en:</option>');

    if (tipo == 1) {
        $("#slt_interesado").append('<option value="1" selected="true">Tipo 1 - Dpto. de 3 dorm. desde S/558,000</option>');
        $("#slt_interesado").append('<option value="2">Tipo 2 - Dpto. de 3 dorm. desde S/583,000</option>');
        $("#slt_interesado").append('<option value="3">Local comercial (incluye 5 cocheras) desde S/2,650,000</option>');
    }
    if (tipo == 2) {
        $("#slt_interesado").append('<option value="1">Tipo 1 - Dpto. de 3 dorm. desde S/558,000</option>');
        $("#slt_interesado").append('<option value="2" selected="true">Tipo 2 - Dpto. de 3 dorm. desde S/583,000</option>');
        $("#slt_interesado").append('<option value="3">Local comercial (incluye 5 cocheras) desde S/2,650,000</option>');
    }
    if (tipo == 3) {
        $("#slt_interesado").append('<option value="1">Tipo 1 - Dpto. de 3 dorm. desde S/558,000</option>');
        $("#slt_interesado").append('<option value="2">Tipo 2 - Dpto. de 3 dorm. desde S/583,000</option>');
        $("#slt_interesado").append('<option value="3" selected="true">Local comercial (incluye 5 cocheras) desde S/2,650,000</option>');
    }
}


/**CONTACTO */
$("#frm_2").submit(function (event) {
    var cselect = $('#slt_interesado').val();
    dataString = $("#frm_2").serialize();
    $('#contacto_submit').html('<div class="lds-ring"><div></div><div></div><div></div><div>');
    //$("#frm_2 *").prop('disabled', true);
    //alert(cselect);

    var settings = {
        "url": "https://godigital-development.com/website-projects/form_contacto2/actual/brasil.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "data": JSON.stringify({
            "nombre": $('#txt_nombre').val(),
            "email": $('#txt_email').val(),
            "interesado": cselect,
            "celular": $('#txt_celular').val(),
            "apellidos": $('#txt_apellido').val()
        }),
    };

    $.ajax(settings).done(function (response) {
        //alert(response);
        //location.href = "gracias.php";


        $.ajax({
            type: "POST",
            url: "https://hook.integromat.com/jsbidsh5pqv6iaxb093kr00c18c6lr65",
            data: dataString,
            success: function (data) {
                location.href = "gracias.php";
            },
            error: function (xhr, status) {
                console.log('Error drive -> ');
                $("#frm-1 *").prop('disabled', false);
            }
        });

    });


    // $.ajax({
    //     type: "POST",
    //     url: "https://hook.integromat.com/s99tfk3lxnqx4mlifbmo3yllqakob9c5",
    //     data: dataString,
    //     success: function (data) {
    //         console.log('row 3');
    //         //window.open("https://api.whatsapp.com/send?phone=51"+tel, "_blank");

    //         var link = document.getElementById('link');
    //         link.setAttribute('href', "https://api.whatsapp.com/send?phone=51"+tel);
    //         link.click();

    //         $('#contacto_submit').html('Iniciar Chat');
    //     },
    //     error: function (xhr, status) {
    //         console.log('Error drive -> ');
    //         $("#frm-1 *").prop('disabled', false);
    //     }
    // });

    return false;
});


$("#frn-modal-contacto").submit(function (event) {
    dataString = $("#frn-modal-contacto").serialize();
    $('#contacto2_submit').html('<div class="lds-ring"><div></div><div></div><div></div><div>');
    $("#frn-modal-contacto *").prop('disabled', true);


    $.ajax({
        type: "POST",
        url: "assets/email/contacto-2.php",
        data: dataString,
        success: function (data) {


            $.ajax({
                type: "POST",
                url: "https://hook.integromat.com/sgpgbthnfxigdlx61lji86sx2hdahoga",
                data: dataString,
                success: function (data) {
                    window.location.href = "gracias.php";
                    // $('#contacto_submit').html('Iniciar Chat');
                },
                error: function (xhr, status) {
                    console.log('Error drive -> ');
                    $("#frm-1 *").prop('disabled', false);
                }
            });


        },
        error: function (xhr, status) {
            console.log('Error drive -> ');
            $("#frm-1 *").prop('disabled', false);
        }
    });

    return false;
});


/**VER TEL */

$("#ver_tel").click(function () {
    $('#ver_tel').html('&nbsp;&nbsp;&nbsp;&nbsp;' + tel + '&nbsp;&nbsp;&nbsp;');
});

/**MENU XS */
$("#btn-menu-xs-cerrar").click(function () {
    $('#div_menu_xs').removeClass('active');
});
$("#btn-menu-xs-abrir").click(function () {
    $('#div_menu_xs').addClass('active');
});



/**Animando contador */
var animacion = false;
function count_animacion() {
    if (animacion == false) {
        animacion = true;
        $('.count').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 3000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

}




/**VIDEO */
$("#preview_video").click(function () {
    //alert('video on');
    $('#icon_video').removeClass('active');
    $('.video-youtube').addClass('active');

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
});



function onYouTubeIframeAPIReady() {
    player = new YT.Player('video_player', {
        height: '360',
        width: '640',
        videoId: 'BU6WciiZ-Z8',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            autoplay: 1,
            rel: 0
        }
    });
}
function onPlayerReady(event) {
    event.target.playVideo();
}
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}
function PlayVideo() {
    player.playVideo();
}





/**SLICK */
$(document).on('ready', function () {
    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        fade: true,
        initialSlide: 0,
        autoplay: true
    });
    $(".regular2").slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        fade: true,
        initialSlide: 0,
        autoplay: true
    });
    $('.responsive').slick({
        dots: true,
        infinite: true,
        speed: 300,
        autoplay: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        ]
    });

    $('.responsive2').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        ]
    });




});




$(".btn_promos").click(function () {
    $('html, body').scrollTop($(".promos").offset().top - 70);
    $("#btn-menu-xs-cerrar").click();
});



function click_formulario() {
    $('html, body').scrollTop($(".formulario").offset().top - 110);
    $("#btn-menu-xs-cerrar").click();
}



function click_section(v_section) {
    $('html, body').scrollTop($("."+v_section).offset().top - 70);
    $("#btn-menu-xs-cerrar").click();
}



function menuEstatico(){
    const menu = document.querySelector(".seccion_menu_desktop");
    if (!menu) return;

    const menuOffsetTop = menu.offsetTop;

    window.addEventListener("scroll", function () {
        if (window.scrollY >= menuOffsetTop) {
        menu.classList.add("menu_estatico");
        } else {
        menu.classList.remove("menu_estatico");
        }
    });
}


