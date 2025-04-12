import PrefabContainer from "./PrefabContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrefabHolder extends cc.Component {
    @property([PrefabContainer])
    containers: PrefabContainer[] = [];

    private prefabMap: Map<string, cc.Prefab> = new Map();

    start() {
        this.containers.forEach(container => {
            this.prefabMap.set(container.name, container.prefab);
        });
    }
}
