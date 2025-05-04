import { iState } from "../../../System/StateMachine/iState";
import PlayerMover from "../PlayerMover";
import Request from "../../../System/Request";
import Event from "../../../System/Event";

export default class Run extends iState {
    _mover: PlayerMover;

    _requestLasthit: Request<[], number>;
    _eventOnStop: Event;

    public constructor(mover: PlayerMover, requestLasthit: Request<[], number>, eventOnStop : Event){
        super();

        this._mover = mover;
        this._requestLasthit = requestLasthit;
        this._eventOnStop = eventOnStop;
    }

    public override onEnter(): void {
        var lasthit = this._requestLasthit.Request();
        var shiftUp = 0.1;
        var position = this._mover.getCurrentPosition();
        
        var nextPosition = new cc.Vec2(lasthit, position.y + shiftUp)
        var playerDownPosition = nextPosition.sub(new cc.Vec2(0, shiftUp));

        this._mover.moveToFast(new cc.Vec2(position.x, position.y + shiftUp), ()=>{});
        this._mover.moveTo(nextPosition, 1, ()=>{
            this._mover.moveToFast(playerDownPosition, ()=>{});
            this._eventOnStop.Invoke();
        })
    };

    public override onExit(): void {};
    public override update(): void {}
}
