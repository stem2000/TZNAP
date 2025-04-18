import Hitline from "../Hitline";
import PlayerValidator from "../PlayerValidator";


export default class HitlineBuilding {
    hitline: Hitline;
    validator: PlayerValidator;

    public constructor(hitline: Hitline, validator: PlayerValidator) {
        this.hitline = hitline;
        this.validator = validator;
    }

    public startBuilding() {
        this.hitline.startGrowing();
    }

    public stopBuilding() {
        let hitlineWorldPosition = this.hitline.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));

        this.hitline.stopGrowing();
        this.validator.ValidateHit(hitlineWorldPosition, this.hitline.lenght);
    }
}
