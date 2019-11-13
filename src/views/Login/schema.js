/* 
 * 表单字段列表
*/

import {
    i18n
} from '@r/lang/';

export default {
    uname: {
        type: 'Input',
        name: i18n.t('labels.account'),
        placeholder: i18n.t('placeholders.account'),
        rules: [{
            required: true,
            message: i18n.t('message.account'),
            trigger: 'blur'
        }]
    },
    passwords: {
        type: 'Input',
        name: i18n.t('labels.password'),
        placeholder: i18n.t('placeholders.password'),
        rules: [{
            required: true,
            message: i18n.t('lables.password'),
            trigger: 'blur'
        }],
        opts: {
            type: 'password'
        }
    },
    captcha: {
        type: 'Input',
        name: i18n.t('labels.captcha'),
        placeholder: i18n.t('placeholders.captcha'),
        rules: [{
            required: true,
            message: i18n.t('messages.captcha'),
            trigger: 'blur'
        },{
            validator(rule,value,callback){
                if(value.length !== 4){
                    callback(new Error(i18n.t('messages.captcha1')));
                }else{
                    callback();
                }
            }
        }]
    }
};