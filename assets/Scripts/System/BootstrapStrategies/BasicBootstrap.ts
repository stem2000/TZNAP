import CameraBox from "../../Game/CameraBox";
import Player from "../../Game/Player/Player";
import PrefabStorage from "../PrefabStorage";
import { Constructor, ServiceContainer } from "../ServiceContainer";
import InputHandler from "../InputHandler";
import BootstrapStrategy from "./BootstrapStrategy";
import iBootableComponent from "../iBootableComponent";
import iBootable from "../iBootable";
import GameFlow from "../../Game/GameStates/GameFlow";
import SegmentManager from "../../Game/Segment/SegmentManager";
import PlayerValidator from "../../Game/PlayerValidator";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class BasicBootstrap extends BootstrapStrategy {
    private serviceContainer: ServiceContainer;

    initSequence: Function[] = [
        CameraBox,
        SegmentManager,
        PrefabStorage,
        InputHandler,
        Player, 
        GameFlow
    ]

    public override Boot() {
        this.createServiceContainer();
        this.resolveBootables();
        this.configureCC();

        this.serviceContainer.get(GameFlow).confirmGameBoot();
    }

    private resolveBootables(){
        let bootables = this.registerBootables();
        let bootableComponents = this.registerBootableComponents(this.getBootables());
        
        this.injectInBootables(bootables);
        this.injectInBootableComponents(bootableComponents);
        
        this.initializeBootables(bootables);
        this.initializeBootableComponents(bootableComponents);
    }

    private registerBootables(): iBootable[]{
        let bootables = [
            new PlayerValidator()
        ];

        bootables.forEach(bootable =>{
            this.serviceContainer.register(bootable.constructor as Constructor, bootable);
        })

        return bootables;
    }

    private registerBootableComponents(bootables : iBootableComponent[]): iBootableComponent[]{
        let bootableComponents = bootables;

        bootableComponents.forEach(component => {
            this.serviceContainer.register(component._ctor_, component);
        });

        return bootableComponents;
    }

    private injectInBootables(bootables : iBootable[]): iBootable[]{
        bootables.forEach(bootable => {
            bootable._inject_(this.serviceContainer);
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

    private injectInBootableComponents(bootableComponents : iBootableComponent[]): iBootableComponent[]{
        bootableComponents.forEach(component => {
            component._inject_(this.serviceContainer);
        });

        return bootableComponents;
    }

    private initializeBootables(bootables : iBootable[]): iBootable[] {
        bootables.forEach(bootable => {
            bootable._init_();
        });

        return bootables;
    }

    private initializeBootableComponents(bootableComponents : iBootableComponent[]): iBootableComponent[]{

        this.initSequence.forEach((ComponentType) => {
            const bootable = bootableComponents.find(c => c instanceof ComponentType);
            if (bootable) {
                bootable._init_();
            }
        });

        return bootableComponents;
    }

    private configureCC(){       
        cc.debug.setDisplayStats(true);
    }

    private createServiceContainer(){
        this.serviceContainer = new ServiceContainer();
    }
}
