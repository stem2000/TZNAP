
import { iState } from "../../../System/StateMachine/iState";
import GameplayCoordinator from "../../GameplayCoordinator";
import Player from "../Player";

export default class EdgeState extends iState {
    player: Player;
    validator: GameplayCoordinator;

    public constructor(player: Player, validator: GameplayCoordinator){
        super();
        this.player = player;
        this.validator = validator;
    }

    public override onEnter(): void {
        let edgePosition = this.validator.GetProximateSegment().getRightEnd();
   
        if(cc.Vec3.distance(this.player.node.position, new cc.Vec3(edgePosition.x, edgePosition.y, 0)) > 0.3){
            cc.tween(this.player.node).to(0.3, { position: new cc.Vec3(edgePosition.x, edgePosition.y, 0) }).call(() => {
                this.player.unlockBuilding();
            }).start();
        }
        else{
            this.player.unlockBuilding();
        }
    };

    public override onExit(): void {};
    public override update(): void {};
}
