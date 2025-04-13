import { ServiceLocator } from "../System/ServiceLocator";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class CameraBox extends cc.Component {

    private _camera: cc.Camera = null;


    public get camera(): cc.Camera{
        return this._camera;
    }

    public get top(): number{
        return this._camera.getScreenToWorldPoint(new cc.Vec2(0,cc.winSize.height)).y;
    }

    public get bot(): number{
        return this._camera.getScreenToWorldPoint(new cc.Vec2(0,0)).y;
    }

    public get right(): number{
        return this._camera.getScreenToWorldPoint(new cc.Vec2(cc.winSize.width,0)).x;
    }

    public get left(): number{
        return this._camera.getScreenToWorldPoint(new cc.Vec2(0,0)).x;
    }

    onLoad () {
        this._camera = this.getComponent(cc.Camera);        
    }

}
