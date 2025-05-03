import { iState } from "../../../System/StateMachine/iState";
import Hitline from "../../Hitline";
import GameplayCoordinator from "../../GameplayCoordinator";
import Player from "../Player";
import Segment from "../../Segment/Segment";
import Request from "../../../System/Request";

export default class BuildState extends iState {
    hitline: Hitline;
    player: Player;
    proximateRequest: Request<[], Segment>;

    public constructor(hitline: Hitline){
        super();

        this.hitline = hitline;
    }

    public override onEnter(): void {}

    public override onExit(): void {}

    public override update(): void {}

    private startBuilding(){
        this.hitline.startGrowing();
    }

    private stopBuilding(){
        // let hitlineWorldPosition = this.hitline.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));

        // this.hitline.stopGrowing();
        // this.hitline.fall(()=>{
        //     this.validator.ValidateHit(hitlineWorldPosition, this.hitline.lenght);})
        
    }
}
