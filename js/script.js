$(function () {
    $("#icon svg").css({
        transform: `scale(${$(window).width() / 1920})`,
    })
    $("#placeholder-icon").css({
        transform: `scale(${$(window).width() / 1920})`,
    })

    var flag = false;
    $("#plan-detailed-btn").bind("click touchstart", function () { 
        if(flag) return;
        flag = true;
        $(".plan-full").slideToggle("fast")
        setTimeout(function(){ flag = false; }, 300);
    })
})