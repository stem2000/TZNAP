import { IBootable, IInjectable } from "../../Interfaces/Interfaces";
import { ServiceLocator } from "../../System/ServiceLocator";
import CameraBox from "../CameraBox";
import Segment from "./Segment";
import SegmentMover from "./SegmentMover";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BasicMover extends SegmentMover implements IInjectable, IBootable{
    private segments : Segment[];
    private cameraBox: CameraBox;


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



    public override _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.cameraBox = servloc.get(CameraBox);
    }

    public override _init_(): void{
        
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

    private swap(){
        let temp = this.segments[0];

        this.segments[0].moveQuick(this.RightPoint);

        this.segments[0] = this.segments[1];
        this.segments[1] = this.segments[0];
    }
}