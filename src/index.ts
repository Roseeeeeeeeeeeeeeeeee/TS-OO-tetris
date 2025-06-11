import { SquareGroup } from "./core/SquareGroup";
import { createTeris } from "./core/teris";

import { SquarePageViewer } from "./core/Viewers/SquarePageViewer";
import $ from 'jquery'
const teris = createTeris({
    x:2,
    y:2
})
teris.squares.forEach((sq)=>{
    sq.viewer = new SquarePageViewer(sq,$('#root'))
})
$("#left").on('click',()=>{

    teris.centerPoint = {
        x:teris.centerPoint.x-1,
        y:teris.centerPoint.y
    }
})
$("#right").on('click',()=>{

    teris.centerPoint = {
        x:teris.centerPoint.x+1,
        y:teris.centerPoint.y
    }
})
$("#up").on('click',()=>{

    teris.centerPoint = {
        x:teris.centerPoint.x,
        y:teris.centerPoint.y - 1
    }
})
$("#down").on('click',()=>{

    teris.centerPoint = {
        x:teris.centerPoint.x,
        y:teris.centerPoint.y+1
    }
})