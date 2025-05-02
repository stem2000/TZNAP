import GameFlow from "../Game/GameStates/GameFlow";
import { ServiceContainer } from "./ServiceContainer";
import aBootableServiceComponent from "./aBootableServiceComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UiManager extends aBootableServiceComponent {

    @property(cc.Node)
    startScreen: cc.Node = null;

    @property(cc.Node)
    gameScreen: cc.Node = null;

    @property(cc.Node)
    endScreen: cc.Node = null;

    private gameFlow: GameFlow;


    override _inject_(container: ServiceContainer): void {
        this.gameFlow = container.get(GameFlow);
    }

    override _init_(): void {}


    public OpenStartScreen(){
        this.startScreen.active = true;
    }

    public CloseStartScreen(){
        this.startScreen.active = false;
    }

    public OpenGameScreen(){
        this.gameScreen.active = true;
    }

    public CloseGameScreen(){
        this.gameScreen.active = false;
    }

    public OpenEndScreen(){
        this.endScreen.active = true; 
    }

    public CloseEndScreen(){
        this.endScreen.active = false;
    }
    
}
