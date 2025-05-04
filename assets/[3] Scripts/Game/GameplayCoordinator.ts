import { ServiceContainer } from "../System/ServiceContainer";
import aBootableService from "../System/aBootableService";
import Player from "./Player/Player";
import Segment from "./Segment/Segment";
import SegmentManager from "./Segment/SegmentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameplayCoordinator extends aBootableService{
    player: Player;
    segmentManager: SegmentManager;

    lasthit: number;

    private boundHandleSegmentsStop: Function;

    public _inject_(container: ServiceContainer): void {
        this.segmentManager = container.get(SegmentManager);
        this.player = container.get(Player);
    }

    public _init_(): void {
        this.boundHandleSegmentsStop = this.handleSegmentsStop.bind(this);

        this.segmentManager.subscribeToMoveEndedEvent(this.boundHandleSegmentsStop);
    }

    public getProximateSegment(): Segment {
        return this.segmentManager.getProximate();
    }

    public getLasthit(): number {
        return this.lasthit;
    }

    public validateHit(hitlinePosition: cc.Vec2, hitlineLenght: number){
        let nextSegment = this.segmentManager.getNextSegment();
        let segmentMargins = nextSegment.getMarginsVec2();
        
        this.lasthit = hitlinePosition.x + hitlineLenght;

        if(this.lasthit >= segmentMargins.x && this.lasthit <= segmentMargins.y){
            this.player.run();
        }
        else{
            this.player.run();
        }
    }

    public handleSegmentsStop(){
        this.player.moveToEdge();
    }

    public startGameplay(){
        this.player.stickToSegment();
        this.segmentManager.move();
    }

    protected onDestroy(){
        this.segmentManager.unsubscribeFromMoveEndedEvent(this.boundHandleSegmentsStop);
    }
}
