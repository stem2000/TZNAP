const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentView extends cc.Component {
    @property(cc.Sprite)
    body: cc.Sprite = null;

    @property(cc.Sprite)
    perfectZone: cc.Sprite = null;

    start(){

    }

    public rebuild(width: number, height: number, center: number){
        this.body.node.setContentSize(width, height);
        this.perfectZone.node.position = new cc.Vec3(center, height, 0);
    }
}
