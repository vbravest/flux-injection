# FLUX INJECTION

Example of using dependency injection to refer to Flux Stores and Actions.

## BUILDING

    Node 6.1.0

    $ npm install
    $ gulp

## ANTI-PATTERN 1

Here is what we are trying to fix. 

The following code means that the UserView is very testable, because it is reaching out to find a "global" singleton. In other words, if we wanted to provide UserView with a mock substitute of UserStore, this is very hard to do since it is instantiated inside of the UserStore.js file.

In UserStore.js

    class UserStore {
        //...
    }
    export default new UserStore();

In UserView.js

    import userStore from 'UserStore';

    class UserView {
        constructor () {
            userStore.getStuff();
        }   
    }

## ANTI-PATTERN 2

The following is better because we can provide an instance in the constructor, and doesn't rely on any globals. However, it is a pain to have to pass along `userStore` in the constructor every time.

In UserStore.js

    class UserStore {
        //...
    }
    export default UserStore;

In UserView.js

    class UserView {
        constructor (userStore) {
            userStore.getStuff();
        }   
    }

In App.js

    const userStore = new UserStore();
    const userView = new UserView(userStore);


## SOLUTION

Use dependency injection (similar to that in Angular.js). Whenever we create a UserView, it will automagically be injected with our UserStore instance.

This accomplishes the same things as the above code, but it replaces `new UserView(userStore)`.

In UserStore.js

    class UserStore {
        //...
    }
    export default UserStore;

In UserView.js

    class UserView {
        // This tells the Injector what instances to provide to the constructor
        static inject = ['userStore'];

        constructor (userStore) {
            userStore.getStuff();
        }   
    }

In App.js

    const injector = new Injector();

    // Tells the injector that a class called 'userStore' exists
    injector.register('userStore', UserStore);

    // Looks at the `inject` property of the UserView class,
    // and injects an instance of anything that has been registered
    // via injector.register
    const userView = injector.create(UserView);
