let timer = false
let inMove = false
let slider = ["cards", "main"];
let currSlider = 1;
let timing = 600;
let currAdvantage = 0;

let slideCount, slideWidth, slideHeight, slideCurr = 1
$(function () {
    setTimeout(() => {
        resizeEvent()
        $("#nav-burger").click(navEvent)
        $(".nav-to").click(navEvent)
        $(".card").on("click touchstart", cardsEvent)
        $("#close-cards").on("click touchstart", cardsEvent);
        updateSliderData(0)
        $(".slider-right-arrow").on("click touchstart", function () {
            move(1);
        });
        $(".slider-left-arrow").on("click touchstart", function () {
            move(-1);
        });
    }, 3)
});
function updateSliderData(p = 0){
    currSlider += p
    slideCurr = 1;
    slideCount = $("#" + slider[currSlider] + "-slider ul img").length;
    slideWidth = $("#" + slider[currSlider] + "-slider ul img").width();
    slideHeight = $("#" + slider[currSlider] + "-slider ul img").height();
    $("#" + slider[currSlider] + "-slider ul").height(slideHeight);
    console.log(`${slideCount} : ${slideHeight} : ${slideWidth}`)
    $("#cards-max").text(slideCount)
    UpdateSlides()
}
function UpdateSlides(){
    $(`#${slider[currSlider]}-slider ul img`).each(function (index){
        $(this).css({left: slideWidth * (index - slideCurr)});
    })
    $("#cards-current").text(slideCurr + 1)
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
    UpdateSlides()

    $(`#${slider[currSlider]}-slider.slider ul img`).each(function (index){
        $(this).stop().animate({
            left: slideWidth * (index - slideCurr - dir)
        },{duration: timing});
    }), 
    setTimeout(function () {
        inMove = false
        slideCurr += dir;
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
    document.title = $(window).height()
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
