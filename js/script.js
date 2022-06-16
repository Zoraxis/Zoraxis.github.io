

const canvas = document.getElementById('mainCanvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

c.fillRect(0, 0, canvas.width, canvas.height);

let gravity = 0.5;
let plSpeed = 0.03;
let jumpsCount = 1;
let jumpsLeft = 1;

class Sprite{
    constructor({position,velocity}){
        this.position = position;
        this.velocity = velocity

        this.height = 150;
    }

    draw(){
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update(){
        this.draw();
        

        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }
        else{ 
            this.velocity.y = 0;
            jumpsLeft = jumpsCount;
        }

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
}

const player = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    }
});

const enemy = new Sprite({
    position:{
        x: canvas.width/2,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    }
});

let keys = {
    a: {
        pressed : false
    },
    d: {
        pressed : false
    },
    w:{
        pressed : false
    }
}


function animate(){
    window.requestAnimationFrame(animate);
    //canvas.width = innerWidth;
    //canvas.height = innerHeight;

    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width,canvas.height);
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
    if(keys.d.pressed == keys.a.pressed){
        if(player.velocity.x > 0){
            player.velocity.x -= plSpeed;
        }
        else if(player.velocity.x < 0){
            player.velocity.x +=plSpeed;
        }
    }
    if(player.velocity.x > 0 && player.velocity.x < 0.02) player.velocity.x = 0;
    //console.log(player.velocity.x);
    console.log(jumpsLeft);
    
}
animate();

window.addEventListener('keydown', (event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'w':
            if(jumpsLeft > 0){
                player.velocity.y = -13;
                jumpsLeft--;
            }
            break;
    }
});
window.addEventListener('keyup', (event)=>{
    switch(event.key){
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