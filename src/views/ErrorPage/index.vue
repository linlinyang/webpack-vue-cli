<template>
    <div :class="styles['wrapper']">
        <div :class="styles['error-page']"></div>
    </div>
</template>

<script>
import styles from './index.module.scss';

export default {
    name: 'ErrorPage',
    data(){
        return {
            styles
        }
    }
}
</script>