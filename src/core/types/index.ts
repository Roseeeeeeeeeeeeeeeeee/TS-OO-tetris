import { SquareGroup } from "../SquareGroup"

export interface Point{
    readonly x:number,
    readonly y:number
}

export interface IViewer{
    /**
     * 显示
     */
    show():void,
    /**
     * 移除
     */
    remove():void
}


export type Shape = Point[]

export enum MoveDirection{
    left,
    right,
    up,
    down
}

export enum GameStates{
    init,//未开始
    playing,//进行中
    pause,//暂停
    end//游戏结束
}
export interface GameViewer{
    /**
     * 
     * @param teris 下一个方块对象
     */
    showNext(teris:SquareGroup):void,
    /**
     * 
     * @param teris 即将要放入游戏面板的方块
     */
    nextToCur(teris:SquareGroup):void
}