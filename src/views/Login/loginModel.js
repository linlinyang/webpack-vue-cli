import {
    mapActions,
    mapState
} from 'vuex';
import {
    Loading
} from 'element-ui';
import {
    loadLanguageAsync
} from '@r/lang/';

/* 
 * 生成视图所需的数据，UI交互
 */

export default{
    data(){
        return {
            formRef: 'loginForm',
            lang: 'zh_CN'
        };
    },
    computed: {
        ...mapState('login',{
            loginForm: state => state.loginForm
        }),
        formEl(){
            return this.$refs[this.formRef];
        },
        cardStyle(){
            return {
                width: this.lang === 'zh_CN' ? '500px' : '600px'
            };
        },
        babelWidth(){
            return this.lang === 'zh_CN' ? '80px' : '120px';
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
        },
        changeLanguage(val){
            loadLanguageAsync(val);
        }
    },
    created(){
    },
}