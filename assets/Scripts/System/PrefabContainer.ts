import { PrefabType } from "./PrefabType";

const {ccclass, property} = cc._decorator;

@ccclass("PrefabContainer")
export default class PrefabContainer {

    @property({ type: cc.Enum(PrefabType) })
    public type : PrefabType = PrefabType.None;

    @property(cc.Prefab)
    public prefab : cc.Prefab = null;
}
