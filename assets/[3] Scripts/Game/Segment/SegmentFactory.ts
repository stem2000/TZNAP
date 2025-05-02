import Segment from "./Segment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentFactory{

    segmentPrefab: cc.Prefab;
    segmentCount: number = 3;


    constructor(segment: cc.Prefab) {
        this.segmentPrefab = segment;
    }

    createSegment(){
        return cc.instantiate(this.segmentPrefab).getComponent(Segment);
    }

    createSegments(count:number): Segment[] {
        let segments : Segment[] = [];
        
        for(let i = 0; i < count; i++){
            segments.push(this.createSegment());
        }

        return segments;
    }
}
