import $ from 'jquery';

export default class UserView {
    static inject = ['userStore', 'userAction'];
    
    constructor(userStore, userAction) {
        this.userStore = userStore;
        this.userAction = userAction;
    }
    
    init($element) {
        this.$element = $element;
        
        // Event handlers
        $('.js-loginButton').on('click', this.onLoginButtonClick.bind(this));
        
        // Subscribe to store changes
        $(window).on('UserStore.Change', (event) => { this.render(); });
        
        // Initial render
        this.render();
    }
    
    onLoginButtonClick() {
        this.userAction.login();
    }
    
    // Render based on state of the model 
    render() {
        const user = this.userStore.user;
        const isWaiting = this.userStore.isWaiting;
        

        if (isWaiting) {
            this.$element.html('Logging in, please wait...');
        } else if (user == null) {
            this.$element.html('Not logged in!');
        } else {
            this.$element.html(`
                <ul>
                    <li>Email: ${user.email}</li>
                    <li>First: ${user.first}</li>
                    <li>Last: ${user.last}</li>
                    <li>City: ${user.city}</li>
                </ul>
            `);
        }
    }
}
