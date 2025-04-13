export interface IState {
    onEnter(): void;
    onExit(): void;
    update(): void;
    fixedUpdate(): void;
}

export interface IPredicate {
    evaluate(): boolean;
}

export interface ITransition {
    to: IState;
    condition: IPredicate;
}

export interface IService{
    _linkService(): void;
}