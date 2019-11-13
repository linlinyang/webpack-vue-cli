/* 
 * 表单字段列表
*/
import Vue from 'vue';

export default function(){
    const convert = this instanceof Vue
                    ? this.$t.bind(this)
                    : v => v;
    return {
        uname: {
            type: 'Input',
            name: convert('labels.account'),
            placeholder: convert('placeholders.account'),
            rules: [{
                required: true,
                message: convert('messages.account'),
                trigger: 'blur'
            }]
        },
        passwords: {
            type: 'Input',
            name: convert('labels.password'),
            placeholder: convert('placeholders.password'),
            rules: [{
                required: true,
                message: convert('messages.password'),
                trigger: 'blur'
            }],
            opts: {
                type: 'password'
            }
        },
        captcha: {
            type: 'Input',
            name: convert('labels.captcha'),
            placeholder: convert('placeholders.captcha'),
            rules: [{
                required: true,
                message: convert('messages.captcha'),
                trigger: 'blur'
            },{
                validator(rule,value,callback){
                    if(value.length !== 4){
                        callback(new Error(convert('messages.captcha1')));
                    }else{
                        callback();
                    }
                }
            }]
        }
    };
}