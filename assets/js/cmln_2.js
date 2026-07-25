// // 2. This code loads the IFrame Player API code asynchronously. 
// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// // 3. This function creates an <iframe> (and YouTube player) 
// //    after the API code downloads. 
// var player;
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '360',
//         width: '640',
//         videoId: '5NGkxKzNYWM',
//         events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//         }
//     });
// }


// // Función que se ejecutará cuando la página esté completamente cargada
// function onPageLoad() {
//     // Este bloque de código se ejecutará después de que la página esté completamente cargada

//     // Carga asíncrona del IFrame Player API code
//     var tag = document.createElement('script');
//     tag.src = "https://www.youtube.com/iframe_api";
//     var firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// }

// // Asigna la función onPageLoad al evento window.onload
// window.onload = onPageLoad;

// // Resto de tu código
// var player;

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '360',
//         width: '640',
//         videoId: '3OOkC4c6hYo',
//         events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//         }
//     });
// }

// // Resto de tus funciones



// // 4. The API will call this function when the video player is ready. 
// function onPlayerReady(event) {
//     event.target.playVideo();
// }
// // 5. The API calls this function when the player's state changes. 
// //    The function indicates that when playing a video (state=1), 
// //    the player should play for six seconds and then stop. 
// var done = false;
// function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING && !done) {
//         // setTimeout(stopVideo, 6000);
//         done = true;
//     }
// }
// function stopVideo() {
//     player.stopVideo();
// }

// function PlayVideo() {
//     player.playVideo();
// } 






// ANIMACIÓN BOTONES MENU CONFORME VAYA BAJANDO 
$(document).ready(function () {
    // Función para actualizar las clases del menú según la posición del contenido
    function actualizarMenu() {
        // Obtener la posición vertical del scroll
        var scrollPosition = $(window).scrollTop();

        // Iterar sobre cada contenido y verificar si está visible en la pantalla
        $('[id^="contenido_"]').each(function () {
            // Verificar si el elemento está definido
            if ($(this).length) {
                var contentOffset = $(this).offset().top-150;
                var contentHeight = $(this).outerHeight();

                if (scrollPosition >= contentOffset && scrollPosition < contentOffset + contentHeight) {
                    // Obtener el número de contenido desde el ID
                    var contentNumber = $(this).attr('id').split('_')[1];

                    // Eliminar la clase 'active' de todos los elementos del menú
                    $('.i_menu').removeClass('active');

                    // Agregar la clase 'active' al elemento del menú correspondiente
                    $('.menu_'.concat(contentNumber)).addClass('active');
                }
            }
        });


        /**Cambiar color btn fixed */
        $('.c-menu').each(function () {
            var contentOffset = $(this).offset().top-400;
            var contentHeight = $(this).outerHeight();

            if(scrollPosition >= contentOffset){
                $('.btn-fixed-call').addClass('active');
                $('.c-subir').addClass('active');
                $('.c-msj').addClass('active');
            }else{
                $('.btn-fixed-call').removeClass('active');
                $('.c-subir').removeClass('active');
                $('.c-msj').removeClass('active');
            }
        });


    }


    function subir(){
        $('html, body').scrollTop($("#header_page").offset().top);
    }

    // Llamar a la función al cargar la página y al desplazarse
    actualizarMenu();

    $(window).scroll(function () {
        actualizarMenu();
    });

    $("#btn_form_whatsapp").click(function () {
        $("#btn_form_contacto").addClass("oculto");
        $("#btn_form_whatsapp").addClass("oculto");
        $("#form_principal").addClass("oculto");

        setTimeout(function () {
        $("#form_whatsapp").addClass("visible");
        }, 300);
    });

    $("#btn_form_whatsapp_close").click(function () {
        $("#form_whatsapp").removeClass("visible");

        setTimeout(function () {
        $("#btn_form_contacto").removeClass("oculto");
        $("#btn_form_whatsapp").removeClass("oculto");
        $("#form_principal").removeClass("oculto");
        }, 300);
    });
});





// FIXED MENU
$(document).ready(function () {
    var menu = $(".c-menu");
    var menuOffset = menu.offset().top;

    $(window).scroll(function () {
        var scrollPosition = $(window).scrollTop();

        if (scrollPosition >= menuOffset) {
            // Si el scroll ha pasado la posición del menú, agregar la clase "fixed"
            menu.addClass("c-fixed");
        } else {
            // Si el scroll está por encima de la posición del menú, quitar la clase "fixed"
            menu.removeClass("c-fixed");
        }
    });
});






