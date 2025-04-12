// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import PrefabContainer from "./PrefabContainer";
import PrefabStorage from "./PrefabStorage";
import { ServiceLocator } from "./ServiceLocator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bootrstrap extends cc.Component {
    onLoad(): void {
        this.RegisterServices();
    }

    RegisterServices(){
        let serviceLocator = ServiceLocator.getGlobal();

        serviceLocator.register(PrefabStorage, this.getComponentInChildren(PrefabStorage))
    }
}
