import { ServiceLocator } from "../System/ServiceLocator";
import iBootable from "../System/iBootable";
import iBootableComponent from "../System/iBootableComponent";
import Player from "./Player/Player";
import Segment from "./Segment/Segment";
import SegmentManager from "./Segment/SegmentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerValidator extends iBootable{

    player: Player;
    segmentManager: SegmentManager;
    lasthit_: number;

    public get lasthit(): number{
        return this.lasthit;
    }

    public _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.segmentManager = servloc.get(SegmentManager);
        this.player = servloc.get(Player);
    }

    public _init_(): void {}

    public GetProximateSegment(): Segment{
        return this.segmentManager.getProximate();
    }

    public ValidateHit(hitlinePosition: cc.Vec2, hitlineLenght: number){
        let nextSegment = this.segmentManager.getNextSegment();
        let segmentMargins = nextSegment.getMarginsVec2();
        
        this.lasthit_ = hitlinePosition.x + hitlineLenght;
        cc.log(hitlinePosition.x, hitlineLenght, this.lasthit_, segmentMargins);

        if(this.lasthit_ >= segmentMargins.x && this.lasthit_ <= segmentMargins.y){
            this.player.RunToSegment();
            this.segmentManager.swap();
        }
        else{
            this.player.RunToFall();
        }
    }

    public moveSegments(){
        this.segmentManager.move();
    }
}
