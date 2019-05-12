# vue-md-loader

把 markdown 文档转成一个vue component

### Example

#### 配置

    module: {
		rules: [{
			test: /\.md$/,
			loader: [
				'vue-loader',
				{
					loader: 'vue-md-loader'
				}
			]
		}]
	}

#### markdown

```markdown

    ### markdown demo


    <div class="browser-mockup with-url"><Demo /></div>

    <script>
        export default {
            components: {
                Demo : {
                    template: '<div>{{msg}}</div>',
                    data: function () {return {msg: '123'}}
                }
            }
        }

    </script>
    <style>
        p {
            backgrund: #000
        }
    </style>

```

每个.md文件只能包含一个style和script标签

也可以在文件中定义vue组件
```markdown

    ```component@Demo1
        <template>
            <section>
                <h1>Test title</h1>
                <p>count: {{count}}</p>
                <button type="button" @click="add">+1</button>
                <button type="button" @click="minus">-1</button>
            </section>
        </template>
        <script>
            let b = 'testing...'
            export default {
                data () {
                return {
                    count: 0
                }
                },
                methods: {
                add () {
                    this.count++ 
                },
                minus () {
                    this.count--
                }
                }
            }
        </script>
        <style>
            p {
                backgrund: #000
            }
        </style>
    ```
```

可以直接使用

```html
<div class="browser-mockup with-url"><Demo1 /></div>
```

也可以手动加载

```markdown
     <script>
        export default {
            components: {
                Demo1
            }
        }

    </script>
```


### Options

| 参数 | 类型 | 说明 |
| - | - | - |
| pattern | RegExp | 匹配组件的正则表达式/component@([\s\S]*)/ |
| plugins | Function | markdown-it插件 |