import SegmentCycler from "./SegmentCycle";
import SegmentFactory from "./SegmentFactory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentScroller extends cc.Component {
    segmentCycler : SegmentCycler;
    // onLoad () {}

    start () {
        this.segmentCycler = new SegmentCycler(new SegmentFactory().getSegments(3));
    }
    // update (dt) {}
}
