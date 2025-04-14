import LevelLoader from "../Game/LevelLoader";
import PrefabStorage from "./PrefabStorage";
import { ServiceLocator } from "./ServiceLocator";
import ServiceRegistration from "./ServiceRegistrations/ServiceRegistration";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class Bootrstrap extends cc.Component {
    @property(ServiceRegistration)
    serviceRegistrationStrategy: ServiceRegistration = null;

    @property(PrefabStorage)
    prefabStorage: PrefabStorage = null;

    onLoad(): void {
        this.prefabStorage.initialize();
        this.serviceRegistrationStrategy.RegisterAll();
        
        cc.debug.setDisplayStats(true);
    }

    start(){
        let levelLoader = ServiceLocator.getGlobal().get(LevelLoader);

        levelLoader.loadOneSegmentedLevel();
    }
}
