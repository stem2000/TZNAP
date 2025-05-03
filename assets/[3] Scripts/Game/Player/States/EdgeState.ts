import { iState } from "../../../System/StateMachine/iState";
import Segment from "../../Segment/Segment";
import Request from "../../../System/Request";


export default class EdgeState extends iState {
    playerNode: cc.Node;
    requestProximate: Request<[], Segment>;
    requestUnlockBuilding: Request<[], void>;

    public constructor(requestUnlockBuilding: Request<[],void>, requestProximate: Request<[], Segment>, playerNode: cc.Node){
        super();

        this.requestUnlockBuilding = requestUnlockBuilding;
        this.requestProximate = requestProximate;
        this.playerNode = playerNode;
    }

    public override onEnter(): void {
        let edgePosition = this.requestProximate.Request().getRightEnd();
   
        if(cc.Vec3.distance(this.playerNode.position, new cc.Vec3(edgePosition.x, edgePosition.y, 0)) > 0.3){
            cc.tween(this.playerNode).to(0.3, { position: new cc.Vec3(edgePosition.x, edgePosition.y, 0) }).call(() => {
                this.requestUnlockBuilding.Request();
            }).start();
        }
        else{
            this.requestUnlockBuilding.Request();
        }
    };

    public override onExit(): void {};
    public override update(): void {};
}
