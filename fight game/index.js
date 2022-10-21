const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const gravity = 1
let notOVER = true

const PLAYER_KEYS = {
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
const ENEMY_KEYS = {
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

const player = new sprite({
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

const enemy = new sprite({
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

player.draw()
enemy.draw()

function animate(){
    if(notOVER){
        window.requestAnimationFrame(animate)
    }
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    if(PLAYER_KEYS.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -5
    } else if(PLAYER_KEYS.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 5
    } if(PLAYER_KEYS.w.pressed && !player.lockjump){
        player.lockjump = true
        player.velocity.y = -20
    }

    if(ENEMY_KEYS.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -5
    } else if(ENEMY_KEYS.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5
    } if(ENEMY_KEYS.ArrowUp.pressed && !enemy.lockjump){
        enemy.lockjump = true
        enemy.velocity.y = -20
    }

    //detect colision
    if(colisionATCK(player, enemy) && player.isAttacking){
        enemy.health -= 10
        document.querySelector('#player2Health').style.width = enemy.health + '%'
        player.isAttacking = false
    }
    if(colisionATCK(enemy, player) && enemy.isAttacking){
        player.health -= 10
        document.querySelector('#player1Health').style.width = player.health + '%'
        enemy.isAttacking = false
    }

    direction(player, enemy)
    direction(enemy, player)

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
    setTimeout(endGame, 1)
    if(time === 0 && player.health === enemy.health){
        document.querySelector('#displaytext').innerHTML = 'Tie'
        document.querySelector('#displaytext').style.display = 'flex'
        notOVER = false
    }
    else if(player.health <= 0){
        document.querySelector('#displaytext').innerHTML = 'Player2 wins'
        document.querySelector('#displaytext').style.display = 'flex'
        notOVER = false
    }
    else if(enemy.health <= 0){
        document.querySelector('#displaytext').innerHTML = 'Player1 wins'
        document.querySelector('#displaytext').style.display = 'flex'
        notOVER = false
    }
}
endGame()
decreseTimer()

animate()

window.addEventListener('keydown', event =>{
    if(Object.keys(PLAYER_KEYS).includes(event.key)){
        PLAYER_KEYS[event.key].pressed = true
        if(event.key !== 'w' && event.key !== 's'){
            player.lastkey = event.key
        }
        if(event.key === 's'){
            player.attack()
        }
    }
    if(Object.keys(ENEMY_KEYS).includes(event.key)){
        ENEMY_KEYS[event.key].pressed = true
        if(event.key !== 'ArrowUp' && event.key !== 'ArrowDown'){
            enemy.lastkey = event.key
        }
        if(event.key === 'ArrowDown'){
            enemy.attack()
        }
    }
})

window.addEventListener('keyup', event =>{
    if(Object.keys(PLAYER_KEYS).includes(event.key)){
        PLAYER_KEYS[event.key].pressed = false
    }
    if(Object.keys(ENEMY_KEYS).includes(event.key)){
        ENEMY_KEYS[event.key].pressed = false
    }
})
