import PrefabStorage from "./PrefabStorage";
import { ServiceLocator } from "./ServiceLocator";
import ServiceRegistrationStrategy from "./ServiceRegistrationStratgies/ServiceRegistrationStrategy";

const {ccclass, property} = cc._decorator;

@ccclass()
export default class Bootrstrap extends cc.Component {
    @property(ServiceRegistrationStrategy)
    serviceRegistration: ServiceRegistrationStrategy = null;

    onLoad(): void {
        this.serviceRegistration.RegisterAll();
    }
}
