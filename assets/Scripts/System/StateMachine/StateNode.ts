import { ITransition, IState, IPredicate } from "../../Interfaces/Interfaces";
import { Transition } from "./Transition";

export class StateNode {
    public transitions: Set<ITransition> = new Set();

    constructor(public state: IState) {}

    addTransition(to: IState, condition: IPredicate) {
        this.transitions.add(new Transition(to, condition));
    }
}