import { gPredicate } from "./gPredicate";
import { gState } from "./gState";
import { gTransition } from "./gTransition";

const {ccclass, property} = cc._decorator;

@ccclass
export class StateMachine {
    private current: gState | null = null;
    private states: Map<Function, gState> = new Map();
    private anyTransitions: Set<gTransition> = new Set();

    update() {
        const transition = this.getTransition();
        if (transition) {
            this.changeState(transition.to);
        }

        this.current?.state.update();
    }

    setState(state: gState) {
        const temp = this.states.get(state.constructor);
        if (!temp) {
            throw new Error(`State not found: ${state.constructor.name}`);
        }
        this.current = temp;
        this.current.state.onEnter();
    }

    private changeState(state: gState) {
        if (this.current?.state === state) return;

        const nextState = this.states.get(state.constructor);
        if (!nextState) {
            throw new Error(`Next state not found: ${state.constructor.name}`);
        }

        this.current?.state.onExit();
        nextState.state.onEnter();
        this.current = nextState;
    }

    private getTransition(): gTransition | null {
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

    addTransition(from: gState, to: gState, condition: gPredicate) {
        const fromState = this.getOrAddState(from);
        const toState = this.getOrAddState(to);
        fromState.addTransition(toState.state, condition);
    }

    addAnyTransition(to: gState, condition: gPredicate) {
        const toState = this.getOrAddState(to);
        this.anyTransitions.add(new gTransition(toState.state, condition));
    }

    private getOrAddState(state: gState): gState {
        const ctor = state.constructor;
        if (!this.states.has(ctor)) {
            this.states.set(ctor, new gState());
        }
        return this.states.get(ctor)!;
    }
}
