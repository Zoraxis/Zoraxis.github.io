$(function () {
    $("#plan-detailed-btn").click(function () {
        $(".plan-full").slideToggle("fast")
    });
    $(".nav-to").click(function () {
        scroll($("#" + $(this).data("id")).position().top, 500)
    });
});

function scroll(elementY, duration) { 
    var startingY = window.pageYOffset;
    var diff = elementY + (elementY * 0.15) - startingY;
    var start;

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      var time = timestamp - start;
      var percent = (timestamp - start) / duration

      window.scrollTo(0, startingY + diff * percent);

      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    })
  }