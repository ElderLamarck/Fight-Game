const CANVAS = document.querySelector('canvas')
const CONTEXT = CANVAS.getContext('2d')
const GRAVITY = 1
const TOTALWIDTH = 1024
const TOTALHEIGHT = 576

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

const player1 = new sprite({
    position:{
        x: 5,
        y: 100
    },
    velocity:{
        x: 0,
        y: 10
    },
    color: 'red',
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