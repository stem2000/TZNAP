import iBootableComponent from "../../System/iBootableComponent";
import { StateMachine } from "../../System/StateMachine/StateMachine";
import { GlobalEvent } from "../GlobalEvent";
import LevelLoader from "../LevelLoader";
import GameReloadState from "./GameReloadState";
import GameEndState from "./GameEndState";
import GameStartState from "./GameStartState";
import FuncPredicate from "../../System/StateMachine/FuncPredicate";
import { ServiceLocator } from "../../System/ServiceLocator";
import GameBootState from "./GameBootState";
import GamePlayState from "./GamePlayState";
import InputHandler from "../../System/InputHandler";
import GameLoadState from "./GameLoadState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameFlow extends iBootableComponent {
    stateMachine : StateMachine = new StateMachine();

    isGameBooted: boolean;
    isGameStarted: boolean;
    isGameEnded: boolean;
    isGameReloaded: boolean;

    levelLoader : LevelLoader;
    inputHandler : InputHandler;

    public _init_(): void {
        cc.systemEvent.on(GlobalEvent.BootstrapEnded, ()=> {this.isGameBooted = true;}, this);
        cc.systemEvent.on(GlobalEvent.PlayerDied, () => {this.isGameStarted = false; this.isGameEnded = true, this});
        cc.systemEvent.on(GlobalEvent.GameStarted, () => {this.isGameStarted = true;}, this)

        let gameBootState = new GameBootState();
        let gameLoadState = new GameLoadState(this.levelLoader);
        let gameStartState = new GameStartState();
        let gamePlayState = new GamePlayState();
        let gameEndState = new GameEndState();
        let gameReloadState = new GameReloadState(this.levelLoader);
        
        this.stateMachine.addTransition(gameBootState, gameLoadState, new FuncPredicate(() => this.isGameBooted));
        this.stateMachine.addTransition(gameLoadState, gameStartState, new FuncPredicate(() => this.isGameStarted));
        this.stateMachine.addTransition(gameStartState, gameEndState, new FuncPredicate(() => this.isGameEnded));

        this.stateMachine.setState(gameBootState);
    }

    public _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.levelLoader = servloc.get(LevelLoader);
    }

    protected update(dt: number): void {
        this.stateMachine.update();
    }

}
