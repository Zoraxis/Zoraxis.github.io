function resizeEvent(){
    if(window.orientation == 90){
        $("#landscape").fadeIn("fast")
        $("#landscape-container svg g path").attr("transform", "scale(-1,1)")
        $(document.body).addClass("no-overflow")
    }else if (window.orientation == -90) {
        $("#landscape").fadeIn("fast")
        $("#landscape-container svg g path").attr("transform", "scale(1,1)")
        $(document.body).addClass("no-overflow")
    }
    else {
        $("#landscape").fadeOut("fast")
        $(document.body).removeClass("no-overflow")
    }
}
resizeEvent()
$(window).resize(resizeEvent)