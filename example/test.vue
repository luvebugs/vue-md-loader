<template>
    <div>
        <div>{{ text }}</div>
        <Md />
    </div>
</template>

<script>

import Md from './test.md';
import text from './test.txt';
import 'highlight.js/styles/github-gist.css';

export default {
  components: { Md },
  data () {
    return {
      text
    }
  }
}
</script>

<style>
    .browser-mockup {
        border-top: 2em solid rgba(230, 230, 230, 0.7);
        box-shadow: 0 0.1em 1em 0 rgba(0, 0, 0, 0.4);
        position: relative;
        border-radius: 3px 3px 0 0;
        padding: 32;
        marggin: 16;
    }

    .browser-mockup:before {
        display: block;
        position: absolute;
        content: '';
        top: -1.25em;
        left: 1em;
        width: 0.5em;
        height: 0.5em;
        border-radius: 50%;
        background-color: #f44;
        box-shadow: 0 0 0 2px #f44, 1.5em 0 0 2px #9b3, 3em 0 0 2px #fb5;
    }
        
    .browser-mockup.with-tab:after {
        display: block;
        position: absolute;
        content: '';
        top: -2em;
        left: 5.5em;
        width: 20%;
        height: 0em;
        border-bottom: 2em solid white;
        border-left: 0.8em solid transparent;
        border-right: 0.8em solid transparent;
    }

    .browser-mockup.with-url:after {
        display: block;
        position: absolute;
        content: '';
        top: -1.6em;
        left: 5.5em;
        width: calc(100% - 6em);
        height: 1.2em;
        border-radius: 2px;
        background-color: white;
    }

    .browser-mockup > * {
        display: block;
    }
</style>