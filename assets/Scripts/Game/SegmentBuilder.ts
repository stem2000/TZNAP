import PrefabStorage from "../System/PrefabStorage";
import { PrefabType } from "../System/PrefabType";
import CameraBox from "./CameraBox";
import { LevelType } from "./LevelType";
import Segment from "./Segment/Segment";
import SegmentFactory from "./Segment/SegmentFactory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentBuilder{
    cameraBox: CameraBox;
    commonSegment: cc.Prefab;

    public constructor(cameraBox: CameraBox, prefabStorage: PrefabStorage){
        this.cameraBox = cameraBox;
        this.commonSegment = prefabStorage.getPrefabLazy(PrefabType.CommonSegment);
    }

    getLevelSegments(levelType: LevelType) : Segment[]{
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
        let segments = this.createSegments(this.commonSegment);

        segments[0].moveQuick(new cc.Vec3(-segments[0].width / 2, this.cameraBox.bot, 0));
        segments[1].moveQuick(new cc.Vec3(this.cameraBox.right, this.cameraBox.bot, 0));

        return segments;
    }

    buildTwoSegmentedLevel() : Segment[]{
        let segments = this.createSegments(this.commonSegment);

        return segments;
    }

    createSegments(segement: cc.Prefab): Segment[]{
        let segments = new SegmentFactory(segement).createSegments(2);

        let scene = cc.director.getScene();

        scene.addChild(segments[0].node);
        scene.addChild(segments[1].node);

        segments.forEach((segment) => {
            segment.build();
        });

        return segments;
    }
}


