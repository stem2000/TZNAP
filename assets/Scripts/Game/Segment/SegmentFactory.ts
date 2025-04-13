import PrefabStorage from "../../System/PrefabStorage";
import { ServiceLocator } from "../../System/ServiceLocator";
import Segment from "./Segment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentFactory {

    segmentPrefab: cc.Prefab;
    segmentCount: number = 3;

    constructor(segmentPrefab: cc.Prefab) {
        this.segmentPrefab = segmentPrefab;
    }

    createSegment(){
        return cc.instantiate(this.segmentPrefab).getComponent(Segment);
    }

    createSegments(count:number): Segment[] {
        console.log(count);
        let segments : Segment[] = [];
        
        for(let i = 0; i < count; i++){
            segments.push(this.createSegment());
        }

        return segments;
    }
}
