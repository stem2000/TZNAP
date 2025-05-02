import { IBootable, IInjectable } from "../../Interfaces/Interfaces";
import PrefabStorage from "../../System/PrefabStorage";
import { Constructor, ServiceContainer } from "../../System/ServiceContainer";
import CameraBox from "../CameraBox";
import Player from "../Player/Player";
import SegmentBuilder from "../SegmentBuilder";
import Segment from "./Segment";
import SegmentManager from "./SegmentManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TwoSegmentsManager extends SegmentManager implements IInjectable, IBootable{
    private segments: Segment[];
    private cameraBox: CameraBox;
    private segmentBuilder: SegmentBuilder;
    private player: Player;

    public override _inject_(container: ServiceContainer): void {
        this.cameraBox = container.get(CameraBox);
        this.player = container.get(Player);
        
        this.segmentBuilder = new SegmentBuilder(this.cameraBox, container.get(PrefabStorage));
    }

    public override get _ctor_(): Constructor {
        return SegmentManager;
    }

    public override _init_(): void{
        this.segments = this.segmentBuilder.buildOneSegmentedLevel();
    }


    public override addSegments(segments: Segment[]){        
        this.segments = segments;
    }

    public override move() {
        let tweenToLeft = this.segments[0].getTweenTo(this.leftPoint);
        let tweenToRandom = this.segments[1].rebuild().getTweenTo(this.randomPoint);

        tweenToLeft.call(()=>
            tweenToRandom.call(() => {this.onMoveEnded()}).start()
        ).start();
    }

    public override getProximate(): Segment {
        return this.segments[0];
    }

    public override getNextSegment(): Segment {
        return this.segments[1];
    }

    public override swap(){
        let temp = this.segments[0];

        this.segments[0].moveQuick(this.RightPoint);

        this.segments[0] = this.segments[1];
        this.segments[1] = this.segments[0];
    }

    private onMoveEnded(){
        this.player.moveToEdge();
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
            this.segments[0].getRightEnd().x + 0.1, 
            this.cameraBox.right - this.segments[1].width);

        return new cc.Vec3(x, this.cameraBox.bot, 0);
    }
}