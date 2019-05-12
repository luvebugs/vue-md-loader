# Test MD case

this is the demo named demo1

```javascript
    const name = 'jack';
```

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
<div class="browser-mockup with-url"><Demo1 /></div>


this is the demo named demo2

```component@Demo2
    <template>
        <div>{{msg}}</div>
    </template>
    <script>
        export default {
            data () {
            return {
                msg: 0
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
<div class="browser-mockup with-url"><Demo2 /></div>







this is the global demo named Demo

<div class="browser-mockup with-url"><Demo /></div>

this is the global demo named Demo3
<div class="browser-mockup with-url"><Demo3 /></div>
<button @click="handleClick">123123</button>
<script>
    export default {
        components: {
            Demo : {
                template: '<div>{{msg}}</div>',
                data: function () {return {msg: '123'}}
            },
            Demo3: Demo1
        },
        methods: {
            handleClick() {
                alert('hello world');
            }
        }
    }

</script>
<style>
    p {
        backgrund: #000
    }
</style>