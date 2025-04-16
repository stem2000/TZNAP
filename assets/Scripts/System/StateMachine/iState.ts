import { iPredicate } from "./iPredicate";
import { Transition as Transition } from "./Transition";

export class iState {
    public transitions: Set<Transition> = new Set();


    public get state(): iState{
        return this;
    };

    public constructor(){
        return;
    }

    public addTransition(to: iState, condition: iPredicate) {
        this.transitions.add(new Transition(to, condition));
    }

    public onEnter(): void {};
    public onExit(): void {};
    public update(): void {};

}