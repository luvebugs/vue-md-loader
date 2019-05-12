var babel = require('babel-core');
var fs = require('fs');

var codeText = fs.readFileSync(__dirname + '/./input.js').toString();

var options = {
    plugins: [
        [require.resolve('../lib/transform'), {
            key: 'name',
            value: `(function (){
                let b = 'testing...';
                return {
                    components: {
                        Demo : {
                            template: '<div>{{msg}}</div>',
                            data: function () {return {msg: '123'}}
                        }
                    }
                }
            })()`,
        }]
    ]

}

var ret = babel.transform(codeText, options)

var codeText = fs.writeFileSync(__dirname + '/./output.js', ret.code);