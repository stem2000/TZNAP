import { IBootable, IInjectable } from "../../Interfaces/Interfaces";
import iBootableComponent from "../../System/iBootableComponent";
import { ServiceLocator } from "../../System/ServiceLocator";
import CameraBox from "../CameraBox";
import Segment from "./Segment";
import SegmentFactory from "./SegmentFactory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentManager extends iBootableComponent{
    public _init_(): void {}
    public _inject_(): void {}

    public addSegments(segments: Segment[]){}

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