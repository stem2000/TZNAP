import { iState } from "../../../System/StateMachine/iState";
import PlayerMover from "../PlayerMover";

export default class Run extends iState {
    mover: PlayerMover;

    public constructor(mover: PlayerMover){
        super();

        this.mover = mover;
    }

    public override onEnter(): void {
 
        // cc.tween(this.player.node).to(0.3, { position: new cc.Vec3(lasthit, playerPosition.y, 0) }).call(() => {
        //     this.player.stickToSegment();
        //     this.validator.moveSegments();
        // }).start();

    };
    public override onExit(): void {};
    public override update(): void {}
}
