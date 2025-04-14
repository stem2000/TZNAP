import { IService } from "../../Interfaces/Interfaces";
import { ServiceLocator } from "../../System/ServiceLocator";
import CameraBox from "../CameraBox";
import Segment from "./Segment";
import SegmentMover from "./SegmentMover";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BasicMover extends SegmentMover implements IService{
    private playerSeg: Segment;
    private targetSeg: Segment;
    private offScreenSeg: Segment;
    private cameraBox: CameraBox;


    public override initialize(segments: Segment[]){        
        this.playerSeg = segments[0];
        this.targetSeg = segments[1];
        this.offScreenSeg = segments[2];
    }

    public override getPlayerSegment(): Segment {
        return this.playerSeg;
    }

    public override getTargetSegment(): Segment {
        return this.targetSeg;
    }

    public override _linkService(): void {
        let servloc = ServiceLocator.getGlobal();

        this.cameraBox = servloc.get(CameraBox);
    }

    public override move() {
        this.moveAway(this.playerSeg);
        this.moveToLeftCorner(this.targetSeg);
        this.moveToRandomPoint(this.offScreenSeg);

        this.swap();
    }

    private moveAway(segment: Segment){
        let x = this.cameraBox.left - this.playerSeg.width;
        let y = segment.node.position.y;
        let z = segment.node.position.z;

        segment.Move(new cc.Vec3(x,y,z));
    }

    private moveToLeftCorner(segment: Segment){
        let x = this.cameraBox.left;
        let y = segment.node.position.y;
        let z = segment.node.position.z;

        segment.Move(new cc.Vec3(x, y, z));
    }

    private moveToRandomPoint(segment: Segment){
        let x = Math.randomInRange( this.targetSeg.GetRightEnd().x + 2, this.cameraBox.right - this.offScreenSeg.width);
        let y = segment.node.position.y;
        let z = segment.node.position.z;

        this.offScreenSeg.BuildRandom();
        this.offScreenSeg.Move(new cc.Vec3(x, y, z));
    }

    private swap(){
        let playerSeg = this.playerSeg;

        this.playerSeg = this.targetSeg;
        this.targetSeg = this.offScreenSeg;
        this.offScreenSeg = playerSeg;
    }
}
