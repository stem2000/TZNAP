import CameraBox from "../../Game/CameraBox";
import Player from "../../Game/Player/Player";
import PrefabStorage from "../PrefabStorage";
import { Constructor, ServiceContainer } from "../ServiceContainer";
import BootstrapStrategy from "./BootstrapStrategy";
import aBootableServiceComponent from "../aBootableServiceComponent";
import aBootableService from "../aBootableService";
import GameFlow from "../../Game/GameStates/GameFlow";
import SegmentManager from "../../Game/Segment/SegmentManager";
import GameplayCoordinator from "../../Game/GameplayCoordinator";
import aBootableComponent from "../aBootableComponent";
import GameInput from "../GameInput";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class BasicBootstrap extends BootstrapStrategy {
    private serviceContainer: ServiceContainer;

    initSequence: Function[] = [
        CameraBox,
        SegmentManager,
        PrefabStorage,
        GameInput,
        GameplayCoordinator,
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
        let bootableServices = this.registerBootableServices();
        let bootableServiceComponents = this.registerBootableServiceComponents(this.getBootableServiceComponentsOnScene());

        let bootableComponents = this.getBootableComponentsOnScene();
        
        this.injectInBootableServices(bootableServices);
        this.injectInBootableServiceComponents(bootableServiceComponents);
        this.injectInBootableComponents(bootableComponents);
        
        this.initializeBootableServicesOfAnyType(bootableServices, bootableServiceComponents);
    }

    private registerBootableServices(): aBootableService[]{
        let bootableServices = [
            new GameplayCoordinator()
        ];

        bootableServices.forEach(bootableService =>{
            this.serviceContainer.register(bootableService.constructor as Constructor, bootableService);
        })

        return bootableServices;
    }

    private registerBootableServiceComponents(bootables : aBootableServiceComponent[]): aBootableServiceComponent[]{
        let bootableComponents = bootables;

        bootableComponents.forEach(component => {
            this.serviceContainer.register(component._ctor_, component);
        });

        return bootableComponents;
    }

    private getBootableServiceComponentsOnScene(): aBootableServiceComponent[]{
        let bootableServiceComponents = [];

        this.node.children.forEach(child => {
                let bootables = child.getComponentsInChildren(cc.Component);
                
                bootables.forEach(bootable => {
                    if(bootable instanceof aBootableServiceComponent)
                        bootableServiceComponents.push(bootable);
            });
        });

        return bootableServiceComponents;
    }

    private getBootableComponentsOnScene(): aBootableComponent[]{
        let bootableComponents = [];

        this.node.children.forEach(child => {
                let bootables = child.getComponentsInChildren(cc.Component);
                
                bootables.forEach(bootable => {
                    if(bootable instanceof aBootableComponent)
                        bootableComponents.push(bootable);
            });
        });

        return bootableComponents;
    }

    private injectInBootableServices(bootables : aBootableService[]): aBootableService[]{
        bootables.forEach(bootable => {
            bootable._inject_(this.serviceContainer);
        });

        return bootables;
    }

    private injectInBootableServiceComponents(bootableComponents : aBootableServiceComponent[]): aBootableServiceComponent[]{
        bootableComponents.forEach(component => {
            component._inject_(this.serviceContainer);
        });

        return bootableComponents;
    }

    private injectInBootableComponents(bootables : aBootableComponent[]): aBootableComponent[]{
        bootables.forEach(bootable => {
            bootable._inject_(this.serviceContainer);
        });

        return bootables;
    }

    private initializeBootableServicesOfAnyType(bootablesServices : aBootableService[], bootableServiceComponents: aBootableServiceComponent[]) {
        var services = bootablesServices.concat(bootableServiceComponents);

        this.initSequence.forEach((ComponentType) => {
            const bootable = services.find(c => c instanceof ComponentType);
            if (bootable) {
                bootable._init_();
            }
        });
    }

    private configureCC(){       
        cc.debug.setDisplayStats(true);
    }

    private createServiceContainer(){
        this.serviceContainer = new ServiceContainer();
    }
}
