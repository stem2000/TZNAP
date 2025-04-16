import CameraBox from "../../Game/CameraBox";
import { GlobalEvent } from "../../Game/GlobalEvent";
import LevelBuilder from "../../Game/LevelBuilder";
import LevelLoader from "../../Game/LevelLoader";
import Player from "../../Game/Player/Player";
import SegmentMover from "../../Game/Segment/SegmentMover";
import PrefabStorage from "../PrefabStorage";
import { ServiceLocator } from "../ServiceLocator";
import InputHandler from "../InputHandler";
import BootstrapStrategy from "./BootstrapStrategy";
import iBootableComponent from "../iBootableComponent";
import iBootable from "../iBootable";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class BasicBootstrap extends BootstrapStrategy {

    public override Boot() {
        
        let bootables = this.registerBootables();
        let bootableComponents = this.registerBootableComponents(this.getBootables());
        
        this.injectInBootables(bootables);
        this.injectInBootableComponents(bootableComponents);
        
        this.initializeBootables(bootables);
        this.initializeBootableComponents(bootableComponents);

        this.configureCC();

        cc.systemEvent.emit(GlobalEvent.GameBootstrapped);
    }

    private registerBootables(): iBootable[]{
        let servloc = ServiceLocator.getGlobal();
        let bootables = [];

        bootables.push(new LevelBuilder());
        bootables.push(new LevelLoader());

        bootables.forEach(bootable => {
            servloc.register(bootable.constructor, bootable);
        });

        return bootables;
    }

    private registerBootableComponents(bootables : iBootableComponent[]): iBootableComponent[]{
        let servloc = ServiceLocator.getGlobal();
        let bootableComponents = bootables;

        bootableComponents.forEach(component => {
            servloc.register(component._ctor_, component);
        });

        return bootableComponents;
    }

    private injectInBootables(bootables : iBootable[]): iBootable[]{
        bootables.forEach(bootable => {
            bootable._inject_();
        });

        return bootables;
    }

    private getBootables(): iBootableComponent[]{
        let bootableComponents = [];

        this.node.children.forEach(child => {
                let bootables = child.getComponentsInChildren(cc.Component);
                
                bootables.forEach(bootable => {
                    if(bootable instanceof iBootableComponent)
                        bootableComponents.push(bootable);
            });
        });

        return bootableComponents;
    }

    private injectInBootableComponents(bootableComponents : iBootableComponent[]): iBootable[]{
        bootableComponents.forEach(component => {
            component._inject_();
        });

        return bootableComponents;
    }

    private initializeBootables(bootables : iBootable[]): iBootable[] {
        bootables.forEach(bootable => {
            bootable._init_();
        });

        return bootables;
    }

    private initializeBootableComponents(bootableComponents : iBootableComponent[]): iBootable[]{
        bootableComponents.forEach(component => {
            component._init_();
        });

        return bootableComponents;
    }


    private configureCC(){       
        cc.debug.setDisplayStats(true);
    }
}
