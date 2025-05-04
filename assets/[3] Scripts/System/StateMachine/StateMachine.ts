import { iPredicate } from "./iPredicate";
import { iState } from "./iState";
import StateNode from "./StateNode";
import { Transition as Transition } from "./Transition";

const {ccclass, property} = cc._decorator;

@ccclass
export class StateMachine {
    private current: StateNode | null = null;
    private states: Map<Function, StateNode> = new Map();
    private anyTransitions: Set<Transition> = new Set();

    update() {
        const transition = this.getTransition();
        if (transition) {
            this.changeState(transition.to);
        }

        this.current?.state.update();
    }

    setState(state: iState) {
        const node = this.states.get(state.constructor);
        if (!node) {
            throw new Error(`State not found: ${state.constructor.name}`);
        }
        this.current = node;
        this.current.state.onEnter();
    }

    private changeState(state: iState) {
        if (this.current?.state === state) return;

        const nextNode = this.states.get(state.constructor);

        if (!nextNode) {
            throw new Error(`Next state not found: ${state.constructor.name}`);
        }

        this.current?.state.onExit();
        nextNode.state.onEnter();
        this.current = nextNode;

        cc.log("State Machine - changeState :" + this.current.state.constructor.name);
    }

    private getTransition(): Transition | null {
        const anyTransitions = Array.from(this.anyTransitions);

        for (const transition of anyTransitions) {
            if (transition.condition.evaluate()) 
                return transition;
        }

        
        if (this.current) {
            const currentTransitions = Array.from(this.current.transitions);

            for (const transition of currentTransitions) {
                if (transition.condition.evaluate()) return transition;
            }
        }

        return null;
    }

    addTransition(from: iState, to: iState, condition: iPredicate) {
        const fromState = this.getOrAddState(from);
        const toState = this.getOrAddState(to);
        fromState.addTransition(toState.state, condition);
    }

    addAnyTransition(to: iState, condition: iPredicate) {
        const toState = this.getOrAddState(to);
        this.anyTransitions.add(new Transition(toState.state, condition));
    }

    private getOrAddState(state: iState): StateNode {
        const ctor = state.constructor;
        if (!this.states.has(ctor)) {
            this.states.set(ctor, new StateNode(state));
        }
        
        return this.states.get(ctor)!;
    }
}
