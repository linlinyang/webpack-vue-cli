<template>
    <img 
        :src="src"
        :alt="alt"
        @click='updateCaptcha'
    >
</template>
<script>
import axios from 'axios';

var defaultSrc = '/api/captcha';

export default {
    name: 'CaptchaImg',
    props: {
        alt: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            src: defaultSrc
        };
    },
    methods: {
        updateCaptcha(){
            this.src = `${defaultSrc}?${Math.random()}`;
        }
    }
}
</script>

