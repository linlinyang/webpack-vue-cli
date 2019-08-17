import {
    mapActions,
    mapState
} from 'vuex';
import {
    Loading
} from 'element-ui';

/* 
 * 生成视图所需的数据，UI交互
 */

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
        ...mapActions('login',['postLogin']),
        submitForm(){
            const formEl = this.formEl;

            formEl.validate(valid => {
                if(!valid){//验证未通过
                    return ;
                }
                const loading = Loading.service({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.postLogin().then(res => {//调用登录接口
                    alert('登录成功');
                    loading.close();
                }).catch(err => {
                    alert('登录失败');
                    loading.close();
                    this.$router.push('home');
                });
                
            });
        }
    }
}