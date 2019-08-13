import {
    mapActions,
    mapState
} from 'vuex';

export default{
    data(){
        return {
            formRef: 'loginForm'
        };
    },
    computed: {
        ...mapState('login',{
            loginForm: state => state.loginForm
        }),
        formEl(){
            return this.$refs[this.formRef];
        }
    },
    methods: {
        ...mapActions('login',['postLogin'])
    }
}