import iBootableComponent from "../../System/iBootableComponent";
import { StateMachine } from "../../System/StateMachine/StateMachine";
import { GlobalEvent } from "../GlobalEvent";
import LevelLoader from "../LevelLoader";
import GameBootState from "./GameBootState";
import GameStartState from "./GameStartState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameFlow extends iBootableComponent {
    levelLoader : LevelLoader;
    stateMachine : StateMachine = new StateMachine();

    isGameBooted: boolean;
    isGameStarted: boolean;
    isGameEnded: boolean;

    _init_(): void {
        cc.systemEvent.on(GlobalEvent.BootstrapEnded, ()=> {this.isGameBooted = true;}, this);

        let gameBootState = new GameBootState();
        let gameStartState = new GameStartState();
        //this.stateMachine.addTransition(gameBootState, gameStartState, )
    }

    _inject_(): void {}

}
