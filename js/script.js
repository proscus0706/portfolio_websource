//"load" 이벤트. 페이지가 로딩될 때. 아이콘 보이기
//기본적으로 css로 loading 화면을 만들어 놓는다. "load" event일 때만 보이게 하면 된다.
$(window).on("load", function(){
    //아이콘이 먼저 사라진다.
    $(".loader .inner").fadeOut(500, function(){
        //배경화면이 사라진다.
        $(".loader").fadeOut(750);
    });

    //🔷isotope
    // portfolio secion에서 image가 overlapping되는 버그 발견.
    // onLoad에서 isotop을 호출해야지 image가 overlapping되지 않는다.
    $('.items').isotope({
        filter: '*',
        animationOptions: {
            duration: 1500,
            easing: 'linear',
            queue: false
        }
    });

});

$(document).ready(function(){
    //🔷superslides 슬라이드 적용. 이 함수를 호출하지 않으면 이미지가 나오지 않는다.
    $('#slides').superslides({
        animation: 'fade',
        play: 5000,
        pagination: false
    }); //superslides({}) 파라미터 안에 object를 넣어서 option을 넣을 수 있다.

    //🔷typed.js
    /*
     p1 - target하는 클래스를 넣어준다.
     p2 - options
     */
    let typed = new Typed(".typed", {
        strings: ["Software Engineer.", "Web Developer.", "Zealous Dreamer."],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false
    });

    //🔷owl-carousel
    $('.owl-carousel').owlCarousel({
        loop:true,
        items: 4,
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            768:{
                items:3
            },
            938:{
                items:4
            }
        }
    });

    //🔷 Scroll 내려갈 때 생겨나는 로직
    //scroll이 내려갈 때 animation이 실행되게하기
    //현재는 page가 load되자마자 animation이 실행되서 animatin을 볼 수 없다.
    let skillsTopOffset = $('.skillsSection').offset().top; //sillsTopOffset variable은 skllsSection의 position값을 가지고 있다.
    let squareItemOffset = $('.squareItem').offset().top; //🔷countUp js
    let countUpFinished = false;
    //window scroll event로 로직을 추가해준다.
    $(window).scroll(function(){
        //🔷easy-pie chart
        if(window.pageYOffset > skillsTopOffset - $(window).height() + 200){
            $('.chart').easyPieChart({
                //your options goes here
                easing: 'easeInOut', //Smooth transition
                barColor: '#fff',
                trackColor: false, //track에 색을 주지 않음. track은 원 둘레를 그리는 선을 말한다. 이것을 false로 지정해주지 않으면 그대로 덮어버려서 모든게 흰색으로 보임.
                scaleColor: false, //바늘을 얘기한다.
                lineWidth: 4, //원 둘레를 그리는 선의 두께
                size: 152,
                onStep: function(from, to, percent){
                    //`onStep` is called during animations providing the current value
                    //보여주는 숫자를 1씩 increment 시켜준다.
                    $(this.el).find('.percent').text(Math.round(percent)); //실제로 적용
                    //해석 --> $(this.el) 지금 이 element에서  .percent를 찾아서 text를 percent로 맞춰줘라.
                }
            });
        }
        //🔷countUp js
        if(!countUpFinished && window.pageYOffset > squareItemOffset - $(window).height() + 200){
            $('.counter').each(function(){
                var element = $(this);
                var endVal = parseInt(element.text());
                element.countup(endVal);
                countUpFinished = true;
            });
        }

    });

    //🔷fancybox
    $('[data-fancybox]').fancybox();

    //🔷textAnimation
    $(function () {
        $('.tlt').textillate({
            loop: true,
            minDisplayTime: 1000,
            in: {
                effect: 'fadeInLeftBig',
                sequence: true
            },
            out: {
                effect: 'bounceOutLeft',
                reverse: true
            }
        });
    });

    //🔷 isotop - filtering
    $("#filters a").click(function(){

        //.current가 클릭된 부분임
        $("#filters .current").removeClass("current");
        $(this).addClass("current");

        let selector = $(this).attr("data-filter"); //선택한 것에 data-filter attribute의 값을 가져온다. 예를들어 data-filter의 값이 android면 android 값만 가져옴.

        //isotope
        $('.items').isotope({
            filter: selector,
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                queue: false
            }
        });

        return false; //이것을 반드시 넣어줘야함. 그래야지 normal default action이 실행되지 않는다.
    });

    //🔷navbar
    //navbar 클릭시 smooth하게 scroll하게 만들기
    $('#navigation li a').click(function(event){
        //바로 화면 내려가는 것 못하게 막기
        event.preventDefault();

        var targetElement = $(this).attr("href");
        //각각의 navigation의 a태그의 위치값
        var targetPosition = $(targetElement).offset().top;
        //animation 적용
        $('html, body').animate(
            {
                scrollTop: targetPosition - 50,
            },  'slow', 0, function(){
                //모바일 화면에서 화면 가리는 것때문에 collapse를 함.
                //🔴버그 수정
                //맨 처음 화면에서 제대로 작동하지 않음. 예를들어 stats을 누르면 stats section으로 가야하는데 stats section의 일부분을 가림.
                //callback function을 통해 동작순서를 정해줌.
                // $('.navbar-collapse').collapse('toggle');
                //그냥 지움. animation과 관련된 버그 수정하는데 쓸데없는 시간 소모가 많음
            });


    });


    //fixed navbar 만들기
    const nav = $("#navigation");
    const navTop = nav.offset().top; //로직: nav를 넘어서는 부분부터 position을 fixed로 바꾼다. when to add, or to remove class
    $(window).on("scroll", stickyNavigation);

    function stickyNavigation(){

        let body = $("body");

        if($(window).scrollTop() >= navTop){
            //패딩을 추가한다. fixed-bar로 바뀌는 부분부터 컨텐츠가 아래로 내려갈 때 더 부드러운 effect를 주기 위함이다. 지금은 점프함.
            body.css("padding-top", nav.outerHeight() + "px");
            // body.css("padding-top", nav.outerHeight() + "px");
            body.addClass("fixedNav");
        } else {
            body.css("padding-top", 0);
            body.removeClass("fixedNav");
        }

    }

});