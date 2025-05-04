import { ServiceContainer } from "../System/ServiceContainer";
import aBootableServiceComponent from "../System/aBootableServiceComponent";
import { GlobalEvent } from "./GlobalEvent";
import Player from "./Player/Player";
import GameplayCoordinator from "./GameplayCoordinator";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class Hitline extends cc.Component {

    @property(cc.Sprite)
    private view_ : cc.Sprite = null;

    @property(cc.Float)
    private lenght_: number = 1;
    
    @property(cc.Float)
    private growSpeed_: number = 10;
    

    _isGrowing: boolean = false;

    public startGrowing(){
        this._isGrowing = true;
    }

    public stopGrowing(){
        this._isGrowing = false;
    }

    public getSize(): number{
        return this.lenght_;
    }

    public reset(){
        this.view_.node.rotation = 0;
        this.view_.node.height = this.lenght_ = 1;
    }

    public fall(callback: Function){
        cc.tween(this.node).by(0.5, { angle: -90 }).call( () =>
            {callback()}
        ).start();
    }    

    protected update(dt: number): void {
        if(this._isGrowing){
            this.lenght_ += this.growSpeed_ * dt;
            this.view_.node.height = this.lenght_;
        }
    }
}
