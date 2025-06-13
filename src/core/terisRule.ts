import { SquareGroup } from "./SquareGroup";
import { MoveDirection, Point, Shape } from "./types";
import GameConfig from "./GameConfig";
import { Square } from "./Square";
function isPoint(obj: any): obj is Point {
  if (obj.x !== undefined) {
    return true;
  }
  return false;
}
//这是一个俄罗斯方块规则类，提供一些静态函数进行规则判断
export class TerisRule {
  /**
   *
   * @param teris 需要移动的方块
   * @param targetCenterPoint 移动后的中心点坐标
   * @returns 为true就可以移动
   */
  static canIMove(
    shape: Shape,
    targetCenterPoint: Point,
    existSquares: Square[]
  ): boolean {
    //得到移动后各个小块的位置
    const targetShape: Point[] = shape.map((it) => {
      return {
        x: it.x + targetCenterPoint.x,
        y: it.y + targetCenterPoint.y,
      };
    });
    //检验各个小块的位置是否合法，只要有一个不合法就不可以完成移动
    let res = targetShape.some((p) => {
      if (
        p.x < 0 ||
        p.x > GameConfig.panelSize.width - 1 ||
        p.y < 0 ||
        p.y > GameConfig.panelSize.height - 1
      ) {
        return true;
      }
      return false;
    });
    if (res) {
      return false;
    }
    res = targetShape.some((it) =>
      existSquares.some((s) => s.point.x === it.x && s.point.y === it.y)
    );
    if (res) {
      return false;
    }
    return true;
  }

  static move(
    teris: SquareGroup,
    direction: MoveDirection,
    existSquares: Square[]
  ): boolean;
  static move(
    teris: SquareGroup,
    targetCenterPoint: Point,
    existSquares: Square[]
  ): boolean;
  static move(
    teris: SquareGroup,
    targetCenterPointOrDirection: Point | MoveDirection,
    existSquares: Square[]
  ): boolean {
    if (isPoint(targetCenterPointOrDirection)) {
      if (
        this.canIMove(teris.shape, targetCenterPointOrDirection, existSquares)
      ) {
        teris.centerPoint = targetCenterPointOrDirection;
        return true;
      } else {
        return false;
      }
    } else {
      const direction = targetCenterPointOrDirection;
      let tagetPoint: Point;
      if (direction === MoveDirection.left) {
        tagetPoint = {
          x: teris.centerPoint.x - 1,
          y: teris.centerPoint.y,
        };
      } else if (direction === MoveDirection.right) {
        tagetPoint = {
          x: teris.centerPoint.x + 1,
          y: teris.centerPoint.y,
        };
      } else if (direction === MoveDirection.down) {
        tagetPoint = {
          x: teris.centerPoint.x,
          y: teris.centerPoint.y + 1,
        };
      } else {
        tagetPoint = {
          x: teris.centerPoint.x,
          y: teris.centerPoint.y - 1,
        };
      }
      return this.move(teris, tagetPoint, existSquares);
    }
  }
  static moveToEnd(
    teris: SquareGroup,
    direction: MoveDirection,
    existSquares: Square[]
  ) {
    while (this.move(teris, direction, existSquares)) {}
  }
  static rotate(teris: SquareGroup, existSquares: Square[]): boolean {
    const newShape = teris.afterRotateShape();
    if (this.canIMove(newShape, teris.centerPoint, existSquares)) {
      teris.rotate();
      return true;
    } else {
      return false;
    }
  }
  /**
   * 消去应该删除的方块
   * @param existSquares
   */
  static deleteSquares(existSquares: Square[]): number {
    let cnt = 0;
    //得到所有存在界面上的方块的纵坐标

    const ys = existSquares.map((sq) => sq.point.y);
    const maxY = Math.max(...ys);
    const minY = Math.min(...ys);
    for (let y = minY; y <= maxY; y++) {
      if (this.deleteLine(y, existSquares)) {
        cnt++;
        existSquares.forEach((es) => {
          if (es.point.y < y) {
            es.point = {
              x: es.point.x,
              y: es.point.y + 1,
            };
          }
        });
      }
    }
    return cnt;
  }
  /**
   * 消去一行的方块
   */
  private static deleteLine(y: number, existSquares: Square[]): boolean {
    const lineSquares = existSquares.filter((es) => es.point.y === y);
    if (lineSquares.length === GameConfig.panelSize.width) {
      //可以消除此行
      lineSquares.forEach((ls) => {
        ls.viewer?.remove();
        const index = existSquares.indexOf(ls);
        existSquares.splice(index, 1);
      });
      return true;
    }
    return false;
  }
}
