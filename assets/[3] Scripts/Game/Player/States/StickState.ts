import { iState } from "../../../System/StateMachine/iState";
import GameplayCoordinator from "../../GameplayCoordinator";
import Segment from "../../Segment/Segment";8
import PlayerMover from "../PlayerMover";
import Event from "../../../System/Event";
import Request from "../../../System/Request";

export default class StickState extends iState {
    mover: PlayerMover;
    stickedSegment: Segment;

    eventOnSticked: Event;

    requestProximate: Request<[], Segment>;

    public constructor(mover: PlayerMover, onStickedEvent: Event, requestProximate: Request<[], Segment>){
        super();

        this.mover = mover;

        this.eventOnSticked = onStickedEvent;

        this.requestProximate = requestProximate;
    }

    public override onEnter(): void {
        this.stickedSegment = this.requestProximate.Request();
    };

    public override onExit(): void {};

    public override update(): void {
        let target = this.stickedSegment.getRightEnd();

        this.mover.stickTo(new cc.Vec3(target.x, target.y, 0));
    }
}
