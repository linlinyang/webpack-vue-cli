<template>
    <div class="home">
        <p>{{ welcome }}</p>
    </div>
</template>

<script>
import model from './model';

export default {
    name: 'Home',
    mixins: [model]
};
</script>
