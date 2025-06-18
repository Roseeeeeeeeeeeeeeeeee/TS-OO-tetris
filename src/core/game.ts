import GameConfig from "./GameConfig";
import { Square } from "./Square";
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
  get gameState() {
    return this._gameState;
  }
  /**
   * 当前操作的方块
   */
  private _curTeris?: SquareGroup;
  /**
   * 下一个要操作的方块
   */
  private _nextTeris: SquareGroup;
  //计时器
  private _timer?: any;
  //自动下落的间隔时间
  private _duration: number = 1000;
  //当前游戏面板中已存在的小方块
  private _existSquares: Square[] = [];
  //当前得分
  private _score: number = 0;
  get score() {
    return this._score;
  }
  set score(val) {
    this._score = val;
    this._viewer.showScore(this);
    this.setSpeed();
  }
  constructor(private _viewer: GameViewer) {
    this._nextTeris = createTeris({ x: 0, y: 0 }); //无实际意义的操作，为了初始化_nextTeris
    this.createNextTeris();
    this._viewer.init(this);
    this._viewer.showScore(this);
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
    //游戏结束后的重新开始
    if (this._gameState === GameStates.end) {
      this.init();
    }
    // 将游戏状态设置为游玩中
    this._gameState = GameStates.playing;
    if (!this._curTeris) {
      // 切换当前操作的方块
      this.switchTeris();
    }

    // 启动方块自动下落功能
    this.autoDrop();
    this._viewer.onStart();
  }
  pause() {
    if (this._gameState === GameStates.playing) {
      this._gameState = GameStates.pause;
      clearInterval(this._timer);
      this._timer = undefined;
    }
    this._viewer.onPause();
  }
  private init() {
    this._timer = undefined;
    this._existSquares.forEach((es) => es.viewer?.remove());
    this._curTeris = undefined;
    this._gameState = GameStates.init;
    this._existSquares = [];
    this.score = 0;
    this.createNextTeris();
  }
  controlLeft() {
    if (this._curTeris && this._gameState === GameStates.playing) {
      TerisRule.move(this._curTeris, MoveDirection.left, this._existSquares);
    }
  }
  controlRight() {
    if (this._curTeris && this._gameState === GameStates.playing) {
      TerisRule.move(this._curTeris, MoveDirection.right, this._existSquares);
    }
  }
  controlDown() {
    if (this._curTeris && this._gameState === GameStates.playing) {
      TerisRule.moveToEnd(
        this._curTeris,
        MoveDirection.down,
        this._existSquares
      );
      //触底处理
      this.hitbottom();
    }
  }
  controlRotate() {
    if (this._curTeris && this._gameState === GameStates.playing) {
      TerisRule.rotate(this._curTeris, this._existSquares);
    }
  }
  /**
   * 设置方块合适的中心点坐标。
   * @param width - 所在区域的宽度。
   * @param teris - 需要设置中心点的方块组。
   */
  private setSuitableCenterPoint(width: number, teris: SquareGroup): void {
    let x = Math.ceil(width / 2) - 1;
    let y = 0;

    teris.centerPoint = { x, y };

    while (teris.squares.some((sq) => sq.point.y < 0)) {
      teris.centerPoint = { x, y: ++y };
    }
  }
  private switchTeris() {
    this._curTeris = this._nextTeris;
    this.setSuitableCenterPoint(GameConfig.panelSize.width, this._curTeris);
    this._nextTeris.squares.forEach((ns) => ns.viewer?.remove());
    if (
      !TerisRule.canIMove(
        this._curTeris.shape,
        this._curTeris.centerPoint,
        this._existSquares
      )
    ) {
      this._gameState = GameStates.end;
      //更新纪录
      this.updateRecord();
      clearInterval(this._timer);
      this._viewer.onOver();
      return;
    }
    this._viewer.nextToCur(this._curTeris);
    this.createNextTeris();
  }

  private autoDrop() {
    if (this._timer || this._gameState !== GameStates.playing) {
      return;
    }
    this._timer = setInterval(() => {
      if (this._curTeris) {
        if (
          !TerisRule.move(
            this._curTeris,
            MoveDirection.down,
            this._existSquares
          )
        ) {
          //触底处理
          this.hitbottom();
        }
      }
    }, this._duration);
  }
  private hitbottom() {
    //1.存储游戏面板中已存在方块的位置，便于移动判断
    this._existSquares.push(...this._curTeris!.squares);
    //2.消除该消去的行
    const num = TerisRule.deleteSquares(this._existSquares);
    this.addScore(num);

    //3.更新方块
    this.switchTeris();
  }
  private addScore(lineNum: number) {
    if (lineNum === 0) {
      return;
    } else if (lineNum === 1) {
      this.score += 10;
    } else if (lineNum === 2) {
      this.score += 25;
    } else if (lineNum === 3) {
      this.score += 50;
    } else {
      this.score += 100;
    }
  }
  private createNextTeris() {
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.setSuitableCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
  }
  private setSpeed() {
    const val = this.score;
    const less = GameConfig.speedLevels.filter((ls) => ls.score <= val).pop()!;
    if (less.duration === this._duration) {
      return;
    }
    this._duration = less.duration;
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = undefined;
      this.autoDrop();
    }
  }
  private updateRecord() {
    if (this.score > GameConfig.highestRecordScore) {
      GameConfig.highestRecordScore = this.score;
    }
  }
}
