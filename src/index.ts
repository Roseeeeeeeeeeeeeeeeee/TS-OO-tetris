import { Square } from "./core-data/Square";
import { IViewer } from "./core-data/types";

class ConsoleViewer implements IViewer {
  constructor(private square: Square) {}
  show(): void {
    console.log(this.square.point, this.square.color);
  }
  remove(): void {}
}
const sq = new Square();
sq.viewer = new ConsoleViewer(sq)
sq.viewer.show();
sq.point = {
    x:100,y:5000
}
