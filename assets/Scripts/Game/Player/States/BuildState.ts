import { iState } from "../../../System/StateMachine/iState";
import { GlobalEvent } from "../../GlobalEvent";
import Hitline from "../../Hitline";
import PlayerValidator from "../../PlayerValidator";
import HitlineBuilding from "../HitlineBuilding";

export default class BuildState extends iState {
    hitline: Hitline;
    validator: PlayerValidator;

    public constructor(hitline: Hitline, validator: PlayerValidator){
        super();

        this.hitline = hitline;
        this.validator = validator;
    }

    public override onEnter(): void {
       this.subscribeToInputEvents();
    };

    public override onExit(): void {}

    public override update(): void {}

    private subscribeToInputEvents(){
        cc.systemEvent.once(GlobalEvent.ScreenTouchStarted, this.startBuilding, this);
    }

    private startBuilding(){
        this.hitline.startGrowing();
        cc.systemEvent.once(GlobalEvent.ScreenTouchEnded, this.stopBuilding, this);
    }

    private stopBuilding(){
        let hitlineWorldPosition = this.hitline.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));

        this.hitline.stopGrowing();
        this.hitline.fall(()=>{
            this.validator.ValidateHit(hitlineWorldPosition, this.hitline.lenght);})
        
    }
}
