import { iState } from "../../../System/StateMachine/iState";
import PlayerValidator from "../../PlayerValidator";
import Player from "../Player";

export default class PlantState extends iState {
    player: Player;
    validator: PlayerValidator

    public constructor(validator: PlayerValidator, player: Player){
        super();

        this.validator = validator;
        this.player = player;
    }

    public override onEnter(): void {
        cc.log(this.validator.GetProximateSegment().getRightEnd());
        let plantPosition = this.validator.GetProximateSegment().getRightEnd();
        this.player.node.position = new cc.Vec3(plantPosition.x, plantPosition.y, 0);
        cc.log(this.player);
    };
}
