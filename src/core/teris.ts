//俄罗斯方块的生产者

import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./util";
import GameConfig from "./GameConfig";
//1、得到俄罗斯方块的形状

class TShape extends SquareGroup{
    constructor( _color : string, _centerPoint:Point){
        super([
            { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }
        ],_centerPoint,_color)
    }
}
class LShape extends SquareGroup{
    constructor( _color : string, _centerPoint:Point){
        super([
            { x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }
        ],_centerPoint,_color)
    }
}
class LMirrorShape extends SquareGroup{
    constructor( _color : string, _centerPoint:Point){
        super([
            { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }
        ],_centerPoint,_color)
    }
}



class SShape extends SquareGroup{
    constructor( _color : string, _centerPoint:Point){
        super([
            { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }
        ],_centerPoint,_color)
    }
    rotate(): void {
        super.rotate()
        GameConfig.isClock = !GameConfig.isClock

    }
}


class SMirrorShape extends SquareGroup{
    constructor( _color : string, _centerPoint:Point){
        super([
            { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }
        ],_centerPoint,_color)
    }
    rotate(): void {
        super.rotate()
        GameConfig.isClock = !GameConfig.isClock

    }
}

class SquareShape extends SquareGroup{
    constructor( _color : string, _centerPoint:Point){
        super([
            { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }
        ],_centerPoint,_color)
    }
    afterRotateShape():Shape {
        return this.shape
    }
}
class LineShape extends SquareGroup{
    constructor( _color : string, _centerPoint:Point){
        super([
            { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
        ],_centerPoint,_color)
    }
    rotate(): void {
        super.rotate()
        GameConfig.isClock = !GameConfig.isClock

    }
}

  const shapes = [
    SShape,
    SMirrorShape,
    LShape,
    LMirrorShape,
    TShape,
    LineShape,
    SquareShape
  ]
  const colors:string[] = [
    'red',
    'green',
    'yellow',
    'pink',
    'lightblue',
    'orange'
  ]
  /**
   * 随机生成一个俄罗斯方块
   * @param centerPoint 俄罗斯方块的中心点坐标
   * @returns 俄罗斯方块对象
   */
export function createTeris(centerPoint:Point):SquareGroup{
    const shapeIndex = getRandom(0,shapes.length)
    const shape = shapes[shapeIndex];
    const colorIndex = getRandom(0,colors.length)
    const color = colors[colorIndex]
    return new shape(color,centerPoint)
}



