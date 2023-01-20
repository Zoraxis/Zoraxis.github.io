function resizeEvent(){
    if(window.orientation == 90){
        $("#landscape").fadeIn("fast")
        $("#landscape-container svg g path").attr("transform", "scale(-1,1)")
        document.title = $("#landscape-container svg").attr("transform")
    }else if (window.orientation == -90) {
        $("#landscape").fadeIn("fast")
        $("#landscape-container svg g path").attr("transform", "scale(1,1)")
        document.title = $("#landscape-container svg").attr("transform")
    }
    else $("#landscape").fadeOut("fast")
}
resizeEvent()
$(window).resize(resizeEvent)