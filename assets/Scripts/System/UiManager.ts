import ReloadButton from "../UI/ReloadButton";
import iBootableComponent from "./iBootableComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UiManager extends iBootableComponent {

    @property(cc.Node)
    startScreen: cc.Node = null;

    @property(cc.Node)
    gameScreen: cc.Node = null;

    @property(cc.Node)
    endScreen: cc.Node = null;


    _inject_(): void {}

    _init_(): void {}


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
