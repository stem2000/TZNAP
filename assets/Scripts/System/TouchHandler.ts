const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchHandler extends cc.Component {

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart (event) {
        let screenPos = event.getLocation();
        cc.log("Touch Start at:", screenPos);
    }

    onTouchEnd (event) {
        let screenPos = event.getLocation();
        cc.log("Touch End at:", screenPos);
    }

    onDestroy () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
}
