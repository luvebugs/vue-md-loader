import template from 'babel-template';
export default ({types: t}) => {
    const propertyTraverser = {
        Identifier(path, data) {
            const {
                parentPath,
                node
            } = path
            if (node.name === 'components' && !data.state.hasComponents) {
                const key = this.state.key;
                const value = this.state.value;
                parentPath.get('value').pushContainer('properties', t.objectProperty(t.identifier(key), value.expression));
                data.state.hasComponents = true;
                path.stop();
            }
        }
    }
    
    const objectTraverser = {
        ObjectExpression(path, data) {
            path.traverse(propertyTraverser, {
                opts: data.opts,
                state: this.state,
            });
            const key = this.state.key;
            const value = this.state.value;
            if (!this.state.hasComponents) {
                path.pushContainer('properties', t.objectProperty(t.identifier('components'), t.objectExpression([t.objectProperty(t.identifier(key), value.expression)])));
                path.stop();
            }
        }
    };
    return {
        pre() {
            this.state= {
                key: '',
                value: {},
                hasComponents: false
            };
        },
        visitor: {
            Program(path, data) {
                this.state.hasComponents = data.opts.hasComponents;
                this.state.key = data.opts.key;
                this.state.value = template(data.opts.value)();
                path.traverse(objectTraverser, {
                    opts: data.opts,
                    state: this.state,
                });
                const key = this.state.key;
                const value = this.state.value;
                path.unshiftContainer('body', t.variableDeclaration('var', [t.variableDeclarator(t.identifier(key), value.expression)]));
                path.stop();
            }
        },
        post() {
            delete this.state;
        }
    };
}