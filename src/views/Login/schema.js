/* 
 * 表单字段列表
*/

export default {
    uname: {
        type: 'Input',
        name: '账号',
        placeholder: '请输入账号',
        rules: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
        }]
    },
    passwords: {
        type: 'Input',
        name: '密码',
        placeholder: '请输入密码',
        rules: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }],
        opts: {
            type: 'password'
        }
    },
    captcha: {
        type: 'Input',
        name: '验证码',
        placeholder: '请输入验证码',
        rules: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
        },{
            validator(rule,value,callback){
                if(value.length !== 4){
                    callback(new Error('请输入四位数验证码'));
                }else{
                    callback();
                }
            }
        }]
    }
};