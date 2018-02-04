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
