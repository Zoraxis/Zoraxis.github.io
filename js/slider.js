let imgs = $(".slider-img")
let curr = 2;
let init = false;

// let defWidth = 33.3333;
// let bigWidth = 40;
let coef = ($(window).width() / 1920);
let defWidth = (1693  * coef) / 3;
let bigWidth = defWidth + (defWidth * 0.35);
coef = ($(window).height() / 961);
let baseHeight = 320 * coef;
let bigHeight = 410 * coef;

let topSmall = (bigHeight - baseHeight) / 2;

let inMove = false;
let round = 1;

$(function () {
    imgs.each(function (index) {
        $(this).attr('id', (index + 1))
        $(this).css({
            width: `${defWidth}px`,
            height: `${baseHeight}px`,
            left: `${index * defWidth}px`,
            top: `${topSmall}px`
        })
        if (index + 1 == curr) {
            $(this).css({
                width: `${bigWidth}px`,
                height: `${bigHeight}px`,
                left: `${index * defWidth - ((bigWidth - defWidth) / 2)}px`,
                zIndex: 2,
                top: "0%"
            })
        }
    });
    resizeEvent()
});

function resizeEvent(){
    setTimeout(() => {
        $(".slider-shadow").css({
            height: imgs.eq(curr - 2).height(),
            top: (topSmall + "px")
        })
        $(".slider-arrow").css({
            top: (((imgs.eq(curr - 1).height() * 0.5) - ($(".slider-arrow").height() / 2)) + "px")
        })
    }, 5)
    
}
$( window ).resize(resizeEvent)

function UpdateSlides(move) {
    if (inMove) return;
    let timing = 900;
    inMove = true;
    let clone = null;
    let prev = 0;

    if (curr + move == 1) {
        $('.slider').prepend($(".slider-img:last-child").clone());
        clone = $(".slider-img:last-child");
        $('.slider-img:first-child').css({
            left: `${-defWidth}px`
        })
        imgs = $('.slider-img')
        curr++;
        imgs.each(function (index) {
            $(this).attr('id', (index + 1))
        });
    } else if (curr + move == imgs.length) {
        $('.slider').append($(".slider-img:first-child").clone())
        clone = $(".slider-img:first-child");
        $('.slider-img:last-child').css({
            left: `${defWidth * 3}px`
        })
        imgs = $('.slider-img')
        prev = -1;
        imgs.each(function (index) {
            if (index == 0) index--;
            else $(this).attr('id', (index + 1))
        });
    }

    $("#" + (curr + move)).animate({
        width: `${bigWidth}px`,
        height: `${bigHeight}px`,
        top: `-=${topSmall}px`,
    }, {
        start: function () {
            $(this).css("z-index", "2")
        },
        duration: timing,
        queue: false
    })
    $("#" + (curr)).animate({
        width: `${defWidth}px`,
        height: `${baseHeight}px`,
        top: `+=${topSmall}px`
    }, {
        start: function () {
            $(this).css("z-index", "1")
        },
        duration: timing,
        queue: false
    })
    imgs.each(function (index) {
        let left = ((index + 2 + -move) - curr) * defWidth;
        if (index + 1 == curr + move) left -= (bigWidth - defWidth) / 2;
        $(this).animate({
            left: `${left}px`,
        }, {
            duration: timing,
            queue: false,
        })
    })
    setTimeout(() => {
        curr += move;
        inMove = false;
        if (clone != null) clone.remove()
        clone = null;
        imgs = $('.slider-img')
        imgs.each(function (index) {
            $(this).attr('id', (index + 1))
        });
        if (prev === -1) {
            curr--;
            prev = 0;
        }
    }, 900)
}

function left() {
    UpdateSlides(-1)
}

function right() {
    UpdateSlides(1)
}