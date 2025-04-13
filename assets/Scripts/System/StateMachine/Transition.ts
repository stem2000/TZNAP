import { ITransition, IState, IPredicate } from "../../Interfaces/Interfaces";

export class Transition implements ITransition {
    constructor(public to: IState, public condition: IPredicate) {}
}