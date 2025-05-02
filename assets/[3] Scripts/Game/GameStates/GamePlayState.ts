import { iState } from "../../System/StateMachine/iState";
import UiManager from "../../System/UiManager";
import Player from "../Player/Player";
import SegmentManager from "../Segment/SegmentManager";

export default class GamePlayState extends iState {
    uiManager: UiManager;
    segmentManager: SegmentManager;
    player: Player;
    
    public constructor(uiManager : UiManager, segmentManager: SegmentManager, player: Player){
        super();

        this.uiManager = uiManager;
        this.segmentManager = segmentManager;
        this.player = player;
    }

    public onEnter(): void {
        this.uiManager.OpenGameScreen();
        
        this.player.stickToSegment();
        this.segmentManager.move();
    }

    public onExit(): void {
        this.uiManager.CloseGameScreen();
    }
}
