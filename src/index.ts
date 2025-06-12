import { SquareGroup } from "./core/SquareGroup";
import { createTeris } from "./core/teris";
import { TerisRule } from "./core/terisRule";
import { MoveDirection } from "./core/types";


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
    TerisRule.moveToEnd(teris,MoveDirection.left)
    // teris.centerPoint = {
    //     x:teris.centerPoint.x-1,
    //     y:teris.centerPoint.y
    // }
    
})
$("#right").on('click',()=>{
    TerisRule.move(teris,{
        x:teris.centerPoint.x+1,
        y:teris.centerPoint.y
    })
    
    // teris.centerPoint = {
    //     x:teris.centerPoint.x+1,
    //     y:teris.centerPoint.y
    // }
})
$("#up").on('click',()=>{
    TerisRule.move(teris,MoveDirection.up)
    // teris.centerPoint = {
    //     x:teris.centerPoint.x,
    //     y:teris.centerPoint.y - 1
    // }
})
$("#down").on('click',()=>{

    if(TerisRule.canIMove(teris.shape,{
        x:teris.centerPoint.x,
        y:teris.centerPoint.y+1
    })){
        teris.centerPoint = {
            x:teris.centerPoint.x,
            y:teris.centerPoint.y+1
        }
    }
   
})
$('#rotate').on('click',()=>{
    TerisRule.rotate(teris)
})
