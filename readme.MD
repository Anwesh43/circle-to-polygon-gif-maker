## circle-to-polygon-gif-maker

### Nodejs api to create a gif of circle to a n sided polygon visualization.

### Usage

#### require dependency
```
    const circleToPolygonGifMaker = require('circle-to-polygon-gif-maker')
    //circleToPolygonGifMaker(n,width,height,color,fileName) -> n is number of sides of the polygon
    circleToPolygonGifMaker(4,300,300,"#0D47A1",'circle_to_square.gif')
    circleToPolygonGifMaker(3,300,300,"#0D47A1",'circle_to_triangle.gif')
    circleToPolygonGifMaker(5,300,300,"#0D47A1",'circle_to_polygon.gif')
```
