//俄罗斯方块的生产者

import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./util";

//1、得到俄罗斯方块的形状
export const SShape: Shape = [
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
];
export const SMirrorShape: Shape = [
    { x: 1, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
  ];
  export const TMirrorShape: Shape = [
    { x: 1, y: 0 },
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
  ];
  export const TShape: Shape = [
    { x: 1, y: 0 },
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
  ];
  export const BarShape: Shape = [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];
  export const LShape: Shape = [
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];
  export const LMirrorShape: Shape = [
    { x: 0, y: -1 },
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: -2, y: 0 },
  ];
  export const SquareShape:Shape = [
    { x: 0, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ]
  const shapes:Shape[] = [
    SShape,
    SMirrorShape,
    LShape,
    LMirrorShape,
    TShape,
    TMirrorShape,
    BarShape,
    SquareShape
  ]
  const colors:string[] = [
    'red',
    'green',
    'yellow',
    'pink',
    'white',
    'lightblue',
    'orange'
  ]
  /**
   * 
   * @param centerPoint 俄罗斯方块的中心点坐标
   * @returns 俄罗斯方块对象
   */
export function createTeris(centerPoint:Point){
    const shapeIndex = getRandom(0,shapes.length)
    const shape = shapes[shapeIndex];
    const colorIndex = getRandom(0,colors.length)
    const color = colors[colorIndex]
    return new SquareGroup(shape,centerPoint,color)
}



