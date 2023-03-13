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
    $("#order-call-btn").click(function () {
        let error = null;
        const val = $('#number-input').val()
        if(!val.length) error = 'e';
        else if(!/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/.test(val)) error = 'w';

        if(error){
            $(this).prev().css('border', '2px solid red');
            $('#call-help').css('color', 'red').text('Телефон не може бути ' + callStates[error]);
            return;
        }

        const bot = new Bot("5136344578:AAEaJb-3IgdmMqAVOnF4x-ux8Do7ED8XOhI", "733336131");
        bot.sendMessage(val, null, null, false);
    });
    $("#number-input").on('input propertychange', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = '+(' + x[1] + ') ' + x[2] + '-' + x[3] + '-' + x[4] + '-' + x[5];

        $(this).css('border', '1.25px solid #E5E5E5');
        $('#call-help').css('color', 'grey').text(normal);
    });
})

const normal = 'Наприклад: +(380) 97 123 45 67'
const callStates = {
    e: "пустим",
    w: "таким",
}

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
