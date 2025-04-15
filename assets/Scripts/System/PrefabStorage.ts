import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import PrefabContainer from "./PrefabContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrefabStorage extends cc.Component implements IInjectable, IBootable{

    @property([PrefabContainer])
    private containers: PrefabContainer[] = [];

    private prefabMap: Map<string, cc.Prefab> = new Map();

    _inject_(): void {}
    _init_(): void {}

    public getPrefab(name: string){
        if(this.mapPrefabs.length == 0 && this.containers.length != 0){
            this.mapPrefabs();
        }
        return this.prefabMap.get(name);
    }

    private mapPrefabs() {
        this.containers.forEach(container => {
            this.prefabMap.set(container.name, container.prefab);
        });
    }
}
