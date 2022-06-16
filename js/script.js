var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
}

if (!isMobile) {
    const canvas = document.getElementById('mainCanvas');
    const c = canvas.getContext('2d');

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    c.fillRect(0, 0, canvas.width, canvas.height);

    let gravity = 0.5;
    let plSpeed = 0.03;
    let jumpsCount = 1;
    let jumpsLeft = 1;

    class Sprite {
        constructor({
            position,
            velocity
        }) {
            this.position = position;
            this.velocity = velocity

            this.height = 150;
        }

        draw() {
            c.fillStyle = 'blue';
            c.fillRect(this.position.x, this.position.y, 50, this.height);
        }

        update() {
            this.draw();


            if (this.position.y + this.height + this.velocity.y <= canvas.height) {
                this.velocity.y += gravity;
            } else {
                this.velocity.y = 0;
                jumpsLeft = jumpsCount;
            }

            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
        }
    }

    const player = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        }
    });

    const enemy = new Sprite({
        position: {
            x: canvas.width / 2,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        }
    });

    let keys = {
        a: {
            pressed: false
        },
        d: {
            pressed: false
        },
        w: {
            pressed: false
        }
    }


    function animate() {
        window.requestAnimationFrame(animate);
        //canvas.width = innerWidth;
        //canvas.height = innerHeight;

        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        player.update();
        enemy.update();

        if (keys.a.pressed != keys.d.pressed) {
            if (keys.a.pressed) {
                if (player.velocity.x > -(canvas.width / 1000)) {
                    if (player.velocity.x > 0) player.velocity.x -= plSpeed * 2;
                    player.velocity.x -= plSpeed * 2.5;
                }
            }
            if (keys.d.pressed) {
                if (player.velocity.x < canvas.width / 1000) {
                    if (player.velocity.x < 0) player.velocity.x += plSpeed * 2;
                    player.velocity.x += plSpeed * 2.5;
                }
            }
        }
        if (keys.d.pressed == keys.a.pressed) {
            if (player.velocity.x > 0) {
                player.velocity.x -= plSpeed;
            } else if (player.velocity.x < 0) {
                player.velocity.x += plSpeed;
            }
        }
        if (player.velocity.x > 0 && player.velocity.x < 0.02) player.velocity.x = 0;
        //console.log(player.velocity.x);
        console.log(jumpsLeft);

    }
    animate();

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                break;
            case 'a':
                keys.a.pressed = true;
                break;
            case 'w':
                if (jumpsLeft > 0) {
                    player.velocity.y = -13;
                    jumpsLeft--;
                }
                break;
        }
    });
    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = false;
                break;
            case 'a':
                keys.a.pressed = false;
                break;
            case 'w':
                keys.w.pressed = false;
                break;
        }
    });
}
else{
    document.body.outerHTML = 
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
	    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700;900&display=swap" rel="stylesheet">
    </head>
    <style>

    body {
        margin: 0px;
    }
    
    #container {
        position: absolute;
        margin: auto;
        width: 100vw;
        height: 80pt;
        top: 0;
        bottom: 0;
        
        filter: url(#threshold) blur(0.6px);
    }
    
    #text1,
    #text2 {
        position: absolute;
        width: 100%;
        display: inline-block;
    
        font-family: "Montserrat", sans-serif;
        font-size: 80pt;
        font-weight: 900;
    
        text-align: center;
    
        user-select: none;
    }
    </style>



    <body>
        <div id="container">
            <span id="text1"></span>
            <span id="text2"></span>
        </div>

    <svg id="filters">
        <defs>
            <filter id="threshold">
                <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140" />
            </filter>
        </defs>
    </svg>
    </body>



    <script>
    const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
    };

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
    elts.text2.style.filter = \`blur(${Math.min(8 / fraction - 8, 100)}px)\`;
    elts.text2.style.opacity = \`${Math.pow(fraction, 0.4) * 100}%\`;

    fraction = 1 - fraction;
    elts.text1.style.filter = \`blur(${Math.min(8 / fraction - 8, 100)}px)\`;
    elts.text1.style.opacity = \`${Math.pow(fraction, 0.4) * 100}%\`;

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
    </script>
    </html>
    `
}