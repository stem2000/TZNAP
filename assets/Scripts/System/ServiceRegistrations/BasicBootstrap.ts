import CameraBox from "../../Game/CameraBox";
import GameFlow from "../../Game/GameFlow";
import { GlobalEvent } from "../../Game/GlobalEvent";
import LevelBuilder from "../../Game/LevelBuilder";
import LevelLoader from "../../Game/LevelLoader";
import Player from "../../Game/Player/Player";
import SegmentMover from "../../Game/Segment/SegmentMover";
import PrefabStorage from "../PrefabStorage";
import { ServiceLocator } from "../ServiceLocator";
import InputHandler from "../InputHandler";
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

    @property(InputHandler)
    inputHandler: InputHandler = null;

    @property(LevelBuilder)
    levelBuilder: LevelBuilder = null;

    @property(LevelLoader)
    levelLoader: LevelLoader = null;

    @property(Player)
    player: Player = null;

    @property(GameFlow)
    gameFlow: GameFlow = null;

    public override Boot() {
        this.registerServices();
        this.injectServices();
        this.initBootables();
        
        this.configureCC();

        cc.systemEvent.emit(GlobalEvent.BootstrapEnded);
    }

    private registerServices(){
        let servloc = ServiceLocator.getGlobal();

        servloc.register(CameraBox, this.cameraBox);
        servloc.register(PrefabStorage, this.prefabStorage);
        servloc.register(SegmentMover, this.segmentMover);
        servloc.register(InputHandler, this.inputHandler);
        servloc.register(LevelBuilder, this.levelBuilder);
        servloc.register(LevelLoader, this.levelLoader);
        servloc.register(Player, this.player);
        servloc.register(GameFlow, this.gameFlow);
    }

    private injectServices(){
        this.levelBuilder._inject();
        this.levelLoader._inject();
        this.segmentMover._inject();
        this.cameraBox._inject();
        this.prefabStorage._inject();
        this.inputHandler._inject();
        this.player._inject();
        this.gameFlow._inject();
    }

    private initBootables(){
        this.levelBuilder._init();
        this.levelLoader._init();
        this.segmentMover._init();
        this.cameraBox._init();
        this.prefabStorage._init();
        this.inputHandler._init();
        this.player._init();
        this.gameFlow._init();
    }


    private configureCC(){       
        cc.debug.setDisplayStats(true);
    }
}
