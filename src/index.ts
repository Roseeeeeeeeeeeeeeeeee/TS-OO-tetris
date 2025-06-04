import { SquareGroup } from "./core/SquareGroup";
import { SquarePageViewer } from "./core/Viewers/SquarePageViewer";
import $ from 'jquery'
const squareGroup = new SquareGroup([
    {x:0,y:1},{x:0,y:-1},{x:1,y:0},{x:-1,y:0},{x:0,y:0},{x:-2,y:0}
],{x:5,y:5},'red')
squareGroup.squares.forEach((sq)=>{
    sq.viewer = new SquarePageViewer(sq,$('#root'))
})
$("#left").on('click',()=>{

    squareGroup.centerPoint = {
        x:squareGroup.centerPoint.x-1,
        y:squareGroup.centerPoint.y
    }
})
$("#right").on('click',()=>{

    squareGroup.centerPoint = {
        x:squareGroup.centerPoint.x+1,
        y:squareGroup.centerPoint.y
    }
})
$("#up").on('click',()=>{

    squareGroup.centerPoint = {
        x:squareGroup.centerPoint.x,
        y:squareGroup.centerPoint.y - 1
    }
})
$("#down").on('click',()=>{

    squareGroup.centerPoint = {
        x:squareGroup.centerPoint.x,
        y:squareGroup.centerPoint.y+1
    }
})