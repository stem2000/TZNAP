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
import gBootableComponent from "../gBootableComponent";
import gBootable from "../gBootable";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class BasicBootstrap extends BootstrapStrategy {

    public override Boot() {
        let bootables = this.registerBootables();
        let bootableComponents = this.registerBootableComponents();
        
        this.injectInBootables(bootables);
        this.injectInBootableComponents(bootableComponents);

        this.initializeBootables(bootables);
        this.initializeBootableComponents(bootableComponents);

        this.configureCC();

        cc.systemEvent.emit(GlobalEvent.BootstrapEnded);
    }

    private registerBootables(): gBootable[]{
        let servloc = ServiceLocator.getGlobal();
        let bootables = [];

        bootables.push(new LevelBuilder());
        bootables.push(new LevelLoader());

        bootables.forEach(bootable => {
            servloc.register(bootable.constructor, bootable);
        });

        return bootables;
    }

    private registerBootableComponents(): gBootableComponent[]{
        let servloc = ServiceLocator.getGlobal();
        let bootableComponents = this.getComponentsInChildren(gBootableComponent);

        bootableComponents.forEach(component => {
            servloc.register(component._ctor_, component);
        });

        return bootableComponents;
    }

    private injectInBootables(bootables : gBootable[]): gBootable[]{
        bootables.forEach(bootable => {
            bootable._inject_();
        });

        return bootables;
    }

    private injectInBootableComponents(bootableComponents : gBootableComponent[]): gBootable[]{
        bootableComponents.forEach(component => {
            component._inject_();
        });

        return bootableComponents;
    }

    private initializeBootables(bootables : gBootable[]): gBootable[] {
        bootables.forEach(bootable => {
            bootable._init_();
        });

        return bootables;
    }

    private initializeBootableComponents(bootableComponents : gBootableComponent[]): gBootable[]{
        bootableComponents.forEach(component => {
            component._init_();
        });

        return bootableComponents;
    }


    private configureCC(){       
        cc.debug.setDisplayStats(true);
    }
}
