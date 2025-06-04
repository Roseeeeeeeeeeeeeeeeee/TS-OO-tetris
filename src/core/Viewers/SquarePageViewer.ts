import { Square } from "../Square";
import { IViewer } from "../types";
import $ from 'jquery'
import PageConfig from "./PageConfig";

export class SquarePageViewer implements IViewer{
    private dom?:JQuery<HTMLElement>
    private isRemoved:boolean = false
    constructor(
        private square:Square,
        private container:JQuery<HTMLElement>
       
    ){

    }
    show(): void {
        if(this.isRemoved){
            return
        }
        if(!this.dom){
            this.dom = $('<div>').css({
                position:'absolute',
                width:PageConfig.squareSize.with,
                height:PageConfig.squareSize.height,
                boxSizing:'boeder-box',
                border:'1px solid #ccc'
            }).appendTo(this.container)
            
        }
        this.dom.css({
            left : this.square.point.x * PageConfig.squareSize.with,
            top  : this.square.point.y * PageConfig.squareSize.height,
            backgroundColor : this.square.color
        })
    }
    remove(): void {
       if(this.dom && !this.isRemoved)
       {
        this.dom.remove()
        this.isRemoved = true
       }
      
    }
    
}