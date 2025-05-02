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

    private get center(): number{
        let center = this.width / 2;

        return center;
    }


    public build(): Segment{
        this.view.rebuild(this.width_, this.height_, this.center);

        return this;
    }

    public rebuild():Segment {
        this.width_ = this.widthLimits.getValueInLimits();

        this.view.rebuild(this.width_, this.height_, this.center);
        return this;
    }

    public moveQuick(position: cc.Vec3){
        this.node.position = position;
    }

    public getTweenTo(point: cc.Vec3): cc.Tween<cc.Node>{
        return cc.tween(this.node).to(0.2, {position: point});
    }


    public getLeftEnd(): cc.Vec2{
        let leftEnd = new cc.Vec2();
        let worldPosition = this.node.convertToWorldSpaceAR(cc.v2(0, 0));

        leftEnd.x = worldPosition.x - this.width_;
        leftEnd.y = worldPosition.y + this.height_;

        return leftEnd;
    }

    public getRightEnd(){
        let rightEnd = new cc.Vec2();
        let worldPosition = this.node.convertToWorldSpaceAR(cc.v2(0, 0));

        rightEnd.x = worldPosition.x + this.width_;
        rightEnd.y = worldPosition.y + this.height_;

        return rightEnd;
    }

    public getMarginsVec2(): cc.Vec2{
        let worldPosition = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let margins = new cc.Vec2;

        margins.x = worldPosition.x - this.width_;
        margins.y = worldPosition.x + this.width_;

        return margins;
    }
}
