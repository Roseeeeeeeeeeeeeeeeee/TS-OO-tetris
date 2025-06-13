import { SquareGroup } from "../SquareGroup";
import { GameViewer } from "../types";
import $ from 'jquery'
import { SquarePageViewer } from "./SquarePageViewer";
export class GamePageViewer implements GameViewer{
    showNext(teris: SquareGroup): void {
        teris.squares.forEach((s)=>{
            s.viewer = new SquarePageViewer(s,$('#next'))
            // s.viewer.show()
        })
    }
    nextToCur(teris: SquareGroup): void {
        
        teris.squares.forEach((s)=>{
            s.viewer?.remove()
            s.viewer = new SquarePageViewer(s,$('#panel'))
            // s.viewer.show()
        })
    }

}