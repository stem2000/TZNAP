import { IPredicate, IState, ITransition } from "../../Interfaces/Interfaces";
import { StateNode } from "./StateNode";
import { Transition } from "./Transition";

const {ccclass, property} = cc._decorator;

@ccclass
export class StateMachine {
    private current: StateNode | null = null;
    private nodes: Map<Function, StateNode> = new Map();
    private anyTransitions: Set<ITransition> = new Set();

    update() {
        const transition = this.getTransition();
        if (transition) {
            this.changeState(transition.to);
        }

        this.current?.state.update();
    }

    fixedUpdate() {
        this.current?.state.fixedUpdate();
    }

    setState(state: IState) {
        const node = this.nodes.get(state.constructor);
        if (!node) {
            throw new Error(`State not found: ${state.constructor.name}`);
        }
        this.current = node;
        this.current.state.onEnter();
    }

    private changeState(state: IState) {
        if (this.current?.state === state) return;

        const nextNode = this.nodes.get(state.constructor);
        if (!nextNode) {
            throw new Error(`Next state not found: ${state.constructor.name}`);
        }

        this.current?.state.onExit();
        nextNode.state.onEnter();
        this.current = nextNode;
    }

    private getTransition(): ITransition | null {
        const anyTransitions = Array.from(this.anyTransitions);

        for (const transition of anyTransitions) {
            if (transition.condition.evaluate()) 
                return transition;
        }

        
        if (this.current) {
            const currentTransitions = Array.from(this.anyTransitions);

            for (const transition of currentTransitions) {
                if (transition.condition.evaluate()) return transition;
            }
        }

        return null;
    }

    addTransition(from: IState, to: IState, condition: IPredicate) {
        const fromNode = this.getOrAddNode(from);
        const toNode = this.getOrAddNode(to);
        fromNode.addTransition(toNode.state, condition);
    }

    addAnyTransition(to: IState, condition: IPredicate) {
        const toNode = this.getOrAddNode(to);
        this.anyTransitions.add(new Transition(toNode.state, condition));
    }

    private getOrAddNode(state: IState): StateNode {
        const ctor = state.constructor;
        if (!this.nodes.has(ctor)) {
            this.nodes.set(ctor, new StateNode(state));
        }
        return this.nodes.get(ctor)!;
    }
}
