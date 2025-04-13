import Limits from "./Limits";
import SegmentView from "./SegmentView";


const {ccclass, property} = cc._decorator;


@ccclass()
export default class Segment extends cc.Component {

    @property(Limits)
    private widthLimits: Limits = null;

    @property(SegmentView)
    private view: SegmentView = null;

    @property(cc.Float)
    private height: number = 300;

    @property(cc.Float)
    private width: number = 100;


    public Build(position: cc.Vec3){
        this.node.position = position;

        this.view.rebuild(this.width, this.height);
    }

    public Rebuild(position: cc.Vec3) {
        this.node.position = position;
        this.width = this.widthLimits.getValueInLimits();

        this.view.rebuild(this.width, this.height);
    }

    public GetLeftEnd(): cc.Vec2{
        let leftEnd = new cc.Vec2();

        leftEnd.x = this.node.position.x - this.width / 2;
        leftEnd.y = this.height;

        return leftEnd;
    }

    public GetRightEnd(){
        let rightEnd = new cc.Vec2();

        rightEnd.x = this.node.position.x + this.width / 2;
        rightEnd.y = this.height;

        return rightEnd;
    }
}
