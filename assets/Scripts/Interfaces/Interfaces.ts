import { ServiceContainer } from "../System/ServiceContainer";

export interface IInjectable{
    _inject_(container: ServiceContainer): void;
}

export interface IBootable{
    _init_(): void;
}