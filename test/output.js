(function () {
    return {
        components: {
            Demo: {
                template: '<div>{{msg}}</div>',
                data: function () {
                    return { msg: '123' };
                }
            }
        },
        template: '<div>{{msg}}</div>'
    };
})();