import PrefabStorage from "../System/PrefabStorage";
import { ServiceLocator } from "../System/ServiceLocator";
import Segment from "./Segment/Segment";
import SegmentFactory from "./Segment/SegmentFactory";
import SegmentScroller from "./Segment/SegmentScroller";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelBuilder extends cc.Component{
    segmentScroller: SegmentScroller;
    segmentPrefab: cc.Prefab;

    onLoad(){
        let servloc = ServiceLocator.getGlobal();

        this.segmentScroller = servloc.get(SegmentScroller);
        this.segmentPrefab = servloc.get(PrefabStorage).getPrefab("Segment");
    }
    
    start(){
        this.buildSegments();
    }

    buildSegments(){
        let segments: Segment[];

        segments = new SegmentFactory(this.segmentPrefab).createSegments(3);

        this.segmentScroller.initialize(segments);

        segments[0].Build(new cc.Vec3(0,0,0));
    }
}
