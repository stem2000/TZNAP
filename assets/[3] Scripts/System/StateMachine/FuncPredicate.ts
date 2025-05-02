import { iPredicate } from "./iPredicate";

export default class FuncPredicate implements iPredicate {
    private func: () => boolean;

    constructor(func: () => boolean) {
        this.func = func;
    }

    evaluate(): boolean {
        return this.func();
    }
}