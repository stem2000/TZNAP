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
    lasthit_: number;
    segmentManager: SegmentManager;

    proximateSegmentRequest: Request<[], Segment>;

    public get lasthit(): number{
        return this.lasthit;
    }

    public _inject_(container: ServiceContainer): void {
        this.segmentManager = container.get(SegmentManager);
        this.player = container.get(Player);
    }

    public _init_(): void {}

    public ValidateHit(hitlinePosition: cc.Vec2, hitlineLenght: number): boolean{
        let nextSegment = this.segmentManager.getNextSegment();
        let segmentMargins = nextSegment.getMarginsVec2();
        
        this.lasthit_ = hitlinePosition.x + hitlineLenght;

        if(this.lasthit_ >= segmentMargins.x && this.lasthit_ <= segmentMargins.y){
            this.segmentManager.swap();
            return true;
        }
        else{
            return false;
        }
    }

    public GetProximateRequestLazy(): Request<[], Segment>{
        if(this.proximateSegmentRequest){
            return this.proximateSegmentRequest;
        }
        else {
            this.proximateSegmentRequest = new Request<[], Segment>((): Segment => { return this.segmentManager.getProximate(); });

            return this.proximateSegmentRequest;
        }
    }
}
