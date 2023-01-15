let imgs = $(".slider-img")
let curr = 2;
let init = false;

let defWidth = 33.3333;
let bigWidth = 40;
let defHeight = 9;

// [...imgs].forEach(x => {
//     x.id = id;
//     place(id - curr, (id - curr + 1) * 50 , id == curr ? 2 : 1);
//     id++;
// });

// function getCurr(move = 0) { 
//     if(curr + move - 1 <= -1) return imgs.length + (curr + move) - 1;
//     else if(curr + move - 1 == imgs.length) return (curr + move) % imgs.length
//     else return curr + move - 1;
// }
// function place(offset, left, scale){
//     let real = getCurr(offset);
//     imgs[real].style.left = left + "%"
//     imgs[real].style.transform = `translate(-${left}%, 0%)`;

//     if(scale == 2){
//         imgs[real].style.width = "40.224%";
//         imgs[real].style.zIndex = "2";
//     }
//     else {
//         imgs[real].style.width = "31.423%";
//         imgs[real].style.top = "12%";
//     }
// }

// let anims = []
// let readyList = []
// let confirm = [];
// function animateMove(){
//     if(anims.length <= 0) return;
//     else requestAnimationFrame(animateMove);

//     anims.forEach(anim =>{
//         let elem = imgs[getCurr(anim.offset)]
//         if(anim.initScale == 0){
//             if(readyList.findIndex(x => x.id == anim.readyIndex) == -1) {
//                 readyList.push({
//                     id: anim.readyIndex,
//                     ready: false
//                 });
//             }
            
//             anim.initScale = parseFloat(elem.style.left.substring(0, elem.style.left.indexOf("%")));
//             // anim.initTransform = parseFloat(elem.style.left.substring(0, elem.style.left.indexOf("%")));
//             anim.initTransform = elem.style.transform;
//         }
//         elem.style.left = (anim.initScale + ((anim.scale / anim.maxTimer) * anim.timer)) + "%";
//         elem.style.transform = `translate(${(-anim.initScale + ((anim.scale / anim.maxTimer) * anim.timer))}%, 0%)`;
//         console.log(elem.style.left + " : " + elem.style.transform)
//         if(anim.maxTimer == anim.timer){
//             readyList.find(x => x.id == anim.readyIndex).ready = true;
//             anims.splice(anims.findIndex(x => x.offset == anim.offset), 1)
//         }
//         anim.timer++;
//     })
// }

// let scales = []
// function animateScale() { 
//     if(scales.length <= 0) return;
//     else requestAnimationFrame(animateScale);

//     scales.forEach(scale => {
//         let elem = imgs[getCurr(scale.offset)]
//         if(scale.initScale == 0){
//             readyList.push({
//                 id: scale.readyIndex,
//                 ready: false
//             });
//             scale.initScale = parseFloat(elem.style.width.substring(0, elem.style.width.indexOf("%")));
//         }
//         elem.style.width = (scale.initScale + ((scale.scale / scale.maxTimer) * scale.timer)) + "%";
//         if(Math.abs(scale.scale) != scale.scale) elem.style.top = ((12 / scale.maxTimer) * scale.timer) + "%";
//         else elem.style.top = ((12 / scale.maxTimer) * (scale.maxTimer - scale.timer)) + "%";
//         if(scale.maxTimer == scale.timer){
//             readyList.find(x => x.id == scale.readyIndex).ready = true;
//             scales.splice(scales.findIndex(x => x.offset == scale.offset), 1)
//         }
//         scale.timer++;
//     })
// }
// let ready = true;
// let add = 0;
// function wait(){
//     ready = (readyList.findIndex(x => x.ready == false) == -1);
//     if (!ready) requestAnimationFrame(wait)
//     else{
//         curr -= add;
//         console.log(curr);
//         readyList = [];
//     }
// }
// function UpdateSlider(move){
//     let readyId = 0;
//     add = move;
//     for(let i = curr - imgs.length; i <= imgs.length - curr; i++){
//         anims.push({
//             offset: i,
//             timer: 0,
//             maxTimer: 150,
//             scale: 50 * move,
//             initScale: 0,
//             initTransform: 0,
//             readyIndex: readyId
//         })
//         readyId++;
//     }
//     scales.push({
//         offset: 0,
//         timer: 0,
//         maxTimer: 150,
//         scale: -8.801,
//         initScale: 0,
//         readyIndex: readyId
//     })
//     readyId++;
//     scales.push({
//         offset: -move,
//         timer: 0,
//         maxTimer: 150,
//         scale: 8.801,
//         initScale: 0,
//         readyIndex: readyId
//     })
//     readyId++;
//     animateMove()
//     animateScale()
//     imgs[curr - move -1].style.zIndex = "2"
//     imgs[curr - 1].style.zIndex = "1"
//     ready = false;
//     wait();
// }
// function right(){
//     if(ready) UpdateSlider(-1)
// }
// function left() { 
//     if(ready) UpdateSlider(1)
// }
// document.addEventListener("keydown", function(e){
//     if(e.key.toLowerCase() == "d") right()
//     if(e.key.toLowerCase() == "a") left()
// })

