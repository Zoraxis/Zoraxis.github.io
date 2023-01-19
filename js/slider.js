let imgs = $(".slider-img")
let curr = 2;
let init = false;

let defWidth = 33.3333;
let bigWidth = 40;
let defHeight = 9;

let inMove = false;
let round = 1;

$(function () {
    imgs.each(function (index) {
        $(this).attr('id', (index + 1))
        $(this).css({
            width: `${defWidth}%`,
            left: `${index * defWidth}%`,
            top: `${defHeight}%`
        })
        if (index + 1 == curr) {
            $(this).css({
                width: `${bigWidth}%`,
                left: `${index * defWidth - ((bigWidth - defWidth) / 2)}%`,
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
            top: (defHeight + "%")
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
            left: `${-defWidth}%`
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
            left: `${defWidth * 3}%`
        })
        imgs = $('.slider-img')
        prev = -1;
        imgs.each(function (index) {
            if (index == 0) index--;
            else $(this).attr('id', (index + 1))
        });
    }

    $("#" + (curr + move)).animate({
        width: `${bigWidth}%`,
        top: `-=${defHeight}%`,
    }, {
        start: function () {
            $(this).css("z-index", "2")
        },
        duration: timing,
        queue: false
    })
    $("#" + (curr)).animate({
        width: `${defWidth}%`,
        top: `+=${defHeight}%`
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
            left: `${left}%`,
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