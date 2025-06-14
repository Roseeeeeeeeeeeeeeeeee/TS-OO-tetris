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
                width:PageConfig.squareSize.width,
                height:PageConfig.squareSize.height,
                boxSizing:'boeder-box',
                // border:'1px solid #ccc',
                // borderLeft:'0.5px solid #ccc',
                // borderRight:'0.5px solid #ccc',
                // boxShadow:'1px 1px 0px #ccc, -1px -1px 0px #ccc'
                outline:'1px solid #ccc'

            }).appendTo(this.container)
            
        }
        this.dom.css({
            left : this.square.point.x * PageConfig.squareSize.width,
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