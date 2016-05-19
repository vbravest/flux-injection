export default class Injector {
    
    constructor() {
        this.classes = {};
        this.instances = {};
    }
    
    register(id, Class) {
        this.classes[id] = Class;
    }
    
    create(Class) {
        const inject = Class.inject;

        console.log(Class, Class.inject)
        
        const params = inject.map(id => {
            if (this.instances[id] == null) {
                const InjectClass = this.classes[id];
                this.instances[id] = new InjectClass();
            }
            return this.instances[id];
        });
        
        return new Class(...params);
    }
}
