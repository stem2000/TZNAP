import PrefabStorage from "../System/PrefabStorage";
import { ServiceLocator } from "../System/ServiceLocator";
import CameraBox from "./CameraBox";
import CameraMover from "./CameraMover";
import Segment from "./Segment/Segment";
import SegmentFactory from "./Segment/SegmentFactory";
import SegmentScroller from "./Segment/SegmentScroller";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelBuilder extends cc.Component{

    segmentScroller: SegmentScroller;
    segmentPrefab: cc.Prefab;
    cameraBox: CameraBox;
    cameraMover: CameraMover;


    onLoad(){
        let servloc = ServiceLocator.getGlobal();

        this.cameraBox = servloc.get(CameraBox);
        this.cameraMover = servloc.get(CameraMover);
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
        
        segments.forEach(element => {
            element.node.active = false;
        });

        segments[0].Build(new cc.Vec3(- segments[0].width / 2, this.cameraBox.bot, 0));
        segments[0].node.active = true;
    }
}
