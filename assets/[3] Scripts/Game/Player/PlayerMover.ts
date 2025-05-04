import Player from "./Player";


export default class PlayerMover {
    playerNode: cc.Node;

    public constructor(node: cc.Node) {
        this.playerNode = node;
    }

    public stickTo(position: cc.Vec3) {
        this.playerNode.position = position;
    }

    public moveTo(position: cc.Vec2, duration: number, callback: Function){
        cc.tween(this.playerNode).to(duration, { position: new cc.Vec3(position.x, this.playerNode.position.y, 0) }).call(() => {
            callback();
        }).start();
    }

    public getCurrentPosition(): cc.Vec2{
        var position = this.playerNode.position;

        return new cc.Vec2(position.x, position.y);
    }
}
