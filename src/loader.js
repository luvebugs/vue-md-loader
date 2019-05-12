import {getOptions} from 'loader-utils';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import cheerio from 'cheerio';
import * as babel from 'babel-core';
import generate from './generate';
import transform from './transform';

export default function (source) {
    
    let style = '';
    let components = [];
    
    const scriptReg = /<script>([\s\S]*)<\/script>/;
    const styleReg = /<style>([\s\S]*)<\/style>/;
    const templateReg = /<template>([\s\S]*)<\/template>/;

    const options = getOptions(this);
    const pattern = options && options.pattern || /component@([\s\S]*)/;

    const md = MarkdownIt({
        html: true,
        highlight: function(str, lang = 'html') {
            return hljs.highlight('html', str, true).value;
        },
        wrapper: 'section'
    });
    
    const rules = ['html_block', 'html_inline', 'code_inline', 'code_block', 'fence'];

    rules.forEach(rule => {
        const defaultRule = md.renderer.rules[rule];
        md.renderer.rules[rule] = function () {
            const str = defaultRule.apply(this, arguments);
            return str.replace(/(<pre|<code)/g, '$1 v-pre');
        };
    });

    md.core.ruler.push('extract_script_or_style', state => {
        state.tokens.filter(token => token.type == 'fence' && pattern.test(token.info))
            .forEach(token => {
                style += styleReg.exec(token.content) ? styleReg.exec(token.content)[1] : '';
                const script = scriptReg.exec(token.content) ? scriptReg.exec(token.content)[1] : '';
                const template = templateReg.exec(token.content) ? templateReg.exec(token.content)[1] : '';
                const key = token.info.match(pattern)[1];
                const value = babel.transform(script, {
                    plugins: [[
                        generate, {
                            "template": template,
                        }
                    ]]
                }).code
                components.push({
                    key,
                    value,
                });
            });
    });

    options && options.plugins && options.plugins.forEach(plugin => md.use(plugin))
    
    const html =  md.render(source);
    const $ = cheerio.load(html, {
        decodeEntities: false,
        lowerCaseAttributeNames: false,
        lowerCaseTags: false
    });

    let script = scriptReg.exec($.html($('script'))) ? scriptReg.exec($.html($('script')))[1] : 'export default {}';
    style += styleReg.exec($.html('style')) ? styleReg.exec($.html('style'))[1] : '';

    components.forEach((component) => {
        const {key, value} = component;
        script = babel.transform(script, {
            plugins: [
                [transform, {
                    key,
                    value
                }]
            ]
        }).code;
    });
    

    $('style').remove();
    $('script').remove();
    
    return`<template><div>${$.html()}</div></template>\n<script>${script}</script>\n<style>${style}</style>`;
};