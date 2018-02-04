const Canvas = require('canvas')
const GifEncoder = require('gifencoder')
const fs = require('fs')
class CircleToPolygonGif {
    constructor(n,w,h) {
        this.n = n
        this.w = w
        this.h = h
        this.gifEncoder = new GifEncoder(w,h)
        this.canvas = new Canvas()
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.context = this.canvas.getContext('2d')
        this.renderer = new Renderer()
        this.circleToPolygon = new CircleToPolygon(w/2,h/2,Math.min(w,h)*0.4,n,(context)=>{
            this.gifEncoder.addFrame(context)
        })
    }
    draw(color) {
        this.gifEncoder.setQuality(100)
        this.gifEncoder.setDelay(130)
        this.gifEncoder.setRepeat(0)
        this.gifEncoder.start()

        this.renderer.render((scale)=>{
            this.context.fillStyle = '#212121'
            this.context.fillRect(0,0,this.w,this.h)
            this.circleToPolygon.draw(this.context,scale,color)
        })
        this.gifEncoder.finish()
        return this
    }
    save(fileName) {
        this.gifEncoder.createReadStream().pipe(fs.createWriteStream(fileName))
        return this
    }
    static build(n,w,h) {
        return new CircleToPolygonGif(n,w,h)
    }
}
class CircleToPolygon {
    constructor(x,y,r,n,cb) {
        this.x = x
        this.y = y
        this.r = r
        this.n = n
        this.cb = cb
    }
    draw(context,scale,color) {
        if(this.n > 0) {
            context.strokeStyle = color
            context.lineWidth = this.r/15
            context.lineCap = 'round'
            const gap = 360/this.n
            const start = 90 - gap/2
            const x_final = this.r*Math.sin((gap/2)*Math.PI/180), y_final = this.r*Math.cos((gap/2)*Math.PI/180)
            context.save()
            context.translate(this.x,this.y)
            for(var i=0;i<this.n;i++) {
                context.save()
                context.rotate(gap*Math.PI/180*i)
                context.beginPath()
                for(var j = start;j<=start+gap;j++) {
                    const x = (this.r)*Math.cos(j*Math.PI/180), y = (y_final)*scale+(this.r)*(1-scale)*Math.sin(j*Math.PI/180)
                    if(j == start) {
                        context.moveTo(x,y)
                    }
                    else {
                        context.lineTo(x,y)
                    }
                }
                context.stroke()
                context.restore()
            }
            context.restore()
            if(this.cb) {
                this.cb(context)
            }
        }
    }
}
class Renderer {
    constructor() {
        this.scale = 0
        this.deg = 0
        this.t = 0
    }
    renderCb(cb) {
        this.scale = Math.abs(Math.sin(this.deg))
        if(cb) {
            cb(this.scale)
        }
    }
    render(cb) {
        while(this.deg <= Math.PI/2 && this.t <= 20) {
            this.t++
            if(this.t > 4 && this.t < 16) {
                this.deg += Math.PI/24
            }
            this.renderCb(cb)
        }
        while(this.deg < Math.PI) {
            this.deg += Math.PI/12
            this.renderCb(cb)
        }
    }
}
const createCircleToPolygon = (n,w,h,color,fileName) => {
    CircleToPolygonGif.build(n,w,h).save(fileName).draw(color)
}
module.exports = createCircleToPolygon
