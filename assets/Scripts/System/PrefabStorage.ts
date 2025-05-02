import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import iBootable from "./iBootable";
import iBootableComponent from "./iBootableComponent";
import PrefabContainer from "./PrefabContainer";
import { PrefabType } from "./PrefabType";
import { ServiceContainer } from "./ServiceContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrefabStorage extends iBootableComponent{
    @property([PrefabContainer])
    private containers: PrefabContainer[] = [];

    private prefabMap: Map<PrefabType, cc.Prefab> = new Map();

    _inject_(container: ServiceContainer): void {}
    _init_(): void {}

    public getPrefabLazy(type: PrefabType){
        if(this.mapPrefabs.length == 0 && this.containers.length != 0){
            this.mapPrefabs();
        }
        return this.prefabMap.get(type);
    }

    private mapPrefabs() {
        this.containers.forEach(container => {
            this.prefabMap.set(container.type, container.prefab);
        });
    }
}

