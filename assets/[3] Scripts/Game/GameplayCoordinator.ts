import { ServiceContainer } from "../System/ServiceContainer";
import aBootableService from "../System/aBootableService";
import Player from "./Player/Player";
import Segment from "./Segment/Segment";
import SegmentManager from "./Segment/SegmentManager";
import Request from "../System/Request";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameplayCoordinator extends aBootableService{
    player: Player;
    segmentManager: SegmentManager;

    lasthit: number;

    public _inject_(container: ServiceContainer): void {
        this.segmentManager = container.get(SegmentManager);
        this.player = container.get(Player);
    }

    public _init_(): void {}

    public ValidateHit(hitlinePosition: cc.Vec2, hitlineLenght: number){
        let nextSegment = this.segmentManager.getNextSegment();
        let segmentMargins = nextSegment.getMarginsVec2();
        
        this.lasthit = hitlinePosition.x + hitlineLenght;

        if(this.lasthit >= segmentMargins.x && this.lasthit <= segmentMargins.y){
            this.segmentManager.swap();
            this.player.run();
        }
        else{
            this.player.run();
        }
    }

    public GetProximateSegment(): Segment {
        return this.segmentManager.getProximate();
    }

    public GetLasthit(): number {
        return this.lasthit;
    }
}
