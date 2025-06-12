import { Square } from "./Square";
import { Point, Shape } from "./types";
import GameConfig from "./GameConfig";
export class SquareGroup {
  private _squares: readonly Square[] = [];
  get squares() {
    return this._squares;
  }
  get shape() {
    return this._shape;
  }
  get centerPoint() {
    return this._centerPoint;
  }
  set centerPoint(val: Point) {
    this._centerPoint = val;
    this.setSquarePoint();
  }
  constructor(
    private _shape: Shape,
    private _centerPoint: Point,
    private _color: string
  ) {
    this.setSquarePoint()
  }

  afterRotateShape(): Shape {
    let newShape: Shape;
    if (GameConfig.isClock) {
      newShape = this._shape.map((p) => {
        return {
          x: -p.y,
          y: p.x,
        };
      });
    } else {
      newShape = this._shape.map((p) => {
        return {
          x: p.y,
          y: -p.x,
        };
      });
    }
    return newShape;
  }
  rotate() {
    this._shape = this.afterRotateShape();
    this.setSquarePoint()
  }
  /**
   * 通过中心点以及形状得到方块的实际坐标
   */
  setSquarePoint() {
    if (this._squares.length === 0) {
      const arr: Square[] = [];
      this._shape.forEach((p) => {
        const sq = new Square();
        sq.point = {
          x: p.x + this._centerPoint.x,
          y: p.y + this._centerPoint.y,
        };
        sq.color = this._color;
        arr.push(sq);
      });
      this._squares = arr;
    }else{
      this._shape.forEach((p,i) => {
        
        this._squares[i].point = {
          x: p.x + this._centerPoint.x,
          y: p.y + this._centerPoint.y,
        };
      
       
      });
    }
  }
}
