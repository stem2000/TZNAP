import { IBootable, IInjectable } from "../../Interfaces/Interfaces";
import aBootableServiceComponent from "../../System/aBootableServiceComponent";
import { ServiceContainer } from "../../System/ServiceContainer";
import CameraBox from "../CameraBox";
import Segment from "./Segment";
import SegmentFactory from "./SegmentFactory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentManager extends aBootableServiceComponent{
    public _init_(): void {}
    public _inject_(container: ServiceContainer): void {}

    protected addSegments(segments: Segment[]){}

    public getNextSegment(): Segment {
        cc.log("Should override super.getNext() on " + this);    
        return undefined;
    };

    public getProximate(): Segment{
        cc.log("Should override super.getProximate() on " + this);
        return undefined;
    }

    public move(){};

    public swap(){};

}