import Player from "./Player";


export default class PlayerMover {
    player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public stickTo(position: cc.Vec3) {
        this.player.node.position = position;
    }

    public moveTo(position: cc.Vec2, moveTime: number){

    }

    public getPosition(): cc.Vec2{
        var position = this.player.node.position;

        return new cc.Vec2(position.x, position.y);
    }
}
