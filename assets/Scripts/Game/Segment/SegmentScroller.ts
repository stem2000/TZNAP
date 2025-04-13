import { ServiceLocator } from "../../System/ServiceLocator";
import CameraBox from "../CameraBox";
import Segment from "./Segment";
import SegmentCycler from "./SegmentCycle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentScroller extends cc.Component{
    segmentCycler : SegmentCycler;
    cameraBox: CameraBox;

    public initialize(segments: Segment[]){
        segments.forEach(element => {
            this.node.addChild(element.node);
        });

        this.segmentCycler = new SegmentCycler(segments);
    }

    public scroll(){

    }


}
