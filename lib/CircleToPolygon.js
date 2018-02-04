const Canvas = require('canvas')
const GifEncoder = require('gif-encoder')
const fs = require('fs')
class CircleToPolygonGif {
    constructor(n,fileName,w,h) {
        this.n = n
        this.fileName = fileName
        this.w = w
        this.h = h
        this.gifEncoder = new GifEncoder(w,h)
        this.gifEncoder.setQuality(100)
        this.gifEncoder.setDuration(50)
        this.gifEncoder.setRepeat(0)
        this.canvas = new Canvas()
    }
    draw() {
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.context = this.canvas.getContext('2d')
    }
    save() {
        this.gifEncoder.createReadStream().pipe(fs.createWriteStream(fileName))
    }
    static build(n,fileName,w,h) {
        return new CircleToPolygonGif(n,fileName,w,h)
    }
}
class CircleToPolygon {
    constructor(x,y,r,color,n,cb) {
        this.x = x
        this.y = y
        this.r = r
        this.color = color
        this.n = n
        this.cb = cb
    }
    draw(context,scale) {
        if(n > 0) {
            context.strokeStyle = this.color
            context.lineWidth = this.r/15
            context.lineCap = 'round'
            const gap = 360/this.n
            const start = 90 - gap/2
            const x_final = this.r*Math.sin((gap/2)*Math.PI/180), y_final = this.r*Math.cos((gap/2)*Math.PI/180)
            context.save()
            context.translate(this.x,this.y)
            for(var i=0;i<n;i++) {
                context.save()
                context.rotate(gap*Math.PI/180)
                context.beginPath()
                for(var j = start;j<=start+gap;j++) {
                    const x = (this.r+(x_final - this.r)*scale)*Math.cos(j*Math.PI/180), y = (y_final)*scale+(this.r)*(1-scale)*Math.sin(j*Math.PI/180)
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
                this.cb()
            }
        }
    }
}