// IN TRANSITION

$(document).ready(function () {
    // Función para agregar la clase 'active' cuando el elemento entra en la pantalla
    function fadeInOnScroll() {
        $(document).ready(function () {
            // Función para agregar la clase 'active' y aplicar efectos cuando el elemento entra en la pantalla
            function applyEffectsOnScroll() {
                $(".fade-in").each(function () {
                    var position = $(this).offset().top;
                    var scroll = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var delay = parseInt($(this).data('delay')) || 0;
                    var duration = parseInt($(this).data('duration')) || 1000; // Duración predeterminada: 1000 ms
        
                    if (scroll > position - windowHeight + 100) {
                        setTimeout(function () {
                            $(this).css({ transition: 'opacity ' + duration + 'ms ease-in-out, transform ' + duration + 'ms ease-in-out' }).addClass("active");
                        }.bind(this), delay);
                    }
                });

                $(".fade-in-top").each(function () {
                    var position = $(this).offset().top;
                    var scroll = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var delay = parseInt($(this).data('delay')) || 0;
                    var duration = parseInt($(this).data('duration')) || 1000; // Duración predeterminada: 1000 ms
        
                    if (scroll > position - windowHeight + 100) {
                        setTimeout(function () {
                            $(this).css({ transition: 'opacity ' + duration + 'ms ease-in-out, transform ' + duration + 'ms ease-in-out' }).addClass("active");
                        }.bind(this), delay);
                    }
                });


                $(".fade-in-bottom").each(function () {
                    var position = $(this).offset().top;
                    var scroll = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var delay = parseInt($(this).data('delay')) || 0;
                    var duration = parseInt($(this).data('duration')) || 1000; // Duración predeterminada: 1000 ms
        
                    if (scroll > position - windowHeight + 100) {
                        setTimeout(function () {
                            $(this).css({ transition: 'opacity ' + duration + 'ms ease-in-out, transform ' + duration + 'ms ease-in-out' }).addClass("active");
                        }.bind(this), delay);
                    }
                });

                $(".fade-in-left").each(function () {
                    var position = $(this).offset().top;
                    var scroll = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var delay = parseInt($(this).data('delay')) || 0;
                    var duration = parseInt($(this).data('duration')) || 1000; // Duración predeterminada: 1000 ms
        
                    if (scroll > position - windowHeight + 100) {
                        setTimeout(function () {
                            $(this).css({ transition: 'opacity ' + duration + 'ms ease-in-out, transform ' + duration + 'ms ease-in-out' }).addClass("active");
                        }.bind(this), delay);
                    }
                });

                $(".fade-in-right").each(function () {
                    var position = $(this).offset().top;
                    var scroll = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var delay = parseInt($(this).data('delay')) || 0;
                    var duration = parseInt($(this).data('duration')) || 1000; // Duración predeterminada: 1000 ms
        
                    if (scroll > position - windowHeight + 100) {
                        setTimeout(function () {
                            $(this).css({ transition: 'opacity ' + duration + 'ms ease-in-out, transform ' + duration + 'ms ease-in-out' }).addClass("active");
                        }.bind(this), delay);
                    }
                });


                $(".cont-niv-html").each(function () {
                    var position = $(this).offset().top-200;
                    var scroll = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var delay = parseInt($(this).data('delay')) || 0;
                    var duration = parseInt($(this).data('duration')) || 1000; // Duración predeterminada: 1000 ms
        
                    if (scroll > position - windowHeight + 10) {
                        setTimeout(function () {
                            $(this).css({ transition: 'opacity ' + duration + 'ms ease-in-out, transform ' + duration + 'ms ease-in-out' }).addClass("active");
                        }.bind(this), delay);
                    }
                });


            }
        
            // Llamar a la función al cargar la página y al desplazarse
            applyEffectsOnScroll();
        
            $(window).scroll(function () {
                applyEffectsOnScroll();
            });
        });
        
    }

    // Llamar a la función al cargar la página y al desplazarse
    fadeInOnScroll();

    $(window).scroll(function () {
        fadeInOnScroll();
    });


    $("#btn_youtube").click(function () {
        //alert('df');
        $('.youtube-prev').removeClass('active');
        $('.youtube').addClass('active');

        PlayVideo();
    });
});

