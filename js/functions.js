function animate(){
    window.requestAnimationFrame(animate)
    CONTEXT.fillStyle = 'black'
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)
    player1.update()
    player2.update()

    if(player1.position.y + player1.height >= CANVAS.height
        || player1.position.x <= 0 
        || player1.position.x + player1.width >= CANVAS.width){
        player1.velocity.x = 0
    }
    if(player2.position.y + player2.height >= CANVAS.height
        || player2.position.x <= 0 
        || player2.position.x + player2.width >= CANVAS.width){
        player2.velocity.x = 0
    }

    if(notOVER){
        if(!player1.imune){
            if(PLAYER1_KEYS.a.pressed && player1.lastkey === 'a'){
                player1.velocity.x = -7
            } else if(PLAYER1_KEYS.d.pressed && player1.lastkey === 'd'){
                player1.velocity.x = 7
            } if(PLAYER1_KEYS.w.pressed && !player1.lockjump){
                player1.lockjump = true
                player1.velocity.y = -20
            }
        }

        if(!player2.imune){
            if(PLAYER2_KEYS.ArrowLeft.pressed && player2.lastkey === 'ArrowLeft'){
                player2.velocity.x = -7
            } else if(PLAYER2_KEYS.ArrowRight.pressed && player2.lastkey === 'ArrowRight'){
                player2.velocity.x = 7
            } if(PLAYER2_KEYS.ArrowUp.pressed && !player2.lockjump){
                player2.lockjump = true
                player2.velocity.y = -20
            }
        }

        //detect colision
        if(colisionATCK(player1, player2) && player1.isAttacking && !player2.imune){
            player2.health -= 10
            document.querySelector('#player2Health').style.width = player2.health + '%'
            player1.isAttacking = false
            player2.imune = true
            imunityFrame(player1, player2)
        }
        if(colisionATCK(player2, player1) && player2.isAttacking && !player1.imune){
            player1.health -= 10
            document.querySelector('#player1Health').style.width = player1.health + '%'
            player2.isAttacking = false
            imunityFrame(player2, player1)
        }
        direction(player1, player2)
        direction(player2, player1)

    }
}

function imunityFrame(attacker, victim){
    let originalColor = victim.color
    victim.imune = true
    victim.color = 'green'
        setTimeout(()=>{
            victim.imune = false
            victim.color = originalColor
        }, 250)
    if(attacker.atkbox.offset.x <= 0){
        victim.velocity.x += 40
        victim.velocity.y -= 20
    }
    else if(attacker.atkbox.offset.x >= 0){
        victim.velocity.x -= 40
        victim.velocity.y -= 20
    }
}

function direction(Object1, Object2){
    if((Object1.position.x + Object1.width)/2 > (Object2.position.x + Object2.width)/2){
        Object1.atkbox.offset.x = 50
    } 
    else if((Object1.position.x + Object1.width)/2 == (Object2.position.x + Object2.width)/2){
        if(Object1.position.x > CANVAS.width/2){
            Object1.atkbox.offset.x = 50
        }
        else if(Object1.position.x < CANVAS.width/2){
            Object1.atkbox.offset.x = 0
        }
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
    else if(time === 0 || player1.health <= 0){
        document.querySelector('#displaytext').innerHTML = 'Player2 wins'
        document.querySelector('#displaytext').style.display = 'flex'
        notOVER = false
    }
    else if(time === 0 || player2.health <= 0){
        document.querySelector('#displaytext').innerHTML = 'Player1 wins'
        document.querySelector('#displaytext').style.display = 'flex'
        notOVER = false
    }
    setTimeout(endGame, 1)
}
