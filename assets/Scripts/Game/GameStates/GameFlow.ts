import iBootableComponent from "../../System/iBootableComponent";
import { StateMachine } from "../../System/StateMachine/StateMachine";
import { GlobalEvent } from "../GlobalEvent";
import GameReloadState from "./GameReloadState";
import GameEndState from "./GameEndState";
import GameStartState from "./GameStartState";
import FuncPredicate from "../../System/StateMachine/FuncPredicate";
import { ServiceLocator } from "../../System/ServiceLocator";
import GameBootState from "./GameBootState";
import GamePlayState from "./GamePlayState";
import InputHandler from "../../System/InputHandler";
import UiManager from "../../System/UiManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameFlow extends iBootableComponent {
    stateMachine : StateMachine = new StateMachine();

    isGameBooted: boolean;
    isGameStarted: boolean;
    isGameEnded: boolean;
    isGameReloaded: boolean;

    inputHandler : InputHandler;
    uiManager : UiManager

    public _init_(): void {
        cc.systemEvent.on(GlobalEvent.GameBootstrapped, ()=> {this.isGameBooted = true;}, this);
        cc.systemEvent.on(GlobalEvent.GameEnded, () => {this.isGameStarted = false; this.isGameEnded = true, this});
        cc.systemEvent.on(GlobalEvent.GameStarted, () => {this.isGameStarted = true;}, this)

        let gameBootState = new GameBootState();
        let gameStartState = new GameStartState(this.uiManager);
        let gamePlayState = new GamePlayState(this.uiManager);
        let gameEndState = new GameEndState(this.uiManager);
        let gameReloadState = new GameReloadState();
        
        this.stateMachine.addTransition(gameBootState, gameStartState, new FuncPredicate(() => this.isGameBooted));
        this.stateMachine.addTransition(gameStartState, gamePlayState, new FuncPredicate(() => this.isGameStarted));

        this.stateMachine.setState(gameBootState);
    }

    public _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.uiManager = servloc.get(UiManager);
    }

    protected update(dt: number): void {
        this.stateMachine.update();
    }

}
