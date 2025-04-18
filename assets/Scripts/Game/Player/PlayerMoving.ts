import Player from "./Player";


export default class PlayerMoving {
    player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public moveTo(position: cc.Vec3) {
        this.player.node.position = position;
    }
}
