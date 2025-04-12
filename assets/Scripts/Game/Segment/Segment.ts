// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Bridge from "../Bridge";
import Limits from "../Limits";


const {ccclass, property} = cc._decorator;


@ccclass
export default class Segment extends cc.Component {

    @property(Limits)
    private widthLimits: Limits = null;

    @property(cc.Float)
    private height: number = 5;

    private width: number;

    private bridge: Bridge;

    onLoad(){

    }

    public Rebuild() {
        this.width = this.widthLimits.getValueInLimits();

        this.bridge.node.position = new cc.Vec3(this.GetRightEndX(), this.height, 0);
    }

    public GetLeftEndX(){
        return this.node.position.x - this.width / 2;
    }

    public GetRightEndX(){
        return this.node.position.x + this.width / 2;
    }

    public GetBridge(): Bridge{
        return this.bridge;
    }
}
