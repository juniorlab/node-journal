const path = location.pathname;

switch (true) {
    case path === '/':
        import(/* webpackChunkName: "home" */ './home');
        break;
    default:
        break;
}
