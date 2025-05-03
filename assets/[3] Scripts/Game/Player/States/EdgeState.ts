import { iState } from "../../../System/StateMachine/iState";
import Segment from "../../Segment/Segment";
import Request from "../../../System/Request";
import Player from "../Player";


export default class EdgeState extends iState {
    player: Player;
    proximateRequest: Request<[], Segment>;

    public constructor(player: Player, proximateRequest: Request<[], Segment>){
        super();

        this.player = player;
        this.proximateRequest = proximateRequest;
    }

    public override onEnter(): void {
        let edgePosition = this.proximateRequest.GetRequested().getRightEnd();
   
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
