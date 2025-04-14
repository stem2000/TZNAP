import SegmentMover from "../Game/Segment/SegmentMover";
import { IService } from "../Interfaces/Interfaces";
import { ServiceLocator } from "./ServiceLocator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchHandler extends cc.Component implements IService {

    private segmentMover: SegmentMover;

    onLoad () {
        let servloc = ServiceLocator.getGlobal();

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.segmentMover = servloc.get(SegmentMover);
    }

    onTouchStart (event) {
        let screenPos = event.getLocation();
    }

    onTouchEnd (event) {
        let screenPos = event.getLocation();

        this.segmentMover.move();
    }

    onDestroy () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    _linkService(): void {}
}
