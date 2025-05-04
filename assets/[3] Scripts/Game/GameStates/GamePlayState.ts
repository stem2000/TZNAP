import { iState } from "../../System/StateMachine/iState";
import UiManager from "../../System/UiManager";
import Request from "../../System/Request";

export default class GamePlayState extends iState {
    uiManager: UiManager;
    requestStartGame: Request<[], void>;
    
    public constructor(uiManager : UiManager, requestStartGame: Request<[], void>){
        super();

        this.uiManager = uiManager;
        this.requestStartGame = requestStartGame; 
    }

    public onEnter(): void {
        this.uiManager.OpenGameScreen();
        
        this.requestStartGame.Request();
    }

    public onExit(): void {
        this.uiManager.CloseGameScreen();
    }
}
