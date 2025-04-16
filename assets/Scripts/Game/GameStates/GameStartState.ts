import { iState } from "../../System/StateMachine/iState";
import UiManager from "../../System/UiManager";
import LevelLoader from "../LevelLoader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStartState extends iState {
    levelLoader: LevelLoader;
    uiManager: UiManager;

    public constructor(levelLoader: LevelLoader, uiManager : UiManager){
        super();

        this.uiManager = uiManager;
        this.levelLoader = levelLoader;
    }

    public onEnter(): void {
        this.levelLoader.loadOneSegmentedLevel();
        this.uiManager.OpenStartScreen();
    }

    public onExit(): void {
        this.uiManager.CloseStartScreen();
    }
}
