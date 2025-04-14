import { gPredicate } from "./gPredicate";
import { gState } from "./gState";

export class gTransition {
    public readonly to: gState;
    public readonly condition: gPredicate;

    constructor(to: gState, condition: gPredicate) {
        this.to = to;
        this.condition = condition;
    }
}