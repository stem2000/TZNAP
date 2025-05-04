import { IBootable, IInjectable } from "../../Interfaces/Interfaces";
import PrefabStorage from "../../System/PrefabStorage";
import { Constructor, ServiceContainer } from "../../System/ServiceContainer";
import CameraBox from "../CameraBox";
import SegmentBuilder from "../SegmentBuilder";
import Segment from "./Segment";
import SegmentManager from "./SegmentManager";
import Event from "../../System/Event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TwoSegmentsManager extends SegmentManager implements IInjectable, IBootable{
    private segments: Segment[];
    private cameraBox: CameraBox;
    private segmentBuilder: SegmentBuilder;

    private eventMoveEnded: Event;


    public override _inject_(container: ServiceContainer): void {
        this.cameraBox = container.get(CameraBox);
        
        this.segmentBuilder = new SegmentBuilder(this.cameraBox, container.get(PrefabStorage));
    }

    public override get _ctor_(): Constructor {
        return SegmentManager;
    }

    public override _init_(): void{
        this.segments = this.segmentBuilder.buildOneSegmentedLevel();
        this.eventMoveEnded = new Event();
    }


    public override addSegments(segments: Segment[]){        
        this.segments = segments;
    }

    public override move() {
        let tweenToLeft = this.segments[0].getTweenTo(this.leftPoint);
        let tweenToRandom = this.segments[1].rebuild().getTweenTo(this.getRandomPoint(this.segments[1].width));

        tweenToLeft.call(() => tweenToRandom.call(() => {this.eventMoveEnded.Invoke()}).start()).start();
    }

    public override getProximate(): Segment {
        return this.segments[0];
    }

    public override getNext(): Segment {
        return this.segments[1];
    }

    public override swap(){
        let temp = this.segments[0];

        this.segments[0].moveQuick(this.rightPoint);

        this.segments[0] = this.segments[1];
        this.segments[1] = temp;
    }

    public override subscribeToMoveEndedEvent(func: Function){
        this.eventMoveEnded.Subscribe(func);
    }

    public override unsubscribeFromMoveEndedEvent(func: Function){
        this.eventMoveEnded.Unsubscribe(func);
    }
    
    private get rightPoint(): cc.Vec3{
        let x = this.cameraBox.right;

        return new cc.Vec3(x, this.cameraBox.bot, 0);
    }

    private get leftPoint(): cc.Vec3{
        let x = this.cameraBox.left;

        return new cc.Vec3(x, this.cameraBox.bot, 0);
    }

    private getRandomPoint(width: number): cc.Vec3{
        var leftLimit = this.cameraBox.left + this.segments[0].width + 0.1;
        var rightLimit = this.cameraBox.right - width;

        let x = Math.randomInRange(leftLimit, rightLimit);

        return new cc.Vec3(x, this.cameraBox.bot, 0);
    }
}