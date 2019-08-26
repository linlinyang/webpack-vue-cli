import {
    mapState, mapActions
} from 'vuex';
import {
    Message
} from 'element-ui';

export default {
    computed: {
        ...mapState('home',{
            welcome: state => state.welcome,
            datas: state => state.datas
        })
    },
    methods: {
        ...mapActions('home',['initData'])
    },
    mounted(){
        this.initData().catch(message => {
            Message({
                message,
                type: 'error',
                showClose: false,
                duration: 2000
            });
        });
    }
}