type Func<TArgs extends any[], TResult> = (...args: TArgs) => TResult;

export default class Request<TArgs extends any[], TResult>{
    function: Func<TArgs, TResult>;

    constructor(func: Func<TArgs, TResult>){
        this.function = func;
    }

    public GetRequested(...args: TArgs): TResult{
        return this.function(...args);
    }
}