imgs.each(function (index) {
    $(this).attr('id', (index + 1))
    $(this).css({
        width: `${defWidth}%`,
        left: `${index * defWidth}%`,
        top: `${defHeight}%`
    })
    if(index + 1 == curr){
        $(this).css({
            width: `${bigWidth}%`,
            left: `${index * defWidth - ((bigWidth - defWidth) / 2)}%`,
            zIndex: 2,
            top: "0%"
        })
    }
});

let inMove = false;
let round = 1;
function UpdateSlides(move){
    if (inMove) return;
    let timing = 900;
    inMove = true;
    let clone = null;
    let prev = 0;

    if(curr + move == 1){
        $('.slider').prepend( $(".slider-img:last-child").clone() );
        clone = $(".slider-img:last-child");
        $('.slider-img:first-child').css({left: `${-defWidth}%`})
        imgs = $('.slider-img')
        curr++;
        imgs.each(function (index) {
            $(this).attr('id', (index + 1))
        });
    }
    else if(curr + move == imgs.length){
        $('.slider').append( $(".slider-img:first-child").clone())
        clone = $(".slider-img:first-child");
        $('.slider-img:last-child').css({left: `${defWidth * 3}%`})
        imgs = $('.slider-img')
        // curr--;
        prev = -1;
        imgs.each(function (index) {
            if(index == 0) index--;
            else $(this).attr('id', (index + 1))
        });
    }

    $("#" + (curr + move)).animate({
        width: `${bigWidth}%`,
        top: `-=${defHeight}%`,
    }, {
        start: function () { $(this).css("z-index", "2") },
        duration: timing,
        queue: false
    })
    $("#" + (curr)).animate({
        width: `${defWidth}%`,
        top: `+=${defHeight}%`
    }, {
        start: function () { $(this).css("z-index", "1") },
        duration: timing,
        queue: false
    })
    imgs.each(function (index){
        let left = ((index + 2 + -move) - curr) * defWidth;
        if(index + 1 == curr + move) left -= (bigWidth - defWidth) / 2;
        $(this).animate({
            left: `${left}%`,
        }, {
                duration: timing,
                queue: false,
            }
        )
    })
    setTimeout(() => {
        curr += move;
        inMove = false;
        if(clone != null) clone.remove()
        clone = null;
        imgs = $('.slider-img')
        imgs.each(function (index) {
            $(this).attr('id', (index + 1))
        });
        if(prev === -1) {
            curr--;
            prev = 0;
        }
    }, 900)
}

function left(){
    UpdateSlides(-1)
}
function right(){
    UpdateSlides(1)
}
document.addEventListener('keydown', function(e){
    if(e.key == 'a') left()
    if(e.key == 'd') right()
})