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

    public _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.segmentManager = servloc.get(SegmentManager);
    }

    public _init_(): void {}

    public GetProximateSegment(): Segment{
        return this.segmentManager.getProximate();
    }

    public ValidateHit(hitlinePosition: cc.Vec2, hitlineLenght: number){
        
    }
}
