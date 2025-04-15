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
        this.levelBuilder._inject_();
        this.levelLoader._inject_();
        this.segmentMover._inject_();
        this.cameraBox._inject_();
        this.prefabStorage._inject_();
        this.inputHandler._inject_();
        this.player._inject_();
        this.gameFlow._inject_();
    }

    private initBootables(){
        this.levelBuilder._init_();
        this.levelLoader._init_();
        this.segmentMover._init_();
        this.cameraBox._init_();
        this.prefabStorage._init_();
        this.inputHandler._init_();
        this.player._init();
        this.gameFlow._init_();
    }


    private configureCC(){       
        cc.debug.setDisplayStats(true);
    }
}
