import { IInjectable } from "../Interfaces/Interfaces";
import { ServiceContainer } from "./ServiceContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export abstract default class aBootableComponent extends cc.Component implements IInjectable {
    abstract _inject_(container: ServiceContainer): void;
}
