import Hitline from "../Hitline";
import GameplayCoordinator from "../GameplayCoordinator";


export default class HitlineBuilding {
    hitline: Hitline;
    validator: GameplayCoordinator;

    public constructor(hitline: Hitline, validator: GameplayCoordinator) {
        this.hitline = hitline;
        this.validator = validator;
    }

    public startBuilding() {
        this.hitline.startGrowing();
    }

    public stopBuilding() {
        let hitlineWorldPosition = this.hitline.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));

        this.hitline.stopGrowing();
        this.validator.validateHit(hitlineWorldPosition, this.hitline.lenght);
    }
}
