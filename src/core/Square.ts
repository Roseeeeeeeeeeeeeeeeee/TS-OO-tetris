import { IViewer, Point } from "./types";


export class Square{
    private _color:string = '';
    private _point:Point = {
        x:0,
        y:0
    }
    private _viewer?:IViewer
    get color(){
        return this._color
    }
    set color(val){
        this._color = val
    }
    get point(){
        return this._point
    }
    set point(val){
        this._point = val
        if(this._viewer){
            this._viewer.show()
        }

    }
    get viewer(){
        return this._viewer
    }
    set viewer(val){
        this._viewer = val
        if(val){
            this.viewer?.show()
        }
    }

}