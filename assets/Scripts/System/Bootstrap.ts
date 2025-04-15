import LevelLoader from "../Game/LevelLoader";
import PrefabStorage from "./PrefabStorage";
import { ServiceLocator } from "./ServiceLocator";
import BootstrapStrategy from "./ServiceRegistrations/BootstrapStrategy";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class Bootrstrap extends cc.Component {
    @property(BootstrapStrategy)
    bootstrapStrategy: BootstrapStrategy = null;

    onLoad(): void {
        this.bootstrapStrategy.Boot();
    }
}
