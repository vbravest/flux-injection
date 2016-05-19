import UserAction from 'UserAction';
import UserStore from 'UserStore';
import UserView from 'UserView';
import Injector from 'Injector';
import $ from 'jquery';

export default class App {
    constructor() {
        const injector = new Injector();
        injector.register('userAction', UserAction);
        injector.register('userStore', UserStore);
        
        // Automatically inject stuff into the constructor
        // Same as `const userView = new UserView(userAction, userStore)`
        const userView = injector.create(UserView);
        
        userView.init($('.js-userView'));
    }
}
