var babel = require('babel-core');
var fs = require('fs');

var codeText = fs.readFileSync(__dirname + '/./input.js').toString();

var options = {
    plugins: [
        [require.resolve('../lib/generate'), {
            "template": `<div>{{msg}}</div>`,
        }]
    ]

}

var ret = babel.transform(codeText, options)

var codeText = fs.writeFileSync(__dirname + '/./output.js', ret.code);