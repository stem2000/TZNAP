import { iState } from "../../../System/StateMachine/iState";
import PlayerValidator from "../../PlayerValidator";
import Player from "../Player";

export default class RunToSegment extends iState {
    validator: PlayerValidator;
    player: Player;

    public constructor(validator: PlayerValidator, player: Player){
        super();

        this.validator = validator;
        this.player = player;
    }

    public override onEnter(): void {
        let lasthit = this.validator.lasthit;
        let playerPosition = this.player.node.position;
 
        cc.tween(this.player.node).to(0.3, { position: new cc.Vec3(lasthit, playerPosition.y, 0) }).call(() => {
            this.player.stickToSegment();
            this.validator.moveSegments();
        }).start();

    };
    public override onExit(): void {};
    public override update(): void {}
}
