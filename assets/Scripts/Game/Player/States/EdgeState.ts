
import { iState } from "../../../System/StateMachine/iState";
import PlayerValidator from "../../PlayerValidator";
import Player from "../Player";

export default class EdgeState extends iState {
    player: Player;
    validator: PlayerValidator;

    public constructor(player: Player, validator: PlayerValidator){
        super();
        this.player = player;
        this.validator = validator;
    }

    public override onEnter(): void {
        let edgePosition = this.validator.GetProximateSegment().getRightEnd();

        cc.tween(this.player.node).to(0.5, { position: new cc.Vec3(edgePosition.x, edgePosition.y, 0) }).call(() => {
            this.player.unlockBuilding();
        }).start();
    };

    public override onExit(): void {};
    public override update(): void {};
}
