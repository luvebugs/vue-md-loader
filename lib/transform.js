'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _babelTemplate = require('babel-template');

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var t = _ref.types;

    var propertyTraverser = {
        Identifier: function Identifier(path, data) {
            var parentPath = path.parentPath,
                node = path.node;

            if (node.name === 'components' && !data.state.hasComponents) {
                var key = this.state.key;
                var value = this.state.value;
                parentPath.get('value').pushContainer('properties', t.objectProperty(t.identifier(key), value.expression));
                data.state.hasComponents = true;
                path.stop();
            }
        }
    };

    var objectTraverser = {
        ObjectExpression: function ObjectExpression(path, data) {
            path.traverse(propertyTraverser, {
                opts: data.opts,
                state: this.state
            });
            var key = this.state.key;
            var value = this.state.value;
            if (!this.state.hasComponents) {
                path.pushContainer('properties', t.objectProperty(t.identifier('components'), t.objectExpression([t.objectProperty(t.identifier(key), value.expression)])));
                path.stop();
            }
        }
    };
    return {
        pre: function pre() {
            this.state = {
                key: '',
                value: {},
                hasComponents: false
            };
        },

        visitor: {
            Program: function Program(path, data) {
                this.state.hasComponents = data.opts.hasComponents;
                this.state.key = data.opts.key;
                this.state.value = (0, _babelTemplate2.default)(data.opts.value)();
                path.traverse(objectTraverser, {
                    opts: data.opts,
                    state: this.state
                });
                var key = this.state.key;
                var value = this.state.value;
                path.unshiftContainer('body', t.variableDeclaration('var', [t.variableDeclarator(t.identifier(key), value.expression)]));
                path.stop();
            }
        },
        post: function post() {
            delete this.state;
        }
    };
};

module.exports = exports['default'];