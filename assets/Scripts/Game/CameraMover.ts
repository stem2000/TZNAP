import { ServiceLocator } from "../System/ServiceLocator";
import CameraBox from "./CameraBox";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraMover extends cc.Component {
    cameraBox: CameraBox;

    onLoad () {
        let servloc = ServiceLocator.getGlobal();

        this.cameraBox = servloc.get(CameraBox); 
    }

    start () {

    }

    quickMoveTo(position: cc.Vec3){
        this.cameraBox.node.position = position;
    }

    // update (dt) {}
}
