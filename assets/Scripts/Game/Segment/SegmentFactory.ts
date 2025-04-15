import { IInjectable } from "../../Interfaces/Interfaces";
import PrefabStorage from "../../System/PrefabStorage";
import { ServiceLocator } from "../../System/ServiceLocator";
import Segment from "./Segment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentFactory implements IInjectable{

    segmentPrefab: cc.Prefab;
    segmentCount: number = 3;


    constructor() {
        this._inject_();
    }


    _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.segmentPrefab = servloc.get(PrefabStorage).getPrefabLazy("Segment");
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
