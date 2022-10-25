CANVAS.width = TOTALWIDTH
CANVAS.height = TOTALHEIGHT

let notOVER = true

CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)

endGame()
decreseTimer()
animate()   

window.addEventListener('keydown', event =>{
    if(Object.keys(PLAYER1_KEYS).includes(event.key)){
        PLAYER1_KEYS[event.key].pressed = true
        if(notOVER){
            if(event.key !== 'w' && event.key !== 's'){
                player1.lastkey = event.key
            }
            if(event.key === 's'){
                player1.attack()
            }
        }
    }
    if(Object.keys(PLAYER2_KEYS).includes(event.key)){
        PLAYER2_KEYS[event.key].pressed = true
        if(notOVER){
            if(event.key !== 'ArrowUp' && event.key !== 'ArrowDown'){
                player2.lastkey = event.key
            }
            if(event.key === 'ArrowDown'){
                player2.attack()
            }
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
