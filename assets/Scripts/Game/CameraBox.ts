import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import iBootableComponent from "../System/iBootableComponent";
import { ServiceContainer } from "../System/ServiceContainer";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class CameraBox extends iBootableComponent{

    private _camera: cc.Camera = null;

    
    _inject_(container: ServiceContainer): void {}
    _init_(): void {
        this._camera = this.getComponent(cc.Camera);
    }


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

    public get width(): number{
        const aspectRatio = cc.winSize.width / cc.winSize.height;
        const height = this._camera.orthoSize * 2;
        const width = height * aspectRatio;

        return width;
    }
}
