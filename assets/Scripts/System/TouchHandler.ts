import SegmentScroller from "../Game/Segment/SegmentScroller";
import { IService } from "../Interfaces/Interfaces";
import { ServiceLocator } from "./ServiceLocator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchHandler extends cc.Component implements IService {

    private segmentScroller: SegmentScroller;

    onLoad () {
        let servloc = ServiceLocator.getGlobal();

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.segmentScroller = servloc.get(SegmentScroller);
    }

    onTouchStart (event) {
        let screenPos = event.getLocation();
    }

    onTouchEnd (event) {
        let screenPos = event.getLocation();

        this.segmentScroller.scroll();
    }

    onDestroy () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    _linkService(): void {}
}
