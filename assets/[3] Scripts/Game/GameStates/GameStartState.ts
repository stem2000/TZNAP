import { iState } from "../../System/StateMachine/iState";
import UiManager from "../../System/UiManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStartState extends iState {
    uiManager: UiManager;

    public constructor(uiManager : UiManager){
        super();

        this.uiManager = uiManager;
    }

    public onEnter(): void {
        this.uiManager.OpenStartScreen();
    }

    public onExit(): void {
        this.uiManager.CloseStartScreen();
    }
}
