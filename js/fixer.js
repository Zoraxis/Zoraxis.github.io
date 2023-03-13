let baseW = 1920, baseH = 961;
let baseA = baseW / baseH;
let currS, currW, currH, aspect, coefW, coefH;

let fontLow = 1920, fontTop = 1920, fonUpScale = 1.5, fontDownScale = 0.9, fontInterval = 100
$(function() {
    $("[class*='fs']").each(function () {
        $(this).data("f", parseFloat($(this).css('font-size').substr(0, $(this).css('font-size').length - 2)))
    })
        

    $(window).resize(ResizeFix)
    ResizeFix()
});

function ResizeFix() { 
    currW = $(window).width()
    currH = $(window).height()
    currA = currW / currH;
    
    aspect = baseA / currA;
    aspect = Math.floor(aspect * 100) / 100
    coefW = currW / baseW;
    coefH = currH / baseH;

    $(".fix").each(function () { 
        if($(this).data('w')) $(this).width(parseFloat($(this).data('w')) * 1 * coefW)
        if($(this).data('h')) $(this).height(parseFloat($(this).data('h')) * 1 * coefH)
        if($(this).data('g')) $(this).css({gap: parseFloat($(this).data('g')) * coefW})
        if($(this).data('mt')) $(this).css({marginTop: parseFloat($(this).data('mt')) * coefH})
        if($(this).data('ml')) $(this).css({marginLeft: parseFloat($(this).data('ml')) * coefW})
        if($(this).data('mr')) $(this).css({marginRight: parseFloat($(this).data('mr')) * coefW})
        if($(this).data('mb')) $(this).css({marginBottom: parseFloat($(this).data('mb')) * coefH})
        if($(this).data('s')) $(this).css({transform: `scale(${coefW})`})

        $("#icon svg").css({
            transform: `scale(${coefW})`,
        })
    })

    if(currW <= fontLow){
        $("[class*='fs']").each(function () { 
            $(this).css('font-size', $(this).data('f') + ((currW - fontLow) / fontInterval * fontDownScale))
        })
    } else if(currW > fontTop){
        $("[class*='fs']").each(function () { 
            $(this).css('font-size', $(this).data('f') + ((currW - fontTop) / fontInterval * fonUpScale))
        })
    }
}