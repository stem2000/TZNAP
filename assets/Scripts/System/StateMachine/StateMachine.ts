import { iPredicate } from "./iPredicate";
import { iState } from "./iState";
import { iTransition as iTransition } from "./iTransition";

const {ccclass, property} = cc._decorator;

@ccclass
export class StateMachine {
    private current: iState | null = null;
    private states: Map<Function, iState> = new Map();
    private anyTransitions: Set<iTransition> = new Set();

    update() {
        const transition = this.getTransition();
        if (transition) {
            this.changeState(transition.to);
        }

        this.current?.state.update();
    }

    setState(state: iState) {
        const temp = this.states.get(state.constructor);
        if (!temp) {
            throw new Error(`State not found: ${state.constructor.name}`);
        }
        this.current = temp;
        this.current.state.onEnter();
    }

    private changeState(state: iState) {
        if (this.current?.state === state) return;

        const nextState = this.states.get(state.constructor);
        if (!nextState) {
            throw new Error(`Next state not found: ${state.constructor.name}`);
        }

        this.current?.state.onExit();
        nextState.state.onEnter();
        this.current = nextState;
    }

    private getTransition(): iTransition | null {
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
        this.anyTransitions.add(new iTransition(toState.state, condition));
    }

    private getOrAddState(state: iState): iState {
        const ctor = state.constructor;
        if (!this.states.has(ctor)) {
            this.states.set(ctor, new iState());
        }
        return this.states.get(ctor)!;
    }
}
