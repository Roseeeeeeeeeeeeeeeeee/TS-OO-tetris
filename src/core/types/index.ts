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