import { iState } from "../../../System/StateMachine/iState";
import Segment from "../../Segment/Segment";8
import PlayerMover from "../PlayerMover";
import Request from "../../../System/Request";

export default class StickState extends iState {
    _mover: PlayerMover;
    _relatedDistanceToSegment: number;
    _stickedSegment: Segment;

    _requestProximate: Request<[], Segment>;

    public constructor(mover: PlayerMover, requestProximate: Request<[], Segment>){
        super();

        this._mover = mover;

        this._requestProximate = requestProximate;
    }

    public override onEnter(): void {
        this._stickedSegment = this._requestProximate.Request();

        this._relatedDistanceToSegment = this._stickedSegment.getRightEnd().x - this._mover.getCurrentPosition().x;
    };

    public override onExit(): void {};

    public override update(): void {
        let target = this._stickedSegment.getRightEnd();

        target.x -= this._relatedDistanceToSegment;
        this._mover.stickTo(new cc.Vec3(target.x, target.y, 0));
    }
}
