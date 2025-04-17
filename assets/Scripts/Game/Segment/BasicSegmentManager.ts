import { IBootable, IInjectable } from "../../Interfaces/Interfaces";
import { Constructor, ServiceLocator } from "../../System/ServiceLocator";
import CameraBox from "../CameraBox";
import SegmentBuilder from "../SegmentBuilder";
import Segment from "./Segment";
import SegmentManager from "./SegmentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BasicSegmentManager extends SegmentManager implements IInjectable, IBootable{
    private segments: Segment[];
    private cameraBox: CameraBox;
    private segmentBuilder: SegmentBuilder;

    public override _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.cameraBox = servloc.get(CameraBox);
    }

    public override get _ctor_(): Constructor {
        return SegmentManager;
    }

    public override _init_(): void{
        this.segmentBuilder = new SegmentBuilder(this.cameraBox);

        this.segments = this.segmentBuilder.buildOneSegmentedLevel();
    }


    public override addSegments(segments: Segment[]){        
        this.segments = segments;
    }

    public override move() {
        let tweenToLeft = this.segments[0].getTweenTo(this.leftPoint);
        let tweenToRandom = this.segments[1].rebuild().getTweenTo(this.randomPoint);

        tweenToLeft.call(()=>
            tweenToRandom.start()
        ).start();
    }

    public override getNext(): Segment {
        return this.segments[1];
    }

    private swap(){
        let temp = this.segments[0];

        this.segments[0].moveQuick(this.RightPoint);

        this.segments[0] = this.segments[1];
        this.segments[1] = this.segments[0];
    }

    
    private get RightPoint(): cc.Vec3{
        let x = this.cameraBox.right;

        return new cc.Vec3(x, this.cameraBox.bot, 0);
    }

    private get leftPoint(): cc.Vec3{
        let x = this.cameraBox.left;

        return new cc.Vec3(x, this.cameraBox.bot, 0);
    }

    private get randomPoint(): cc.Vec3{
        let x = Math.randomInRange(
            this.segments[0].getRightEnd().x + this.segments[0].width / 2, 
            this.cameraBox.right - this.segments[1].width);

        return new cc.Vec3(x, this.cameraBox.bot, 0);
    }
}