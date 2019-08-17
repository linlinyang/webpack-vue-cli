import {
    mapState
} from 'vuex';

export default {
    computed: {
        ...mapState('home',{
            welcome: state => state.welcome
        })
    },
}