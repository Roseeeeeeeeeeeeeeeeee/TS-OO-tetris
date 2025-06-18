import { SquareGroup } from "../SquareGroup";
import { GameStates, GameViewer } from "../types";
import $ from "jquery";
import { SquarePageViewer } from "./SquarePageViewer";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";
import { Game } from "../game";
export class GamePageViewer implements GameViewer {
  onStart(): void {
    this.shadowDom.css({
      display: "none",
    });
  }
  onPause(): void {
    this.shadowDom.css({
      display: "flex",
    });
    this.tipDom.html("游戏暂停");
  }
  onOver(): void {
    this.shadowDom.css({
      display: "flex",
    });
    this.tipDom.html("游戏结束");
  }
  private panelDom: JQuery<HTMLElement> = $("#panel");
  private nextDom: JQuery<HTMLElement> = $("#next");
  private scoreDom: JQuery<HTMLElement> = $("#score");
  private shadowDom: JQuery<HTMLElement> = $(".shadow");
  private tipDom: JQuery<HTMLElement> = $(".tip");
  private recordDom: JQuery<HTMLElement> = $(".record");

  /**
   * 显示分数
   * @param game
   */
  showScore(game: Game): void {
    this.scoreDom.html(`<div class="title">
                    目前得分：
                </div> ${game.score.toString()}`);
    this.recordDom.html(`<div class="title">
                最高纪录：
                </div> ${GameConfig.highestRecordScore.toString()}`);
  }

  /**
   * 初始化游戏显示
   * @param game
   */
  init(game: Game): void {
    this.panelDom.css({
      width: GameConfig.panelSize.width * PageConfig.squareSize.width,
      height: GameConfig.panelSize.height * PageConfig.squareSize.width,
    });
    this.nextDom.css({
      width: GameConfig.nextSize.width * PageConfig.squareSize.width,
      height: GameConfig.nextSize.height * PageConfig.squareSize.width,
    });
    //注册键盘事件
    $(document).on("keydown", (e) => {
      const key = e.key;

      if (key === "ArrowUp") {
        game.controlRotate();
      } else if (key === "ArrowLeft") {
        game.controlLeft();
      } else if (key === "ArrowRight") {
        game.controlRight();
      } else if (key === "ArrowDown") {
        game.controlDown();
      } else if (key === " ") {
        const state = game.gameState;
        if (state !== GameStates.playing) {
          game.start();
        } else {
          game.pause();
        }
      }
    });
  }
  /**
   * 显示下一个方块
   * @param teris
   */
  showNext(teris: SquareGroup): void {
    teris.squares.forEach((s) => {
      s.viewer = new SquarePageViewer(s, $("#next"));
      // s.viewer.show()
    });
  }
  /**
   * 进行方块转换
   * @param teris
   */
  nextToCur(teris: SquareGroup): void {
    teris.squares.forEach((s) => {
      s.viewer?.remove();
      s.viewer = new SquarePageViewer(s, $("#panel"));
    });
  }
}
