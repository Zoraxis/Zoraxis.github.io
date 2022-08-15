let country;
fetch('https://api.ipregistry.co/?key=tryout')
    .then(function (response) {
        return response.json();
    })
    .then(function (payload) {
        //console.log(payload.location.country.name + ', ' + payload.location.city);
        country = payload.location.country.name;
});

    const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
    };

<<<<<<< HEAD
    if(country == 'Germany'){
        const texts = [
            "Handy",
            "ist",
            "Cringe",
            "nehmen",
            "sie",
            "ein",
            "Computer",
            "Bitte",
            ":)"
        ]; 
    }
    else if (country == 'Russia') {
        const texts = [
            "Чё",
            "Как",
            "Бомж",
            "Зайди",
            "С",
            "ПК",
            "Как",
            "Мужик",
            ":)"
        ];
    }
    else{
        const texts = [
            "Why",
            "So",
            "Sad",
            "?",
            "No",
            "PC",
            "Buy",
            "One!",
            ":)"
        ];
    }
=======
    const texts = [
        "Чё",
        "Как",
        "Бомж",
        "Зайди",
        "С",
        "ПК",
        "Как",
        "Чад",
        ":)"
    ];
>>>>>>> dd764fedd4955ee149c8b7d6f806752e9ad6f8bd

    const morphTime = 1;
    const cooldownTime = 0.25;

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
    }

    setMorph(fraction);
    }

    function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
    }

    function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) { if (shouldIncrementIndex) { textIndex++; } doMorph(); } else { doCooldown(); } } animate();