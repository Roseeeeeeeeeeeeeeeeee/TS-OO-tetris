import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/Viewers/SquarePageViewer";
import $ from 'jquery'

const sq = new Square()
sq.viewer = new SquarePageViewer(sq,$('#root'))
sq.color = 'red'
sq.viewer.show()
sq.point = {
    x:1,
    y:1
}
$('#btnDown').on('click',function(){
    sq.point = {
        x:sq.point.x,
        y:sq.point.y + 1
    }
})
$('#btnR').on('click',()=>{
    if(sq.viewer){
        sq.viewer.remove()
    }
})
$('#btnAdd').on('click',()=>{
    sq.viewer = new SquarePageViewer(sq,$('#root'))
    
})