export interface IServiced {
    _get_services_on_ctor();
}

export interface IServicedComponent{
    _get_services_on_start();
}

export interface IService{
    _register_on_load();
}



