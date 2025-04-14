import { IService } from "../Interfaces/Interfaces";
import { ServiceLocator } from "../System/ServiceLocator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PLayer extends cc.Component implements IService{


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    _linkService(): void {
        let servloc = ServiceLocator.getGlobal();
    }
}
