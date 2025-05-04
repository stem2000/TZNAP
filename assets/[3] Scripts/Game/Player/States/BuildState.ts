import { iState } from "../../../System/StateMachine/iState";
import Hitline from "../../Hitline";
import Request from "../../../System/Request";
import GameInput from "../../../System/GameInput";

export default class BuildState extends iState {
    _hitline: Hitline;
    _input: GameInput;

    _requestValidate: Request<[cc.Vec2, number], void>;

    _boundStartBuilding: Function;
    _boundStopBuilding: Function;

    public constructor(hitline: Hitline, requestValidate: Request<[cc.Vec2, number], void>, input: GameInput){
        super();

        this._hitline = hitline;
        this._input = input;

        this._requestValidate = requestValidate;

        this._boundStartBuilding = this.startBuilding.bind(this);
        this._boundStopBuilding = this.stopBuilding.bind(this);
    }

    public override onEnter(): void {
        this._input.subcribeToOnTouchStart(this._boundStartBuilding);
    }

    public override onExit(): void {}

    public override update(): void {}

    private startBuilding(){
        this._hitline.startGrowing();

        this._input.subcribeToOnTouchEnd(this._boundStopBuilding);
    }

    private stopBuilding(){
        let hitlineWorldPosition = this._hitline.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));

        this._hitline.stopGrowing();
        this._hitline.fall(()=>{
            this._requestValidate.Request(hitlineWorldPosition, this._hitline.getSize());
        })
        
        this._input.unsubcribeFromOnTouchStart(this._boundStartBuilding);
        this._input.unsubscribeFromOnTouchEnd(this._boundStopBuilding);
    }
}
