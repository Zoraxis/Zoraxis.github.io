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
        //   $.ajax(
        //     {
        //         method: 'POST',
        //         url: "https://api.mailgun.net/v3/sandboxcfc72f239b864dd9814fc7a469965f80.mailgun.org/messages",
        //         headers: {
        //             "Authorization": "Basic YXBpOjdlMWU1ZDQ3NmE2OWRjMmVjMzYyOTNmNDBiMWJiOGFkLWIzNmQyOTY5LWI2OTY1OGYw"
        //         },
        //         data: {
        //             from: 'Mailgun Sandbox <postmaster@sandboxcfc72f239b864dd9814fc7a469965f80.mailgun.org>',
        //             to: 'Dr Zork <b.v.o0077@gmail.com>',
        //             subject: 'Hello Dr Zork',
        //             text: 'Congratulations Dr Zork, you just sent an email with Mailgun!  You are truly awesome!'
        //         }
        //     }
        //   ).done(function (response) {
        //     console.log(response);
        //   });

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://api.telegram.org/" + '5136344578:AAEaJb-3IgdmMqAVOnF4x-ux8Do7ED8XOhI' + "/sendMessage",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
          },
          "data": JSON.stringify({
            "chat_id": 835560276,
            "text": 'hi there'
          })
        }
        $.ajax(settings).done(function (response) {
          console.log(response);
        }); 
    })
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
