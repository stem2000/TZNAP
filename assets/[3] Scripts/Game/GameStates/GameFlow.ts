import aBootableServiceComponent from "../../System/aBootableServiceComponent";
import { StateMachine } from "../../System/StateMachine/StateMachine";
import { GlobalEvent } from "../GlobalEvent";
import GameReloadState from "./GameReloadState";
import GameEndState from "./GameEndState";
import GameStartState from "./GameStartState";
import FuncPredicate from "../../System/StateMachine/FuncPredicate";
import { ServiceContainer } from "../../System/ServiceContainer";
import GameWaitState from "./GameBootState";
import GamePlayState from "./GamePlayState";
import InputHandler from "../../System/InputHandler";
import UiManager from "../../System/UiManager";
import Player from "../Player/Player";
import SegmentManager from "../Segment/SegmentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameFlow extends aBootableServiceComponent {
    stateMachine : StateMachine = new StateMachine();

    isGameBooted: boolean;
    isGameStarted: boolean;
    isGameEnded: boolean;
    isGameReloaded: boolean;

    inputHandler : InputHandler;
    segmentManager: SegmentManager;
    uiManager : UiManager
    player: Player;

    public override _init_(): void {
        let gameWaitState = new GameWaitState();
        let gameStartState = new GameStartState(this.uiManager);
        let gamePlayState = new GamePlayState(this.uiManager, this.segmentManager, this.player);
        let gameEndState = new GameEndState(this.uiManager);
        let gameReloadState = new GameReloadState();
        
        this.stateMachine.addTransition(gameWaitState, gameStartState, new FuncPredicate(() => this.isGameBooted));
        this.stateMachine.addTransition(gameStartState, gamePlayState, new FuncPredicate(() => this.isGameStarted));

        this.stateMachine.setState(gameWaitState);
    }

    public override _inject_(container: ServiceContainer): void {

        this.uiManager = container.get(UiManager);
        this.segmentManager = container.get(SegmentManager);
        this.player = container.get(Player);
    }

    public confirmGameBoot(){
        this.isGameBooted = true;
    }

    public confirmGameStart(){
        this.isGameStarted = true;
    }

    protected update(dt: number): void {
        this.stateMachine.update();
    }
}
