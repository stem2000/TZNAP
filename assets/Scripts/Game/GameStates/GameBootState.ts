import { IInjectable } from "../../Interfaces/Interfaces";
import { ServiceLocator } from "../../System/ServiceLocator";
import { iState } from "../../System/StateMachine/iState";
import { GlobalEvent } from "../GlobalEvent";
import LevelLoader from "../LevelLoader";

export default class GameBootState extends iState implements IInjectable{
    levelLoader: LevelLoader;
    isGameStarted: boolean = false;

    _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.levelLoader = servloc.get(LevelLoader);
    }

    public constructor(){
        super();
        cc.systemEvent.on(GlobalEvent.BootstrapEnded, ()=> {this.isGameStarted = true;}, this);
    }

    public override onEnter(): void {
        this.isGameStarted = false;
    }

    public override onExit(): void {
        this.isGameStarted = true;
    }

}
