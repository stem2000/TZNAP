import { iPredicate } from "./iPredicate";
import { iState } from "./iState";

export class Transition {
    public readonly to: iState;
    public readonly condition: iPredicate;

    constructor(to: iState, condition: iPredicate) {
        this.to = to;
        this.condition = condition;
    }
}