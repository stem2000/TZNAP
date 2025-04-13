const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentView extends cc.Component {
    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    public rebuild(width: number, height: number){
        this.sprite.node.setContentSize(width, height);
    }
}
