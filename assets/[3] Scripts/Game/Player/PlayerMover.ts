import Player from "./Player";


export default class PlayerMover {
    _playerNode: cc.Node;

    public constructor(node: cc.Node) {
        this._playerNode = node;
    }

    public stickTo(position: cc.Vec3) {
        this._playerNode.position = position;
    }

    public moveTo(position: cc.Vec2, duration: number, callback: Function){
        cc.tween(this._playerNode).to(duration, { position: new cc.Vec3(position.x, position.y, this._playerNode.position.z) }).call(() => {
            callback();
        }).start();
    }

    public moveToFast(position: cc.Vec2, callback: Function){
        this._playerNode.position = new cc.Vec3(position.x, position.y, this._playerNode.position.z);
        callback();
    }

    public getCurrentPosition(): cc.Vec2{
        var position = this._playerNode.position;

        return new cc.Vec2(position.x, position.y);
    }
}
