import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import { ServiceLocator } from "../System/ServiceLocator";
import { StateMachine } from "../System/StateMachine/StateMachine";
import { GlobalEvent } from "./GlobalEvent";
import LevelLoader from "./LevelLoader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameFlow extends cc.Component implements IInjectable, IBootable {
    levelLoader : LevelLoader;
    stateMachine : StateMachine;

    _init_(): void {
        cc.systemEvent.on(GlobalEvent.BootstrapEnded, this.startGame, this);
    }

    _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.levelLoader = servloc.get(LevelLoader);
    }

    public startGame(){
        this.levelLoader.loadOneSegmentedLevel();
    }

}
