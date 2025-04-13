import { IService } from "../../Interfaces/Interfaces";
import EliminationQueue from "../../System/DataStructures/EliminationQueue";
import { ServiceLocator } from "../../System/ServiceLocator";
import CameraBox from "../CameraBox";
import Segment from "./Segment";
import SegmentCycle from "./SegmentCycle";
import SegmentFactory from "./SegmentFactory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentScroller extends cc.Component implements IService{

    @property(cc.Integer)
    segmentCount: number = 3;

    @property(cc.Integer)
    segmentsOnScreen: number = 2;

    segmentCycle : SegmentCycle;
    cameraBox: CameraBox;

    eliminationQueue: EliminationQueue<Segment> = new EliminationQueue<Segment>(this.segmentsOnScreen);


    public get current() : Segment{
        return this.segmentCycle.getCurrent();
    }


    public onLoad(){
        let segments: Segment[];

        segments = new SegmentFactory().createSegments(this.segmentCount);
        segments.forEach(element => {
            this.node.addChild(element.node);
        });

        this.segmentCycle = new SegmentCycle(segments);
    }

    public initialize(position: cc.Vec3){
        let current = this.segmentCycle.getCurrent();

        current.node.setPosition(position);
        this.eliminationQueue.enqueue(current);
    }

    public scroll(){
        let current = this.segmentCycle.getCurrent();
        let next = this.segmentCycle.toNext();

        next.Rebuild();

        this.moveSegments(current, next);
        this.enqueueToEliminate(next);
    }

    private moveSegments( current: Segment, next: Segment){
        current.node.position = new cc.Vec3(this.cameraBox.left, this.cameraBox.bot, 0);
        next.node.setPosition(this.findPosition(current, next));
    }

    private findPosition(current: Segment, next: Segment): cc.Vec3{
        let min = current.GetRightEnd().x + current.width / 2;
        let max = this.cameraBox.right - next.width;
        let x = Math.randomInRange(min, max);

        return new cc.Vec3(x, this.cameraBox.bot, 0);
    }

    private enqueueToEliminate(segment : Segment){
        let eliminated = this.eliminationQueue.enqueue(segment);

        eliminated?.node.setPosition(new cc.Vec3(this.cameraBox.right * 2, this.cameraBox.bot, 0));

        console.log("eliminated position - " + eliminated?.node.position + " queue - " + this.eliminationQueue);
    }

    _linkService(): void {
        let servloc = ServiceLocator.getGlobal();

        this.cameraBox = servloc.get(CameraBox);
    }


}
