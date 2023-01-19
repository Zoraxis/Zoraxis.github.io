let coef = 0.7;
$(".adv2-highlight").each(function () {
    $(this).attr("width", parseFloat($(this).attr("width")) * coef);
    $(this).attr("height", parseFloat($(this).attr("height")) * coef);
})