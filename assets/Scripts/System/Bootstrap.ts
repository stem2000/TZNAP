import LevelBuilder from "../Game/LevelBuilder";
import LevelLoader from "../Game/LevelLoader";
import PrefabStorage from "./PrefabStorage";
import { ServiceLocator } from "./ServiceLocator";
import ServiceRegistrationStrategy from "./ServiceRegistrationStrategies/ServiceRegistrationStrategy";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class Bootrstrap extends cc.Component {
    @property(ServiceRegistrationStrategy)
    serviceRegistrationStrategy: ServiceRegistrationStrategy = null;

    @property(PrefabStorage)
    prefabStorage: PrefabStorage = null;

    onLoad(): void {
        this.prefabStorage.initialize();
        this.serviceRegistrationStrategy.RegisterAll();
    }

    start(){
        let levelLoader = ServiceLocator.getGlobal().get(LevelLoader);

        levelLoader.loadOneSegmentedLevel();
    }
}
