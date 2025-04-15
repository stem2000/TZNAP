import { iPredicate } from "./iPredicate";
import { iTransition as iTransition } from "./iTransition";

export class iState {
    public transitions: Set<iTransition> = new Set();


    public get state(): iState{
        return this;
    };

    public constructor(){
        return;
    }

    public addTransition(to: iState, condition: iPredicate) {
        this.transitions.add(new iTransition(to, condition));
    }

    public onEnter(): void {};
    public onExit(): void {};
    public update(): void {};

}