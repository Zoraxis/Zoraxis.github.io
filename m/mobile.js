let timer = false
let inMove = false
let slider = ["cards", "main"]
let currSlider = 1
let timing = 600
let currAdvantage = 0
let cardCurr = 1


let slideCount, slideWidth, slideHeight, slideCurr = 0
$(function () {
    setTimeout(() => {
        resizeEvent()
        $("#nav-burger").click(navEvent)
        $(".nav-to").click(navEvent)
        $(".card").on("click touchstart", () => {touchCallback = cardsEvent})
        $("#close-cards").on("click touchstart", cardsEvent);
        updateSliderData(0)
        $(".slider-right-arrow").on("click touchstart", function () {
            move(1);
        });
        $(".slider-left-arrow").on("click touchstart", function () {
            move(-1);
        });

        let flag = false
        $(".dark-bg").on("click touchstart", function () {
            if(flag) return;
            flag = true;
            $(".facts-overlay").fadeOut("fast");
            $(`.active-fact-inf`).fadeOut().removeClass("active-fact-inf");
            setTimeout(function(){ flag = false; }, 300)
        })
        $(".adv2-inf").on("click touchstart", function () {
            if(flag) return;
            flag = true;
            $(`#f${$(this).parent().parent().data("fact")}`).fadeIn().addClass("active-fact-inf");
            $(".facts-overlay").fadeIn("fast");
            setTimeout(function(){ flag = false; }, 300)
        })
        

        $(document.body).on("touchstart", function(e){
            touchStart = e.originalEvent.touches[0].pageY
            touchEnd = -1
        })
        $(document.body).on("touchend", function(e){
            touch = false
            touchEnd = e.changedTouches[0].pageY
            if(touchCallback != null){
                if(touchEnd <= touchStart + threshhold && touchEnd >= touchStart - threshhold) {
                    touchCallback()
                }
            }
            touchCallback = null
            touchStart = -1
        })
    }, 3)
});

let touchEnd = -1;
let touchStart = -1;
let touchCallback = null;
let threshhold = 5

function updateSliderData(p = 0){
    currSlider += p
    slideCurr = 0;
    cardCurr = 1;
    slideCount = $("#" + slider[currSlider] + "-slider ul img").length;
    slideWidth = $("#" + slider[currSlider] + "-slider ul img").width();
    slideHeight = $("#" + slider[currSlider] + "-slider ul img").height();
    $("#" + slider[currSlider] + "-slider ul").height(slideHeight);
    console.log(`${slideCount} : ${slideHeight} : ${slideWidth}`)
    $("#cards-max").text(slideCount)
    UpdateSlides()
}
function UpdateSlides(d = 0){
    $(`#${slider[currSlider]}-slider ul img`).each(function (index){
        $(this).css({left: slideWidth * (index - slideCurr)});
    })
    if(cardCurr + d == 0) cardCurr = slideCount + 1
    if(cardCurr + d == slideCount + 1) cardCurr = 0
    $(".active-card-info").removeClass("active-card-info").fadeOut("fast", () => {
        $(`#${cardCurr + d}.card-info`).addClass("active-card-info").fadeIn("fast")
    })
    $("#cards-current").text(cardCurr + d)
}
function move(dir = 0){
    if(inMove) return;
    inMove = true;

    if(slideCurr + dir == -1) {
        $(`#${slider[currSlider]}-slider.slider ul img:last`).prependTo( $(`#${slider[currSlider]}-slider.slider ul`) )
        slideCurr++;
    }
    else if(slideCurr + dir == slideCount){
        $(`#${slider[currSlider]}-slider.slider ul img:first`).appendTo( $(`#${slider[currSlider]}-slider.slider ul`) )
        slideCurr--;
    }
    UpdateSlides(dir)

    $(`#${slider[currSlider]}-slider.slider ul img`).each(function (index){
        $(this).stop().animate({
            left: slideWidth * (index - slideCurr - dir)
        },{duration: timing});
    }), 
    setTimeout(function () {
        inMove = false
        slideCurr += dir;
        cardCurr += dir;
    }, timing);
}

function cardsEvent() {
    if (timer) return;
    $("#cards-overlay").fadeToggle("fast")
    $(document.body).toggleClass("no-overflow")
    updateSliderData(currSlider == 1 ? -1 : 1)
    // if($(this).hasClass("mb28")) 
    launchTimer(500)
}
function launchTimer(time) {
    timer = true
    setTimeout(() => {
        timer = false
    }, time)
}

function navEvent() {
    $("#nav-burger").toggleClass("active")
    $("#nav-collapsed").slideToggle();
}
function resizeEvent() {
    $("#landscape-container").css({
        top: (($(window).height() - $("#landscape-container").height()) / 2)
    })

    if (Math.abs(window.orientation) == 90) {
        $("#landscape").fadeIn(0)
        let scale = -1;
        if (window.orientation == -90) scale = -1
        $("#landscape-container svg g path").attr("transform", `scale(${scale},1)`)
        $(document.body).addClass("no-overflow")
    } else if (window.orientation == -90) {
        $("#landscape").fadeIn(0)
        $("#landscape-container svg g path").attr("transform", "scale(1,1)")
        $(document.body).addClass("no-overflow")
    } else {
        $("#landscape").fadeOut("fast")
        $(document.body).removeClass("no-overflow")
    }
}
$(window).resize(resizeEvent)

function check(){
    requestAnimationFrame(check)
    console.log(touchCallback)
    document.title = touchCallback == null ? "no" : "yes"
}
check()