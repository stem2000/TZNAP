import { IService } from "../Interfaces/Interfaces";
import { ServiceLocator } from "../System/ServiceLocator";
import CameraBox from "./CameraBox";
import SegmentScroller from "./Segment/SegmentScroller";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelBuilder extends cc.Component implements IService{
    segmentScroller: SegmentScroller;
    cameraBox: CameraBox;


    buildOneSegmentedLevel(){
        let segment = this.segmentScroller.current;

        this.segmentScroller.initialize(new cc.Vec3(- segment.width / 2,this.cameraBox.bot,0));
    }

    buildTwoSegmentedLevel(){

    }

    _linkService(): void {
        let servloc = ServiceLocator.getGlobal();

        this.cameraBox = servloc.get(CameraBox);
        this.segmentScroller = servloc.get(SegmentScroller);
    }
}
