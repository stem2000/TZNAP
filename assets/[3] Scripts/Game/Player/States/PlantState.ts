import { iState } from "../../../System/StateMachine/iState";
import GameplayCoordinator from "../../GameplayCoordinator";
import Player from "../Player";

export default class PlantState extends iState {
    player: Player;
    validator: GameplayCoordinator

    public constructor(validator: GameplayCoordinator, player: Player){
        super();

        this.validator = validator;
        this.player = player;
    }

    public override onEnter(): void {
        let plantPosition = this.validator.GetProximateSegment().getRightEnd();
        this.player.node.position = new cc.Vec3(plantPosition.x, plantPosition.y, 0);
    };
}
