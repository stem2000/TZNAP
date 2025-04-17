
import { iState } from "../../../System/StateMachine/iState";
import PlayerValidator from "../../PlayerValidator";
import Segment from "../../Segment/Segment";
import Player from "../Player";

export default class StickState extends iState {
    player: Player;
    validator: PlayerValidator;
    stickSegment: Segment;

    public constructor(validator: PlayerValidator, player: Player){
        super();

        this.validator = validator;
        this.player = player;
    }

    public override onEnter(): void {
        this.stickSegment = this.validator.GetProximateSegment();
    };

    public override onExit(): void {};

    public override update(): void {
        let target = this.stickSegment.getRightEnd();

        this.player.moveTo(new cc.Vec3(target.x, target.y, 0));
    }
}
