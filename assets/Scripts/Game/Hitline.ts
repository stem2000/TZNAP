import { ServiceLocator } from "../System/ServiceLocator";
import iBootableComponent from "../System/iBootableComponent";
import { GlobalEvent } from "./GlobalEvent";
import Player from "./Player/Player";
import PlayerValidator from "./PlayerValidator";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class Hitline extends iBootableComponent {

    @property(cc.Sprite)
    view : cc.Sprite;

    @property(cc.Float)
    lenght: number = 1;
    
    @property(cc.Float)
    growSpeed: number = 10;
    

    isGrowing: boolean = false;
    validator: PlayerValidator;


    _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.validator = servloc.get(PlayerValidator);
    }

    _init_(): void {
        
    }

    public startGrowing(){
        this.isGrowing = true;
    }

    public stopGrowing(){
        this.isGrowing = false;
    }

    public getSize(): number{
        return this.lenght;
    }

    public reset(){
        this.view.node.rotation = 0;
        this.view.node.height = this.lenght = 1;
    }

    public fall(){
        cc.tween(this.node).by(0.5, { angle: -90 }).call( () =>
            {}
        ).start();
    }    

    protected update(dt: number): void {
        if(this.isGrowing){
            this.lenght += this.growSpeed * dt;
        }
    }
}
