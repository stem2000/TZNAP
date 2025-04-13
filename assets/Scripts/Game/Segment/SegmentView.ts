const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentView extends cc.Component {
    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    start(){
        this.node.color = new cc.Color(Math.randomInRange(0, 255), Math.randomInRange(0, 255), Math.randomInRange(0, 255), 255);
    }

    public rebuild(width: number, height: number){
        this.sprite.node.setContentSize(width, height);
    }
}
