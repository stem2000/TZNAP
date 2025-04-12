import Segment from "./Game/Segment/Segment";
import {IServiced, IServicedComponent} from "./Interfaces/Interfaces";
import PrefabStorage from "./System/PrefabStorage";
import { ServiceLocator } from "./System/ServiceLocator";

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

    _get_services_on_ctor(){
        let servloc = ServiceLocator.getGlobal();
        let prefabHolder = servloc.tryGet(PrefabStorage);

        this.segmentPrefab = prefabHolder.getPrefab('Segment');
    }
}
