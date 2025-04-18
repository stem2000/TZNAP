import { GlobalEvent } from "../Game/GlobalEvent";
import SegmentManager from "../Game/Segment/SegmentManager";
import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import iBootableComponent from "./iBootableComponent";
import { ServiceLocator } from "./ServiceLocator";
import { StateMachine } from "./StateMachine/StateMachine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InputHandler extends iBootableComponent{

    _inject_(): void {}

    _init_(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart (event) {
        let screenPos = event.getLocation();
        cc.systemEvent.emit(GlobalEvent.ScreenTouchStarted);
    }

    onTouchEnd (event) {
        let screenPos = event.getLocation();
        cc.systemEvent.emit(GlobalEvent.ScreenTouchEnded);
    }

    onDestroy () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    public inputOn(){

    }

    public inputOff(){

    }
}
