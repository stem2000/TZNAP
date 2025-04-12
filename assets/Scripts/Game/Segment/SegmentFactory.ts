import { IServiced } from "../../Interfaces/Interfaces";
import PrefabStorage from "../../System/PrefabStorage";
import { ServiceLocator } from "../../System/ServiceLocator";
import Segment from "./Segment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SegmentFactory implements IServiced{

    segmentPrefab: cc.Prefab;
    segmentCount: number = 3;

    constructor() {
        this._get_services_on_ctor();
    }

    getSegment(){
        return cc.instantiate(this.segmentPrefab).getComponent(Segment);
    }

    getSegments(count:number): Segment[] {
        let segments : Segment[];
        
        segments = new Segment[count];
        for(let i = 0; i < segments.length; i++){
            segments[i] = this.getSegment();
        }

        return segments;
    }

    _get_services_on_ctor(){
        let servloc = ServiceLocator.getGlobal();
        let prefabHolder = servloc.tryGet(PrefabStorage);

        this.segmentPrefab = prefabHolder.getPrefab('Segment');
    }
}
