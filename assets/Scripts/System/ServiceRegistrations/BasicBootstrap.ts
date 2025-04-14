import CameraBox from "../../Game/CameraBox";
import GameFlow from "../../Game/GameFlow";
import { GlobalEvent } from "../../Game/GlobalEvent";
import LevelBuilder from "../../Game/LevelBuilder";
import LevelLoader from "../../Game/LevelLoader";
import Player from "../../Game/Player/Player";
import SegmentMover from "../../Game/Segment/SegmentMover";
import PrefabStorage from "../PrefabStorage";
import { ServiceLocator } from "../ServiceLocator";
import TouchHandler from "../TouchHandler";
import BootstrapStrategy from "./BootstrapStrategy";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class BasicBootstrap extends BootstrapStrategy {
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

    @property(Player)
    player: Player = null;

    @property(GameFlow)
    gameFlow: GameFlow = null;

    public override Boot() {
        let servloc = ServiceLocator.getGlobal();
        
        this.prefabStorage.initialize();

        servloc.register(CameraBox, this.cameraBox);
        servloc.register(PrefabStorage, this.prefabStorage);
        servloc.register(SegmentMover, this.segmentMover);
        servloc.register(TouchHandler, this.touchHandler);
        servloc.register(LevelBuilder, this.levelBuilder);
        servloc.register(LevelLoader, this.levelLoader);
        servloc.register(Player, this.player);
        servloc.register(GameFlow, this.gameFlow);

        this.linkAll();

        cc.systemEvent.emit(GlobalEvent.BootstrapEnded);
    }

    private linkAll(){
        this.levelBuilder._linkService();
        this.levelLoader._linkService();
        this.segmentMover._linkService();
        this.cameraBox._linkService();
        this.prefabStorage._linkService();
        this.touchHandler._linkService();
        this.player._linkService();
        this.gameFlow._linkService();
    }
}
