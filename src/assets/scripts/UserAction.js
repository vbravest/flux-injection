import $ from 'jquery';

export default class UserAction {

    login() {
        $(window).trigger('UserStore.SetWaiting', true);
        
        // Simulate going out and getting data asyncronously
        window.setTimeout(() => {
            const user = {
                email: 'john.doe@gmail.com',
                first: 'John',
                last: 'Doe',
                city: 'Minneapolis',
            };
            
            // After we get the data,
            // let our store know that new data is available
            $(window).trigger('UserStore.SetWaiting', false);
            $(window).trigger('UserStore.SetUser', user);
        }, 1000);
    }
}
