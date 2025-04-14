import ServiceManager from "./ServiceManager";

const {ccclass, property} = cc._decorator;
export type Constructor<T = any> = new (...args: any[]) => T;

@ccclass
export class ServiceLocator extends cc.Component {
    linkAll() {
        throw new Error("Method not implemented.");
    }
    private static global: ServiceLocator | null = null;
    private services = new ServiceManager();

    static getGlobal(): ServiceLocator {
        if (!this.global) {
            this.global = new ServiceLocator();
        }
        return this.global;
    }

    public register<T>(ctor: Constructor<T>, service: T): this {
        this.services.register(ctor, service);
        return this;
    }

    public get<T>(ctor: Constructor<T>): T {
        return this.services.get(ctor);
    }

    public tryGet<T>(ctor: Constructor<T>): T | null {
        return this.services.tryGet(ctor);
    }    
}
