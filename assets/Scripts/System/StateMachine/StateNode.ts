import { iPredicate } from "./iPredicate";
import { iState } from "./iState";
import { Transition } from "./Transition";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StateNode {
    public readonly state: iState;
    public readonly transitions: Set<Transition>;

    constructor(state: iState) {
        this.state = state;
        this.transitions = new Set<Transition>();
    }

    public addTransition(to: iState, condition: iPredicate): void {
        this.transitions.add(new Transition(to, condition));
    }
}