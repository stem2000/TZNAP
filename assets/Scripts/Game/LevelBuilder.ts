import { IService } from "../Interfaces/Interfaces";
import { ServiceLocator } from "../System/ServiceLocator";
import CameraBox from "./CameraBox";
import Segment from "./Segment/Segment";
import SegmentFactory from "./Segment/SegmentFactory";
import SegmentMover from "./Segment/SegmentMover";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelBuilder extends cc.Component implements IService{
    segmentMover: SegmentMover;
    cameraBox: CameraBox;


    buildOneSegmentedLevel(){
        console.log("build");
        let segments = this.createSegments(3);

        segments[1].Build(
            new cc.Vec3(
                -segments[1].width / 2, 
                this.cameraBox.bot,
                segments[1].node.position.z
                )   
            );

        this.segmentMover.initialize(segments);
    }

    buildTwoSegmentedLevel(){

    }

    createSegments(count: number) : Segment[]{
        let segments = new SegmentFactory().createSegments(count);

        segments.forEach(segment => {
            segment.Build(new cc.Vec3(this.cameraBox.right, this.cameraBox.bot, 0));
            this.segmentMover.node.addChild(segment.node);
        });

        return segments;
    }


    _linkService(): void {
        let servloc = ServiceLocator.getGlobal();

        this.cameraBox = servloc.get(CameraBox);
        this.segmentMover = servloc.get(SegmentMover);
    }
}
