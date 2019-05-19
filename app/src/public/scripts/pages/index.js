const path = location.pathname;

const postRegex = new RegExp(/^\/post\/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

switch (true) {
    case path === '/':
        import(/* webpackChunkName: "home" */ './home');
        break;
    case postRegex.test(path):
        import(/* webpackChunkName: "post" */ './post');
        break;
    default:
        break;
}
