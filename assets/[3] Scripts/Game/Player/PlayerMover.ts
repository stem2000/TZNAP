import Player from "./Player";


export default class PlayerMover {
    player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public stickTo(position: cc.Vec3) {
        this.player.node.position = position;
    }
}
