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
    private height_: number = 6;

    @property(cc.Float)
    private width_: number = 4;


    public get width(): number{
        return this.width_;
    }

    public get height(): number{
        return this.height_;
    }


    public Build(position: cc.Vec3){
        this.node.position = position;

        this.view.rebuild(this.width_, this.height_);
    }

    public BuildRandom():Segment {
        this.width_ = this.widthLimits.getValueInLimits();

        this.view.rebuild(this.width_, this.height_);
        return this;
    }

    public Move(position: cc.Vec3){
        this.node.position = position;
    }

    public GetLeftEnd(): cc.Vec2{
        let leftEnd = new cc.Vec2();

        leftEnd.x = this.node.position.x - this.width_ / 2;
        leftEnd.y = this.height_;

        return leftEnd;
    }

    public GetRightEnd(){
        let rightEnd = new cc.Vec2();

        rightEnd.x = this.node.position.x + this.width_ / 2;
        rightEnd.y = this.height_;

        return rightEnd;
    }
}
