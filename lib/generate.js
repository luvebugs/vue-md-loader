'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var t = _ref.types;

    var traverser = {
        ObjectExpression: function ObjectExpression(path, data) {
            path.pushContainer('properties', t.objectProperty(t.identifier('template'), t.stringLiteral(data.opts.template)));
            path.stop();
        },
        ExportDefaultDeclaration: function ExportDefaultDeclaration(path) {
            for (var index = 0; index < path.container.length; index++) {
                if (path.key !== index) {
                    path.getSibling(index).remove();
                }
            }
            path.replaceWith(t.returnStatement(path.node.declaration));
        }
    };
    return {
        visitor: {
            Program: function Program(path, data) {
                var nodes = [].concat((0, _toConsumableArray3.default)(path.node.body));
                path.get('body').forEach(function (node) {
                    node.remove();
                });
                path.pushContainer('body', t.expressionStatement(t.callExpression(t.functionExpression(null, [], t.blockStatement(nodes)), [])));
                path.traverse(traverser, {
                    opts: data.opts
                });
            }
        }
    };
};

module.exports = exports['default'];