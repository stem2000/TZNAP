import { iState } from "../../../System/StateMachine/iState";
import Player from "../Player";
import Request from "../../../System/Request";
import Segment from "../../Segment/Segment";

export default class PlantState extends iState {
    player: Player;
    requestProximate: Request<[], Segment>;

    public constructor(requestProximate: Request<[], Segment>, player: Player){
        super();

        this.player = player;
        this.requestProximate = requestProximate;
    }

    public override onEnter(): void {
        let plantPosition = this.requestProximate.Request().getRightEnd();

        this.player.node.position = new cc.Vec3(plantPosition.x, plantPosition.y, 0);
    };
}
