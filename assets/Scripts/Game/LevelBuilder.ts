import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import iBootable from "../System/iBootable";
import { ServiceLocator } from "../System/ServiceLocator";
import CameraBox from "./CameraBox";
import Player from "./Player/Player";
import Segment from "./Segment/Segment";
import SegmentFactory from "./Segment/SegmentFactory";
import SegmentMover from "./Segment/SegmentMover";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelBuilder extends iBootable{
    segmentMover: SegmentMover;
    cameraBox: CameraBox;
    player: Player;

    _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.cameraBox = servloc.get(CameraBox);
        this.segmentMover = servloc.get(SegmentMover);
    }

    _init_(): void {}


    buildOneSegmentedLevel(){
        let segments = this.createSegments();
    }

    buildTwoSegmentedLevel(){

    }

    createSegments(): Segment[]{
        let segments = new SegmentFactory().createSegments(2);

        let scene = cc.director.getScene();

        scene.addChild(segments[0].node);
        scene.addChild(segments[1].node);

        segments.forEach((segment) => {
            segment.build();
        });

        segments[0].moveQuick(new cc.Vec3(-segments[0].width / 2, this.cameraBox.bot, 0));
        segments[1].moveQuick(new cc.Vec3(this.cameraBox.right, this.cameraBox.bot, 0));

        this.segmentMover.addSegments(segments);

        return segments;
    }
}
