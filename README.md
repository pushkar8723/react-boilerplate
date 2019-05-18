[![Build Status](https://travis-ci.org/pushkar8723/react-boilerplate.svg?branch=master)](https://travis-ci.org/pushkar8723/react-boilerplate) [![Coverage Status](https://coveralls.io/repos/github/pushkar8723/react-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/pushkar8723/react-boilerplate?branch=master)

React Boilerplate
=================

A small demo project with all boilerplate code already in place! :tada:

Just clone and start building pages. Maybe delete a few files first. :stuck_out_tongue:

### Out of the box functionalities :100:

- [X] Complete MVC architechture
- [X] Application State management
- [X] Immutable state
- [X] Routing with nested routes and lazy load
- [X] Build pipeline
- [X] Test pipeline
- [X] Lint checks
- [ ] SSR
- [ ] Routing using browser history api
- [ ] Pre-rendering

### Why:question:

While working on react for about a year now, I realised that though it helps in making application behaviour more predictable, creating and maintaing an application in react comes with a lot of boilerplate code, mostly because react just gives you view for your application. Rest you have to piece together using third party libraries which in turn adds more boilerplate code. This splits related code accross multiple files and makes it hard  to maintain when application size grows. Also, writing and maintaining test cases for each of these components slowly becomes a hassel.

Keeping all these in mind I tried to take a framework approach where all application state management is hidden behind a few abstractions so that the developer can get to building UI within few minutes.

### Sounds cool, tell me more about these abstractions :thinking:

Well its not much. You just have to know following 5 things.

##### 1. Views
Views are just react components. Functional or class based, doesn't matter. Write whatever way you like. There is only one catch here. Each view will be injected with 2 props, `scope` and `global`. We will cover these in more detail in controller section. However, you can devide views into sub-components and pass props as per your need.

##### 2. Controller
Controller exposes methods which are injected into views as props. Each controller has access to same `scope` and `global` props injected in view, under private properties `this._scope` and `this._global`. Think of these as areas in application state (Model of your application) which can be mananged by the controller. `scope` is data required specifically for current view. Whereas `global` is something that can be shared accross application like user context.

For example, in ecommerce world, count of items in your cart can be in `global` context so that it is accessible across pages. Where as product(s) information can be stored in `scope`. Another example would be a chat application, where number of unread messages and count of unread message per person can be store in `global`. Where as `scope` would contain messages from currently selected friend.

To update `scope` and `global`, `this._setScope` and `this._setGlobal` are also available in controller. These works exactly like `this.setScope` in a react component. Only, difference is that they would update your application state and thus the updated data will then flow to both *view* and *controller*.

All public properties in controller is automatically injected in view as props. So, suppose there is a public method in contoller called `login`. This can be called from view by calling `this.props.login()`.

Each controller must extend `ControllerBase` class.

##### 3. Routing
Instead of using `react-router`, we are using `ui-router` for our routing. This is done because personally I feel that route is a logical entity of application and representing it with components makes code a little complex and unreadable. `ui-router` represents states using objects and thus it is much more readable.

Also, `ui-router` is framwork independent and thus this gives us room to use some other view library like vue or polymer just by changing few pieces in the core logic.

A route is created using `createRoute` method. It takes in config of format
```typescript
export interface IRouteState {
    // Name of the route
    name: string;
    // Component to be rendered.
    component?: ComponentType;
    // Controller for the component
    controller?: any;
    // Route data object
    data?: any;
    // url for the route.
    url?: string;
    // Redirection State.
    redirectTo?: string;
    // Lazy loaded function
    lazyLoad?: () => Promise<any>;
}
```
Lets cover each of these properties in detail.
- **name** is the name for the state. Each name should be unique. And nested route is seprated by `.`. For example, consider 3 routes created in this project `books`, `books.search` and `books.detail`. Here, `books.search` and `books.detail` are children of `books` route. Thus, date in `books`'s scope will be available as ready only in `books.search` and `books.detail`. Thus, giveing the entire application a hierarchical structure. Also, when user moves away from a route, this name helps us identify what all scopes need to be cleared out.
- **component** is the react component to be used as view.
- **controller** is just controller class for the view. It is optional as there can be cases where a view doesn't need to update state.
- **data** can be any data that can be associated with the route. Like authentication or page title. This too is optional.
- **url** is the relative path of the route from its parent. This too is optional.
- **redirectTo** is used to redirect the user to another state whenever user lands on this state. This is required in cases where the route is needed only for logical purpose. Like `books` in this application. `books` can only exists with `books.search` or `books.detail`.
- **lazyLoad** is used to lazy load certain routes. Name for such states should end with `.**`. Refer `booksFutureState` [here](https://github.com/pushkar8723/react-boilerplate/blob/master/src/config/routes.ts) for better understanding.

Refer [base route](https://github.com/pushkar8723/react-boilerplate/blob/master/src/config/routes.ts) and [books route](https://github.com/pushkar8723/react-boilerplate/blob/master/src/views/Books/index.ts) to get better picture on how rouiting is done in this application.

Since we are using `ui-router`, you can refere their [doc](https://ui-router.github.io/react/) for more information.

##### 4. Services
Services are used to store application logic which are required across views like, api endpoints and storage abastractions etc.
These are just plain classes. Only thing that needs to be done is extend `ServiceBase` class. Extending `ServiceBase` class makes them singleton classes.

##### 5. Initializing Application
`initApp` method initializes the application and returns a react component which needs to be mounted on dom using `ReactDom.render`. Before calling `ReactDom.render`, routes should be configured. Refer [app file](https://github.com/pushkar8723/react-boilerplate/blob/master/src/app.ts) where I initialized this demo application.

Ands thats all you need to know.

### That was quite a list! :tired_face:
Well to be fair most of it is basic MVC concept. Things that you really need to know are `scope`, `global`, `createRoute` and `initApp`.

### :relaxed: Yeah right! What about testing? 
All you need to do is test controllers and services separately, and all business logic in your application is tested.

Lets go through one of each.

**Controller Example**
```typescript
// importing controller and services it uses.
import GoogleBooksService from 'services/GoogleBooksService';
import DetailCtrl from 'views/Books/Detail/DetailCtrl';
import bookDetail from './BookDetail.json';

let ctrl: DetailCtrl;
let setScope: () => void;
let setGlobal: () => void;

// mocking the service.
jest.mock('services/GoogleBooksService');

// re-initializing services and controller before each test
beforeEach(() => {
    setScope = jest.fn();
    setGlobal = jest.fn();
    GoogleBooksService.mockClear();
    ctrl = new DetailCtrl({}, setScope, {}, setGlobal);
});

// Actual test
it('Test Get Book Success', () => {
    // mocking services being used
    const googleBooksService = GoogleBooksService.mock.instances[0];
    googleBooksService.getBook = jest.fn(() =>
        Promise.resolve(bookDetail.response));

    // calling a method in controller
    const promise = ctrl.getBook('abc');
    
    // Check for number of assertions, since its an async process. 
    expect.assertions(4);
    
    // Checking pre-async call logic
    expect(setGlobal).toHaveBeenCalledWith({ inProgress: true });
    expect(googleBooksService.getBook).toHaveBeenCalledWith('abc');
    
    // Checking post-async call logic
    return promise.then(() => {
        expect(setGlobal).toHaveBeenCalledWith({ inProgress: false });
        expect(setScope).toHaveBeenCalledWith(bookDetail.response);
    });
});
```

**Service Example**
```typescript
// importing the service
import LocalStorageService from 'services/LocalStorageService';

let service: LocalStorageService;

// re-initializing the service before each test.
beforeEach(() => {
    service = new LocalStorageService();
});

// actual test
it('Test Get', () => {
    // mocking any other service it may depend on.
    const spy = jest.spyOn(Storage.prototype, 'getItem');
    // calling service method
    service.get('auth');
    // finally checking execution logic.
    expect(spy).toHaveBeenCalledWith('auth');
});
```

### Nice! Any future milestone? :grin:
Well yes, I will soon separate out state management logic and publish a npm package. Also, I will try to onboard atlease one other component rendering library (vue or polymer) to see how much of this code can be reused.

SSR / pre-rendering with browser history api usage is also on top of my list right now.

### How can I contribute? :grinning:
Improving documentation / raising issues can be a good starting point. If you could think of any feature that would be great and if you raise PR, nothing can beat that! :laughing:

##### [MIT License](https://github.com/pushkar8723/react-boilerplate/blob/master/LICENSE)
