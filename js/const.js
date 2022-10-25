const CANVAS = document.querySelector('canvas')
const CONTEXT = CANVAS.getContext('2d')
const GRAVITY = 1.5
const TOTALWIDTH = 1024
const TOTALHEIGHT = 576

let time = 5

HORIZONTALDESLOCATION = 5
VERTICALDESLOCATION = -25

CANVAS.width = TOTALWIDTH
CANVAS.height = TOTALHEIGHT

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
    },
    'q':{
        pressed: false
    },
    'e':{
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
    },
    'PageUp':{
        pressed: false
    },
    'PageDown':{
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