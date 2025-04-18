import { iState } from "../../../System/StateMachine/iState";
import PlayerValidator from "../../PlayerValidator";
import Segment from "../../Segment/Segment";
import Player from "../Player";
import PlayerMoving from "../PlayerMoving";

export default class StickState extends iState {
    moving: PlayerMoving;
    validator: PlayerValidator;
    stickSegment: Segment;

    public constructor(validator: PlayerValidator, moving: PlayerMoving){
        super();

        this.validator = validator;
        this.moving = moving;
    }

    public override onEnter(): void {
        this.stickSegment = this.validator.GetProximateSegment();
    };

    public override onExit(): void {};

    public override update(): void {
        let target = this.stickSegment.getRightEnd();

        this.moving.moveTo(new cc.Vec3(target.x, target.y, 0));
    }
}
