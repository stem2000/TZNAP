const {ccclass, property} = cc._decorator;

@ccclass("PrefabContainer")
export default class PrefabContainer {

    @property(cc.String)
    public name : string = "";

    @property(cc.Prefab)
    public prefab : cc.Prefab = null;
}
