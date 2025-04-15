import SegmentMover from "../Game/Segment/SegmentMover";
import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import iBootableComponent from "./iBootableComponent";
import { ServiceLocator } from "./ServiceLocator";
import { StateMachine } from "./StateMachine/StateMachine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InputHandler extends iBootableComponent{

    private segmentMover: SegmentMover;
    private stateMachine : StateMachine = new StateMachine();;

    _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.segmentMover = servloc.get(SegmentMover);
    }

    _init_(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    update(){
        this.stateMachine.update();
    }

    onTouchStart (event) {
        let screenPos = event.getLocation();
    }

    onTouchEnd (event) {
        let screenPos = event.getLocation();

        //temporary
        this.segmentMover.move();
    }

    onDestroy () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
}
