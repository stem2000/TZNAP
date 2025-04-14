import { IService } from "../../Interfaces/Interfaces";
import EliminationQueue from "../../System/DataStructures/EliminationQueue";
import { ServiceLocator } from "../../System/ServiceLocator";
import CameraBox from "../CameraBox";
import Segment from "./Segment";
import SegmentFactory from "./SegmentFactory";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentMover extends cc.Component implements IService{
    public initialize(segments: Segment[]){}
    public getPlayerSegment(): Segment {return undefined;};
    public getTargetSegment(): Segment {return undefined;};
    public move(){};

    public _linkService(): void {}
}