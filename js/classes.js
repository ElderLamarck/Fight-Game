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
        this.imune = false
        this.health = 100
    }

    draw(){
        CONTEXT.fillStyle = this.color
        CONTEXT.fillRect(this.position.x, this.position.y, this.width, this.height)

        //atkbox
        if(this.isAttacking){
            CONTEXT.fillStyle = 'purple'
            CONTEXT.fillRect(this.atkbox.position.x, this.atkbox.position.y, 
                            this.atkbox.width, this.atkbox.height)
        }
    }

    update(){
        this.draw()
        this.atkbox.position.x = this.position.x - this.atkbox.offset.x
        this.atkbox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height >= CANVAS.height){
            this.velocity.y = 0
            this.position.y = CANVAS.height - this.height
            this.lockjump = false
        } else {
            this.velocity.y += GRAVITY
        }

        if(this.position.x + this.width >= CANVAS.width){
            this.position.x = CANVAS.width - this.width
        }
        else if(this.position.x <= 0){
            this.position.x = 0
        }
        
    }

    attack(){
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking = false
        }, 100)
    }
    
}