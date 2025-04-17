import { iState } from "../../../System/StateMachine/iState";
import { GlobalEvent } from "../../GlobalEvent";
import Player from "../Player";

export default class BuildState extends iState {
    player: Player;

    public constructor(player: Player){
        super();

        this.player = player;
    }

    public override onEnter(): void {
        cc.systemEvent.on(GlobalEvent.ScreenTouchStarted, this.player.unlockBuilding, this);
        cc.systemEvent.on(GlobalEvent.ScreenTouchStarted, this.player.lockBuilding, this);
    };

    public override onExit(): void {
        cc.systemEvent.off(GlobalEvent.ScreenTouchStarted, this.player.unlockBuilding, this);
        cc.systemEvent.off(GlobalEvent.ScreenTouchStarted, this.player.lockBuilding, this);
    };

    public override update(): void {}
}
