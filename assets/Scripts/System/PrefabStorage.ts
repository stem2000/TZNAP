import { IService } from "../Interfaces/Interfaces";
import PrefabContainer from "./PrefabContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrefabStorage extends cc.Component implements IService{

    @property([PrefabContainer])
    private containers: PrefabContainer[] = [];

    private prefabMap: Map<string, cc.Prefab> = new Map();

    public initialize() {
        this.containers.forEach(container => {
            this.prefabMap.set(container.name, container.prefab);
        });
    }

    public getPrefab(name: string){
        return this.prefabMap.get(name);
    }

    _linkService(): void {}
}
