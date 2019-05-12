export default ({types: t}) => {
    const traverser = {
        ObjectExpression(path, data) {
            path.pushContainer('properties', t.objectProperty( t.identifier('template'), t.stringLiteral(data.opts.template)));
            path.stop();
        },
        ExportDefaultDeclaration(path) {
            for (let index = 0; index < path.container.length; index++) {
                if (path.key !== index) {
                    path.getSibling(index).remove();
                }
            }
            path.replaceWith(
                t.returnStatement(path.node.declaration)
            );
        }
    }
    return {
        visitor: {
            Program(path, data) {
                const nodes = [...path.node.body];
                path.get('body').forEach(node => {
                    node.remove();
                });
                path.pushContainer('body', t.expressionStatement(t.callExpression(t.functionExpression(null, [], t.blockStatement(nodes)), []))); 
                path.traverse(traverser, {
                    opts: data.opts
                });
            }
        }
    };
}