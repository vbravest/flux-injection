import $ from 'jquery';

export default class UserStore {
    
    constructor() {
        this.isWaiting = false
        
        this.user = null;
        
        $(window).on('UserStore.SetUser', this.setUser.bind(this));
        $(window).on('UserStore.SetWaiting', this.setWaiting.bind(this));
    }
    
    setWaiting(event, isWaiting) {
        this.isWaiting = isWaiting;
        
        this.emitChange();
    }
    
    setUser(event, user) {
        this.user = {
            email: user.email,
            last: user.last,
            first: user.first,
            city: user.city,
        }
        
        this.emitChange();
    }
    
    // Let all the views know that something has changed
    emitChange() {
        $(window).trigger('UserStore.Change');
    }
}
