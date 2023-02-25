let flag = false;
let factId = 0;

$(function () {
    $("#plan-detailed-btn").bind("click", function () {
        callFlag(() => {
            $(".plan-full").slideToggle("fast")
            var txt = $(this).text()
            $(this).text($(this).data("alt"))
                .data("alt", txt)
        })
    })
    $("#adv1-det").bind("click", function () {
        callFlag(() => {
            $(".card-extra").slideToggle(500)
            $("#advs1-grad").fadeToggle()
            var txt = $(this).text()
            $(this).text($(this).data("alt"))
                .data("alt", txt)
        })
    })
    $(".fact").each(function (index) {
        $(this).children().last().attr("id", "f" + index).data("id", index);
    })
    $(".fact").bind("click", function () {
        callFlag(() => {
            let target = $(this).children("div").last()
            factId = target.data("id")
            $("#fact-overlay-name").text(target.text())
            $("#fact-overlay-txt").text(target.data("desc"))
            $("#fact-overlay").fadeIn()
                .next().fadeIn()
        })
    })
    $("#next-fact").bind("click", function () {
        callFlag(() => {
            if (factId + 1 > 11) {
                $(this).parent().fadeOut().next().fadeOut()
            } else {
                let target = $("#f" + (factId + 1));
                $("#fact-overlay-name").text(target.text())
                $("#fact-overlay-txt").text(target.data("desc"))
                factId++;
            }
        })
    })
    $("#nav-burger").click(navEvent)
    $(".nav-to").click(navEvent)
})
function navEvent() { 
    $("#nav-items-collapsed").slideToggle();
}
function callFlag(action) {
    if (flag) return;
    flag = true;
    action();
    setTimeout(() => {
        flag = false;
    }, 300);
}
