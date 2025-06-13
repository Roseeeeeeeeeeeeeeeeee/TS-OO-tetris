import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./teris";
import { TerisRule } from "./terisRule";
import { GameStates, GameViewer, MoveDirection, Point, Shape } from "./types";

//游戏类
export class Game {
  /**
   * 游戏当前状态，init为未开始状态
   */
  private _gameState: GameStates = GameStates.init;
  /**
   * 当前操作的方块
   */
  private _curTeris?: SquareGroup;
  /**
   * 下一个要操作的方块
   */
  private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
  private _timer?: any;
  private _duration: number = 1000;

  constructor(private _viewer: GameViewer) {
    this.setSuitableCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
  }
  /**
   * 开始游戏的方法。
   * 如果游戏已经处于游玩状态，则不执行任何操作。
   * 否则，将游戏状态设置为游玩中，切换当前操作的方块，并启动自动下落功能。
   */
  start() {
    
    
    // 检查游戏是否已经处于游玩状态，如果是则直接返回，避免重复操作
    if (this._gameState === GameStates.playing) {
      return;
    }
    // 将游戏状态设置为游玩中
    this._gameState = GameStates.playing;
    if (!this._curTeris) {
      // 切换当前操作的方块
      this.switchTeris();
    }

    // 启动方块自动下落功能
    this.autoDrop();
  }
  pause() {
    if (this._gameState === GameStates.playing) {
        this._gameState = GameStates.pause;
        clearInterval(this._timer);
        this._timer = undefined
    }
    
  }
  controlLeft(){
    if(this._curTeris && this._gameState === GameStates.playing){
        TerisRule.move(this._curTeris,MoveDirection.left)
    }
  }
  controlRight(){
    if(this._curTeris && this._gameState === GameStates.playing){
        TerisRule.move(this._curTeris,MoveDirection.right)
    }
  }
  controlDown(){
    if(this._curTeris && this._gameState === GameStates.playing){
        TerisRule.moveToEnd(this._curTeris,MoveDirection.down)
    }
  }
  controlRotate(){
    if(this._curTeris && this._gameState === GameStates.playing){
        TerisRule.rotate(this._curTeris)
    }
  }
  /**
   * 设置方块合适的中心点坐标。
   * @param width - 所在区域的宽度。
   * @param teris - 需要设置中心点的方块组。
   */
  setSuitableCenterPoint(width: number, teris: SquareGroup): void {
    let x = Math.ceil(width / 2 ) - 1;
    let y = 0;
    while (!TerisRule.canIMove(teris.shape, { x, y })) {
      y++;
    }
    teris.centerPoint = { x, y };
  }
  switchTeris() {
    this._curTeris = this._nextTeris;
    this.setSuitableCenterPoint(GameConfig.panelSize.width, this._curTeris);
    this._viewer.nextToCur(this._curTeris);
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.setSuitableCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
  }

  autoDrop() {
    if (this._timer || this._gameState !== GameStates.playing) {
      return;
    }
    this._timer = setInterval(() => {
      if (this._curTeris) {
        TerisRule.move(this._curTeris, MoveDirection.down);
      }
    }, this._duration);
  }

}
