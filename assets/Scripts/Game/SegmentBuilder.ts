import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import iBootable from "../System/iBootable";
import { ServiceLocator } from "../System/ServiceLocator";
import CameraBox from "./CameraBox";
import { LevelType } from "./LevelType";
import Player from "./Player/Player";
import Segment from "./Segment/Segment";
import SegmentFactory from "./Segment/SegmentFactory";
import SegmentMover from "./Segment/SegmentMover";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentBuilder{
    segmentMover: SegmentMover;
    cameraBox: CameraBox;


    getSegments(levelType: LevelType) : Segment[]{
        switch(levelType){
            case LevelType.OneSegmented:{
                let segments = this.buildOneSegmentedLevel();
                return segments;
            }
            case LevelType.TwoSegmented:{
                let segments = this.buildOneSegmentedLevel();
                return segments;
            }
        }
    }

    buildOneSegmentedLevel() : Segment[]{
        let segments = this.createSegments();

        segments[0].moveQuick(new cc.Vec3(-segments[0].width / 2, this.cameraBox.bot, 0));
        segments[1].moveQuick(new cc.Vec3(this.cameraBox.right, this.cameraBox.bot, 0));

        return segments;
    }

    buildTwoSegmentedLevel() : Segment[]{
        let segments = this.createSegments();

        return segments;
    }

    createSegments(): Segment[]{
        let segments = new SegmentFactory().createSegments(2);

        let scene = cc.director.getScene();

        scene.addChild(segments[0].node);
        scene.addChild(segments[1].node);

        segments.forEach((segment) => {
            segment.build();
        });

        return segments;
    }
}


