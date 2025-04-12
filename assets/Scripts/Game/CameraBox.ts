import { IService } from "../Interfaces/Interfaces";
import { ServiceLocator } from "../System/ServiceLocator";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class CameraBox extends cc.Component implements IService {
    camera: cc.Camera = null;

    onLoad () {
        this._register_on_load();
    }

    start () {
        this.camera = this.getComponent(cc.Camera);
    }

    // update (dt) {}

    _register_on_load() {
       let servloc = ServiceLocator.getGlobal();

       servloc.register(CameraBox, this);
    }
}
