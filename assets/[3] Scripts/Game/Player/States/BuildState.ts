import { iState } from "../../../System/StateMachine/iState";
import Hitline from "../../Hitline";
import Request from "../../../System/Request";
import GameInput from "../../../System/GameInput";

export default class BuildState extends iState {
    hitline: Hitline;
    input: GameInput;

    requestValidate: Request<[cc.Vec2, number], void>;

    boundStartBuilding: Function;
    boundStopBuilding: Function;

    public constructor(hitline: Hitline, requestValidate: Request<[cc.Vec2, number], void>, input: GameInput){
        super();

        this.hitline = hitline;
        this.input = input;

        this.requestValidate = requestValidate;

        this.boundStartBuilding = this.startBuilding.bind(this);
        this.boundStopBuilding = this.stopBuilding.bind(this);
    }

    public override onEnter(): void {
        this.input.subcribeToOnTouchStart(this.boundStartBuilding);
        this.input.subcribeToOnTouchEnd(this.boundStopBuilding);
    }

    public override onExit(): void {
        this.input.unsubcribeFromOnTouchStart(this.boundStartBuilding);
        this.input.unsubscribeFromOnTouchEnd(this.boundStopBuilding);
    }

    public override update(): void {}

    private startBuilding(){
        this.hitline.startGrowing();
    }

    private stopBuilding(){
        let hitlineWorldPosition = this.hitline.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));

        this.hitline.stopGrowing();
        this.hitline.fall(()=>{
            this.requestValidate.Request(hitlineWorldPosition, this.hitline.lenght);})
        
    }
}
