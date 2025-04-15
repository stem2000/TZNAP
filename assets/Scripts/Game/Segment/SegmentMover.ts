import { IBootable, IInjectable } from "../../Interfaces/Interfaces";
import gBootableComponent from "../../System/gBootableComponent";
import { ServiceLocator } from "../../System/ServiceLocator";
import CameraBox from "../CameraBox";
import Segment from "./Segment";
import SegmentFactory from "./SegmentFactory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentMover extends gBootableComponent{
    public _init_(): void {}
    public _inject_(): void {}

    public addSegments(segments: Segment[]){}

    public getNext(): Segment {
        cc.log("Should override super.getNext() on " + this);    
        return undefined;
    };

    public move(){};

}