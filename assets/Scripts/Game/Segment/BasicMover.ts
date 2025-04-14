import { IService } from "../../Interfaces/Interfaces";
import { ServiceLocator } from "../../System/ServiceLocator";
import CameraBox from "../CameraBox";
import Segment from "./Segment";
import SegmentMover from "./SegmentMover";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BasicMover extends SegmentMover implements IService{
    private left: Segment;
    private mid: Segment;
    private right: Segment;
    private cameraBox: CameraBox;


    public override initialize(segments: Segment[]){        
        this.left = segments[0];
        this.mid = segments[1];
        this.right = segments[2];
    }

    public override getPlayerSegment(): Segment {
        return this.left;
    }

    public override getPlayerNextSegment(): Segment {
        return this.mid;
    }

    public override _linkService(): void {
        let servloc = ServiceLocator.getGlobal();

        this.cameraBox = servloc.get(CameraBox);
    }

    public override move() {
        this.moveLeft();
        this.moveMid();
        this.moveRight();

        this.swap();
    }

    private moveLeft(){
        this.left.Move(
            new cc.Vec3(
                this.cameraBox.left - this.left.width,
                this.mid.node.position.y,
                this.mid.node.position.z
                )
        );
    }

    private moveMid(){
        this.mid.Move( 
            new cc.Vec3(
                this.cameraBox.left,
                this.mid.node.position.y,
                this.mid.node.position.z
            )
        );
    }

    private moveRight(){
        this.right.BuildRandom();
        this.right.Move(
            new cc.Vec3(
                Math.randomInRange(
                    this.mid.GetRightEnd().x + 2, 
                    this.cameraBox.right - this.right.width
                ),
                this.right.node.position.y,
                this.right.node.position.z
            )
        )
    }

    private swap(){
        let left = this.left;
        let mid = this.mid;
        let right = this.right;

        this.left = mid;
        this.mid = right;
        this.right = left;
    }
}
