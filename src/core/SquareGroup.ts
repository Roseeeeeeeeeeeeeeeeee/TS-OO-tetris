import { Square } from "./Square";
import { Point, Shape } from "./types";

export class SquareGroup {
  private _squares: readonly Square[] = [];
  get squares() {
    return this._squares;
  }
  get shape(){
    return this._shape
  }
  get centerPoint() {
    return this._centerPoint;
  }
  set centerPoint(val: Point) {
    this._centerPoint = val;
    const arr: Square[] = [];
    this._shape.forEach((p, i) => {
      this._squares[i].point = {
        x: p.x + this._centerPoint.x,
        y: p.y + this._centerPoint.y,
      };
    });
  }
  constructor(
    private _shape: Shape,
    private _centerPoint: Point,
    private _color: string
  ) {
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
  }
}
