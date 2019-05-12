let b = 'testing...'

export default {
    components: {
        Demo : {
            template: '<div>{{msg}}</div>',
            data: function () {return {msg: '123'}}
        }
    }
}