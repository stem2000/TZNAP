import { ServiceLocator } from "../System/ServiceLocator";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class CameraBox extends cc.Component {
    camera: cc.Camera = null;

    onLoad () {

    }

    start () {
        this.camera = this.getComponent(cc.Camera);
    }

    // update (dt) {}
}
