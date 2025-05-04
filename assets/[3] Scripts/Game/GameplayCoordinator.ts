import { ServiceContainer } from "../System/ServiceContainer";
import aBootableService from "../System/aBootableService";
import Player from "./Player/Player";
import Segment from "./Segment/Segment";
import SegmentManager from "./Segment/SegmentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameplayCoordinator extends aBootableService{
    _player: Player;
    _segmentManager: SegmentManager;

    _lasthit: number;

    private _boundHandleSegmentsStop: Function;
    private _boundHandlePlayerStop: Function;

    public _inject_(container: ServiceContainer): void {
        this._segmentManager = container.get(SegmentManager);
        this._player = container.get(Player);
    }

    public _init_(): void {
        this._boundHandleSegmentsStop = this.handleSegmentsStop.bind(this);
        this._boundHandlePlayerStop = this.handlePlayerStop.bind(this);

        this._segmentManager.subscribeToMoveEndedEvent(this._boundHandleSegmentsStop);
        this._player.subscribeToOnPlayerStop(this._boundHandlePlayerStop);
    }

    public getProximateSegment(): Segment {
        return this._segmentManager.getProximate();
    }

    public getNextSegment(): Segment{
        return this._segmentManager.getNext();
    }

    public getLasthit(): number {
        return this._lasthit;
    }

    public validateHit(hitlinePosition: cc.Vec2, hitlineLenght: number){
        let nextSegment = this._segmentManager.getNext();
        let segmentMargins = nextSegment.getMarginsVec2();
        
        this._lasthit = this._player.node.position.x + hitlineLenght;

        if(this._lasthit >= segmentMargins.x && this._lasthit <= segmentMargins.y){
            this._player.run();
        }
        else{
            this._player.run();
        }
    }

    public handleSegmentsStop(){
        this._player.moveToEdge();
    }

    public handlePlayerStop(){
        this._segmentManager.swap();
        this._player.stickToSegment();
        this._segmentManager.move();
    }

    public startGameplay(){
        this._player.stickToSegment();
        this._segmentManager.move();
    }

    protected onDestroy(){
        this._segmentManager.unsubscribeFromMoveEndedEvent(this._boundHandleSegmentsStop);
    }
}
