<template>
    <div>
        <html>

        <head></head>

        <body>
            <h1>Test MD case</h1>
            <p>this is the demo named demo1</p>
            <pre v-pre=""><code v-pre="" class="language-component@Demo1">    <span class="hljs-tag"><<span class="hljs-name">template</span>></span>
        <span class="hljs-tag"><<span class="hljs-name">section</span>></span>
            <span class="hljs-tag"><<span class="hljs-name">h1</span>></span>Test title<span class="hljs-tag"></<span class="hljs-name">h1</span>></span>
            <span class="hljs-tag"><<span class="hljs-name">p</span>></span>count: {{count}}<span class="hljs-tag"></<span class="hljs-name">p</span>></span>
            <span class="hljs-tag"><<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"add"</span>></span>+1<span class="hljs-tag"></<span class="hljs-name">button</span>></span>
            <span class="hljs-tag"><<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"minus"</span>></span>-1<span class="hljs-tag"></<span class="hljs-name">button</span>></span>
        <span class="hljs-tag"></<span class="hljs-name">section</span>></span>
    <span class="hljs-tag"></<span class="hljs-name">template</span>></span>
    <span class="hljs-tag"><<span class="hljs-name">script</span>></span><span class="javascript">
        <span class="hljs-keyword">let</span> b = <span class="hljs-string">'testing...'</span>
        <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
            data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
            }
            },
            <span class="hljs-attr">methods</span>: {
            add () {
                <span class="hljs-keyword">this</span>.count++
            },
            minus () {
                <span class="hljs-keyword">this</span>.count--
            }
            }
        }
    </span><span class="hljs-tag"></<span class="hljs-name">script</span>></span>
    <span class="hljs-tag"><<span class="hljs-name">style</span>></span><span class="css">
        <span class="hljs-selector-tag">p</span> {
            <span class="hljs-attribute">backgrund</span>: <span class="hljs-number">#000</span>
        }
    </span><span class="hljs-tag"></<span class="hljs-name">style</span>></span>
</code></pre>
            <div class="browser-mockup with-url">
                <demo1></demo1>
            </div>
            <p>this is the demo named demo2</p>
            <pre v-pre=""><code v-pre="" class="language-component@Demo2">    <span class="hljs-tag"><<span class="hljs-name">template</span>></span>
        <span class="hljs-tag"><<span class="hljs-name">div</span>></span>{{msg}}<span class="hljs-tag"></<span class="hljs-name">div</span>></span>
    <span class="hljs-tag"></<span class="hljs-name">template</span>></span>
    <span class="hljs-tag"><<span class="hljs-name">script</span>></span><span class="javascript">
        <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
            data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">msg</span>: <span class="hljs-number">0</span>
            }
            }
        }
    </span><span class="hljs-tag"></<span class="hljs-name">script</span>></span>
    <span class="hljs-tag"><<span class="hljs-name">style</span>></span><span class="css">
        <span class="hljs-selector-tag">p</span> {
            <span class="hljs-attribute">backgrund</span>: <span class="hljs-number">#000</span>
        }
    </span><span class="hljs-tag"></<span class="hljs-name">style</span>></span>
</code></pre>
            <div class="browser-mockup with-url">
                <demo2></demo2>
            </div>
            <p>this is the global demo named Demo</p>
            <div class="browser-mockup with-url">
                <demo></demo>
            </div>
            <script>
                export default {
                    components: {
                        Demo: {
                            template: '<div>{{msg}}</div>',
                            data: function () {
                                return {
                                    msg: '123'
                                }
                            }
                        }
                    }
                }
            </script>
            <style>
                p {
                    backgrund: #000
                }
            </style>
        </body>

        </html>
    </div>
</template>
<script>
    export default {
        components: {
            Demo: {
                template: '<div>{{msg}}</div>',
                data: function () {
                    return {
                        msg: '123'
                    };
                }
            },
            Demo1: function () {
                return {
                    data() {
                        return {
                            count: 0
                        };
                    },

                    methods: {
                        add() {
                            this.count++;
                        },

                        minus() {
                            this.count--;
                        }

                    },
                    template: '<div>\n        <section>\n            <h1>Test title</h1>\n            <p>count: {{count}}</p>\n            <button type="button" @click="add">+1</button>\n      <button type="button" @click="minus">-1</button>\n        </section>\n    </div>'
                };
            }(),
            Demo2: function () {
                return {
                    data() {
                        return {
                            msg: 0
                        };
                    },

                    template: "<div>\n        <div>{{msg}}</div>\n    </div>"
                };
            }()
        }
    };
</script>
<style>
    p {
        backgrund: #000
    }

    p {
        backgrund: #000
    }

    p {
        backgrund: #000
    }
</style>