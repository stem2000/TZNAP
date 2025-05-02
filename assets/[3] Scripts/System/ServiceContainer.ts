import ServiceManager from "./ServiceManager";

export type Constructor<T = any> = new (...args: any[]) => T;

export class ServiceContainer {
    private services = new ServiceManager();

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
