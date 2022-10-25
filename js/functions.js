function animate(){
    window.requestAnimationFrame(animate)
    CONTEXT.fillStyle = 'black'
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)
    player1.update()
    player2.update()

    if(notOVER){
        if(!player1.imune){
            if(PLAYER1_KEYS.a.pressed && player1.lastkey === 'a'){
                player1.velocity.x = -1 * HORIZONTALDESLOCATION
            } 
            if(PLAYER1_KEYS.d.pressed && player1.lastkey === 'd'){
                player1.velocity.x = HORIZONTALDESLOCATION
            } 
            if(PLAYER1_KEYS.w.pressed && !player1.lockjump){
                player1.lockjump = true
                player1.velocity.y = VERTICALDESLOCATION
            }
            if(PLAYER1_KEYS.e.pressed && player1.velocity.y > 0 && !player1.lockdash){
                activationDash(player1, 'right')
            }
            if(PLAYER1_KEYS.q.pressed && player1.velocity.y > 0 && !player1.lockdash){
                activationDash(player1, 'left')
            }
        }

        if(!player2.imune){
            if(PLAYER2_KEYS.ArrowLeft.pressed && player2.lastkey === 'ArrowLeft'){
                player2.velocity.x = -1 * HORIZONTALDESLOCATION
            } else if(PLAYER2_KEYS.ArrowRight.pressed && player2.lastkey === 'ArrowRight'){
                player2.velocity.x = HORIZONTALDESLOCATION
            } 
            if(PLAYER2_KEYS.ArrowUp.pressed && !player2.lockjump){
                player2.lockjump = true
                player2.velocity.y = VERTICALDESLOCATION
            }
            if(PLAYER2_KEYS.PageDown.pressed && player2.velocity.y > 0 && !player2.lockdash){
                activationDash(player2, 'right')
            }
            if(PLAYER2_KEYS.PageUp.pressed && player2.velocity.y > 0 && !player2.lockdash){
                activationDash(player2, 'left')
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

function activationDash(Object, direction){
    Object.lockdash = true
    Object.lockjump = false
    if(direction === 'right'){
        Object.position.x += 250
    }
    else if(direction === 'left'){
        Object.position.x -= 250
    }
    Object.velocity.y = 0
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
    else if(time === 0 && player1.health < player2.health){
        document.querySelector('#displaytext').innerHTML = 'Player2 wins'
        document.querySelector('#displaytext').style.display = 'flex'
        notOVER = false
    }
    else if(time === 0 && player2.health < player1.health){
        document.querySelector('#displaytext').innerHTML = 'Player1 wins'
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
