import { iState } from "../../../System/StateMachine/iState";
import GameplayCoordinator from "../../GameplayCoordinator";
import Player from "../Player";
import Request from "../../../System/Request";
import Segment from "../../Segment/Segment";

export default class PlantState extends iState {
    player: Player;
    proximateRequest: Request<[], Segment>;

    public constructor(proximateRequest: Request<[], Segment>, player: Player){
        super();

        this.player = player;
        this.proximateRequest = proximateRequest;
    }

    public override onEnter(): void {
        let plantPosition = this.proximateRequest.GetRequested().getRightEnd();

        this.player.node.position = new cc.Vec3(plantPosition.x, plantPosition.y, 0);
    };
}
