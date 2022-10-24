const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const gravity = 1
let notOVER = true

const PLAYER1_KEYS = {
    'a':{
        pressed: false

    },
    'd':{
        pressed: false
    },
    'w':{
        pressed: false
    },
    's':{
        pressed: false
    }
}
const PLAYER2_KEYS = {
    'ArrowLeft':{
        pressed: false
    },
    'ArrowRight':{
        pressed: false
    },
    'ArrowUp':{
        pressed: false
    },
    'ArrowDown':{
        pressed: false
    }
}

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

class sprite {
    constructor({position, velocity, color = 'red', offset}){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lockjump = false
        this.lastkey
        this.atkbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking = false
        this.health = 100
    }

    draw(){
        context.fillStyle = this.color
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

        //atkbox
        if(this.isAttacking){
            context.fillStyle = 'purple'
            context.fillRect(this.atkbox.position.x, this.atkbox.position.y, this.atkbox.width, this.atkbox.height)
        }
    }

    update(){
        this.draw()
        this.atkbox.position.x = this.position.x - this.atkbox.offset.x
        this.atkbox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height >= canvas.height){
            this.velocity.y = 0
            this.position.y = canvas.height - this.height
            this.lockjump = false
        } else {
            this.velocity.y += gravity
        }
        
    }

    attack(){
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking = false
        }, 100)
    }
    
}

const player1 = new sprite({
    position:{
        x: 0,
        y: 100
    },
    velocity:{
        x: 0,
        y: 10
    },
    color: 'yellow',
    offset:{
        x: 0,
        y: 0
    }
})

const player2 = new sprite({
    position:{
        x: 970,
        y: 100
    },
    velocity:{
        x: 0,
        y: 10
    },
    color: 'blue',

    offset:{
        x: 50,
        y: 0
    }
})

player1.draw()
player2.draw()

function animate(){
    if(notOVER){
        window.requestAnimationFrame(animate)
    }
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player1.update()
    player2.update()

    player1.velocity.x = 0
    player2.velocity.x = 0

    if(PLAYER1_KEYS.a.pressed && player1.lastkey === 'a'){
        if(player1.position.x >= 0 ){
            player1.velocity.x = -5
        }
    } else if(PLAYER1_KEYS.d.pressed && player1.lastkey === 'd'){
        if(player1.position.x + player1.width <= canvas.width){
            player1.velocity.x = 5
        }
    } if(PLAYER1_KEYS.w.pressed && !player1.lockjump){
        player1.lockjump = true
        player1.velocity.y = -20
    }

    if(PLAYER2_KEYS.ArrowLeft.pressed && player2.lastkey === 'ArrowLeft'){
        if(player2.position.x >= 0){
            player2.velocity.x = -5
        }
    } else if(PLAYER2_KEYS.ArrowRight.pressed && player2.lastkey === 'ArrowRight'){
        if(player2.position.x + player2.width <= canvas.width){
            player2.velocity.x = 5
        }
    } if(PLAYER2_KEYS.ArrowUp.pressed && !player2.lockjump){
        player2.lockjump = true
        player2.velocity.y = -20
    }

    //detect colision
    if(colisionATCK(player1, player2) && player1.isAttacking){
        player2.health -= 10
        document.querySelector('#player2Health').style.width = player2.health + '%'
        player1.isAttacking = false
    }
    if(colisionATCK(player2, player1) && player2.isAttacking){
        player1.health -= 10
        document.querySelector('#player1Health').style.width = player1.health + '%'
        player2.isAttacking = false
    }

    direction(player1, player2)
    direction(player2, player1)

}

function direction(Object1, Object2){
    if((Object1.position.x + Object1.width)/2 >= (Object2.position.x + Object2.width)/2){
        Object1.atkbox.offset.x = 50
    } else {
        Object1.atkbox.offset.x = 0
    }
}

function colisionATCK(Object1, Object2){
    return Object1.atkbox.position.x + Object1.atkbox.width >= Object2.position.x &&
        Object1.atkbox.position.x <= Object2.position.x + Object2.width &&
        Object1.atkbox.position.y + Object1.atkbox.height >= Object2.position.y &&
        Object1.atkbox.position.y <= Object2.position.y + Object2.height
}

let time = 60
function decreseTimer(){
    if(time > 0 && notOVER){
        setTimeout(decreseTimer, 1000)
        time--
        document.querySelector('#timer').innerHTML = time
    }
}
function endGame(){
    if(time === 0 && player1.health === player2.health){
        document.querySelector('#displaytext').innerHTML = 'Tie'
        document.querySelector('#displaytext').style.display = 'flex'
        notOVER = false
    }
    else if(player1.health <= 0){
        document.querySelector('#displaytext').innerHTML = 'Player2 wins'
        document.querySelector('#displaytext').style.display = 'flex'
        notOVER = false
    }
    else if(player2.health <= 0){
        document.querySelector('#displaytext').innerHTML = 'Player1 wins'
        document.querySelector('#displaytext').style.display = 'flex'
        notOVER = false
    }
    setTimeout(endGame, 1)
}
endGame()
decreseTimer()
animate()

window.addEventListener('keydown', event =>{
    if(Object.keys(PLAYER1_KEYS).includes(event.key)){
        PLAYER1_KEYS[event.key].pressed = true
        if(event.key !== 'w' && event.key !== 's'){
            player1.lastkey = event.key
        }
        if(event.key === 's'){
            player1.attack()
        }
    }
    if(Object.keys(PLAYER2_KEYS).includes(event.key)){
        PLAYER2_KEYS[event.key].pressed = true
        if(event.key !== 'ArrowUp' && event.key !== 'ArrowDown'){
            player2.lastkey = event.key
        }
        if(event.key === 'ArrowDown'){
            player2.attack()
        }
    }
})

window.addEventListener('keyup', event =>{
    if(Object.keys(PLAYER1_KEYS).includes(event.key)){
        PLAYER1_KEYS[event.key].pressed = false
    }
    if(Object.keys(PLAYER2_KEYS).includes(event.key)){
        PLAYER2_KEYS[event.key].pressed = false
    }
})
