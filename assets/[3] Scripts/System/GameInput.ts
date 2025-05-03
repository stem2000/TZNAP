import aBootableServiceComponent from "./aBootableServiceComponent";
import { ServiceContainer } from "./ServiceContainer";
import Event from "./Event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameInput extends aBootableServiceComponent{

    private eventOnTouchStart: Event;
    private eventOnTouchEnd: Event;


    _inject_(container: ServiceContainer): void {}

    _init_(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.eventOnTouchStart = new Event();
        this.eventOnTouchEnd = new Event();
    }

    onTouchStart() {
        this.eventOnTouchStart.Invoke();
    }

    onTouchEnd() {
        this.eventOnTouchEnd.Invoke();
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    public subcribeToOnTouchStart(func: Function){
        this.eventOnTouchStart.Subscribe(func);
    }

    public subcribeToOnTouchEnd(func: Function){
        this.eventOnTouchEnd.Subscribe(func);
    }

    public unsubcribeFromOnTouchStart(func: Function){
        this.eventOnTouchStart.Unsubscribe(func);
    }

    public unsubscribeFromOnTouchEnd(func: Function){
        this.eventOnTouchEnd.Unsubscribe(func);
    }
}
