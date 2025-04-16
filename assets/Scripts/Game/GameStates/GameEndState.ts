import { iState } from "../../System/StateMachine/iState";
import UiManager from "../../System/UiManager";

import LevelLoader from "../LevelLoader";

export default class GameEndState extends iState {
    uiManager: UiManager;

    public constructor(uiManager : UiManager){
        super();

        this.uiManager = uiManager;
    }

    public onEnter(): void {
        this.uiManager.OpenEndScreen();
    }

    public onExit(): void {
        this.uiManager.CloseEndScreen();
    }
}
