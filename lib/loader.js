'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (source) {

    var style = '';
    var components = [];

    var scriptReg = /<script>([\s\S]*)<\/script>/;
    var styleReg = /<style>([\s\S]*)<\/style>/;
    var templateReg = /<template>([\s\S]*)<\/template>/;

    var options = (0, _loaderUtils.getOptions)(this);
    var pattern = options && options.pattern || /component@([\s\S]*)/;

    var md = (0, _markdownIt2.default)({
        html: true,
        highlight: function highlight(str) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'html';

            return _highlight2.default.highlight('html', str, true).value;
        },
        wrapper: 'section'
    });

    var rules = ['html_block', 'html_inline', 'code_inline', 'code_block', 'fence'];

    rules.forEach(function (rule) {
        var defaultRule = md.renderer.rules[rule];
        md.renderer.rules[rule] = function () {
            var str = defaultRule.apply(this, arguments);
            return str.replace(/(<pre|<code)/g, '$1 v-pre');
        };
    });

    md.core.ruler.push('extract_script_or_style', function (state) {
        state.tokens.filter(function (token) {
            return token.type == 'fence' && pattern.test(token.info);
        }).forEach(function (token) {
            style += styleReg.exec(token.content) ? styleReg.exec(token.content)[1] : '';
            var script = scriptReg.exec(token.content) ? scriptReg.exec(token.content)[1] : '';
            var template = templateReg.exec(token.content) ? templateReg.exec(token.content)[1] : '';
            var key = token.info.match(pattern)[1];
            var value = babel.transform(script, {
                plugins: [[_generate2.default, {
                    "template": template
                }]]
            }).code;
            components.push({
                key: key,
                value: value
            });
        });
    });

    options && options.plugins && options.plugins.forEach(function (plugin) {
        return md.use(plugin);
    });

    var html = md.render(source);
    var $ = _cheerio2.default.load(html, {
        decodeEntities: false,
        lowerCaseAttributeNames: false,
        lowerCaseTags: false
    });

    var script = scriptReg.exec($.html($('script'))) ? scriptReg.exec($.html($('script')))[1] : 'export default {}';
    style += styleReg.exec($.html('style')) ? styleReg.exec($.html('style'))[1] : '';

    components.forEach(function (component) {
        var key = component.key,
            value = component.value;

        script = babel.transform(script, {
            plugins: [[_transform2.default, {
                key: key,
                value: value
            }]]
        }).code;
    });

    $('style').remove();
    $('script').remove();

    return '<template><div>' + $.html() + '</div></template>\n<script>' + script + '</script>\n<style>' + style + '</style>';
};

var _loaderUtils = require('loader-utils');

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _babelCore = require('babel-core');

var babel = _interopRequireWildcard(_babelCore);

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

var _transform = require('./transform');

var _transform2 = _interopRequireDefault(_transform);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];