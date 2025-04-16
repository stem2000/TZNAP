import { iState } from "../../System/StateMachine/iState";
import UiManager from "../../System/UiManager";

export default class GamePlayState extends iState {
    uiManager: UiManager;
    
    public constructor(uiManager : UiManager){
        super();

        this.uiManager = uiManager;
    }

    public onEnter(): void {
        this.uiManager.OpenGameScreen();
    }

    public onExit(): void {
        this.uiManager.CloseGameScreen();
    }
}
