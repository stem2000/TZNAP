import PrefabContainer from "./PrefabContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrefabStorage extends cc.Component {

    @property([PrefabContainer])
    private containers: PrefabContainer[] = [];

    private prefabMap: Map<string, cc.Prefab> = new Map();

    onLoad() {
        this.containers.forEach(container => {
            this.prefabMap.set(container.name, container.prefab);
        });
    }

    public getPrefab(name: string){
        return this.prefabMap.get(name);
    }
}
