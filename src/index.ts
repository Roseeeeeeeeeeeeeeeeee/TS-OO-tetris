import { Game } from "./core/game";
import { GamePageViewer } from "./core/Viewers/GamePageViewer";
import $ from 'jquery'
const game = new Game(new GamePageViewer())
$('#start').on('click',()=>{
    game.start()
})
$('#pause').on('click',()=>{
    game.pause()
})
$('#left').on('click',()=>{
    game.controlLeft()
})
$('#right').on('click',()=>{
    game.controlRight()
})

$('#down').on('click',()=>{
    game.controlDown()
})

$('#rotate').on('click',()=>{
    game.controlRotate()
})

