import { gPredicate } from "./gPredicate";
import { gTransition as gTransition } from "./gTransition";

export class gState {
    public transitions: Set<gTransition> = new Set();
    public get state(): gState{
        return this;
    };

    public addTransition(to: gState, condition: gPredicate) {
        this.transitions.add(new gTransition(to, condition));
    }

    public onEnter(): void {};
    public onExit(): void {};
    public update(): void {};

}