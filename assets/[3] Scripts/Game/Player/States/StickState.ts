import { iState } from "../../../System/StateMachine/iState";
import GameplayCoordinator from "../../GameplayCoordinator";
import Segment from "../../Segment/Segment";
import Player from "../Player";
import PlayerMoving from "../PlayerMoving";

export default class StickState extends iState {
    moving: PlayerMoving;
    coordinator: GameplayCoordinator;
    stickSegment: Segment;

    public constructor(coordinator: GameplayCoordinator, moving: PlayerMoving){
        super();

        this.coordinator = coordinator;
        this.moving = moving;
    }

    public override onEnter(): void {
        this.stickSegment = this.coordinator.GetProximateSegment();
    };

    public override onExit(): void {};

    public override update(): void {
        let target = this.stickSegment.getRightEnd();

        this.moving.stickTo(new cc.Vec3(target.x, target.y, 0));
    }
}
