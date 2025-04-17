import iBootableComponent from "../../System/iBootableComponent";
import { StateMachine } from "../../System/StateMachine/StateMachine";
import { GlobalEvent } from "../GlobalEvent";
import GameReloadState from "./GameReloadState";
import GameEndState from "./GameEndState";
import GameStartState from "./GameStartState";
import FuncPredicate from "../../System/StateMachine/FuncPredicate";
import { ServiceLocator } from "../../System/ServiceLocator";
import GameWaitState from "./GameBootState";
import GamePlayState from "./GamePlayState";
import InputHandler from "../../System/InputHandler";
import UiManager from "../../System/UiManager";
import Player from "../Player/Player";
import SegmentManager from "../Segment/SegmentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameFlow extends iBootableComponent {
    stateMachine : StateMachine = new StateMachine();
    segmentManager: SegmentManager;
    player: Player;

    isGameBooted: boolean;
    isGameStarted: boolean;
    isGameEnded: boolean;
    isGameReloaded: boolean;

    inputHandler : InputHandler;
    uiManager : UiManager

    public _init_(): void {
        cc.systemEvent.on(GlobalEvent.StartButtonPressed, this.startGame, this);
        cc.systemEvent.on(GlobalEvent.PlayerDied, () => {this.isGameStarted = false; this.isGameEnded = true, this});

        let gameWaitState = new GameWaitState();
        let gameStartState = new GameStartState(this.uiManager);
        let gamePlayState = new GamePlayState(this.uiManager);
        let gameEndState = new GameEndState(this.uiManager);
        let gameReloadState = new GameReloadState();
        
        this.stateMachine.addTransition(gameWaitState, gameStartState, new FuncPredicate(() => this.isGameBooted));
        this.stateMachine.addTransition(gameStartState, gamePlayState, new FuncPredicate(() => this.isGameStarted));

        this.stateMachine.setState(gameWaitState);
    }

    public _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.uiManager = servloc.get(UiManager);
        this.segmentManager = servloc.get(SegmentManager);
        this.player = servloc.get(Player);
    }

    public makeGameStartable(){
        this.isGameBooted = true;
    }

    protected update(dt: number): void {
        this.stateMachine.update();
    }

    private startGame(){
        this.isGameStarted = true;

        this.player.stickToSegment();
        this.segmentManager.move();
    }

    protected onDestroy(): void {
        cc.systemEvent.off(GlobalEvent.StartButtonPressed, this.startGame, this)
        cc.systemEvent.off(GlobalEvent.PlayerDied, () => {this.isGameStarted = false; this.isGameEnded = true, this});
    }

}
