const {ccclass, property} = cc._decorator;

type Constructor<T = any> = new (...args: any[]) => T;

@ccclass
export default class ServiceManager{
    private services = new Map<Constructor, any>();

  public get registeredServices(): Iterable<any> {
    return this.services.values();
  }

  public tryGet<T>(type: Constructor<T>): T | null {
    const service = this.services.get(type);
    return service ?? null;
  }

  public get<T>(type: Constructor<T>): T {
    const service = this.services.get(type);
    if (!service) {
      throw new Error(`ServiceManager.get: Service of type ${type.name} not registered`);
    }
    return service;
  }

  public register<T>(type: Constructor<T>, instance: T): this {
    if (!(instance instanceof type)) {
      throw new Error("Type of service does not match the constructor");
    }

    if (this.services.has(type)) {
      console.error(`ServiceManager.register: Service of type ${type.name} already registered`);
    } else {
      this.services.set(type, instance);
    }
    return this;
  }

  public registerAuto<T>(instance: T): this {
    const type = instance.constructor as Constructor<T>;
    return this.register(type, instance);
  }
}
