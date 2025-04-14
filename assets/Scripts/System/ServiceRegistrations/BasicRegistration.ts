import CameraBox from "../../Game/CameraBox";
import LevelBuilder from "../../Game/LevelBuilder";
import LevelLoader from "../../Game/LevelLoader";
import SegmentMover from "../../Game/Segment/SegmentMover";
import PrefabStorage from "../PrefabStorage";
import { ServiceLocator } from "../ServiceLocator";
import TouchHandler from "../TouchHandler";
import ServiceRegistration from "./ServiceRegistration";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class BasicRegistration extends ServiceRegistration {
    @property(CameraBox)
    cameraBox: CameraBox = null;

    @property(PrefabStorage)
    prefabStorage: PrefabStorage = null;

    @property(SegmentMover)
    segmentMover: SegmentMover = null;

    @property(TouchHandler)
    touchHandler: TouchHandler = null;

    @property(LevelBuilder)
    levelBuilder: LevelBuilder = null;

    @property(LevelLoader)
    levelLoader: LevelLoader = null;

    public override RegisterAll() {
        let servloc = ServiceLocator.getGlobal();

        servloc.register(CameraBox, this.cameraBox);
        servloc.register(PrefabStorage, this.prefabStorage);
        servloc.register(SegmentMover, this.segmentMover);
        servloc.register(TouchHandler, this.touchHandler);
        servloc.register(LevelBuilder, this.levelBuilder);
        servloc.register(LevelLoader, this.levelLoader);

        this.linkAll();
    }

    private linkAll(){
        this.levelBuilder._linkService();
        this.levelLoader._linkService();
        this.segmentMover._linkService();
        this.cameraBox._linkService();
        this.prefabStorage._linkService();
        this.touchHandler._linkService();
    }
}
