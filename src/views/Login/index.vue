<template>
    <div :class="styles.login">
        <div :class="styles['login-wrapper']">
            <Form 
                :ref="formRef"
                :model="loginForm"
                label-width='80px'
            >
                <FormItem
                    v-for="(field,index) in Object.keys(schema)"
                    :key="index"
                    :label="schema[field].name"
                    :prop="field"
                    :rules='schema[field].rules'
                >
                    <component 
                        :is="schema[field].type"
                        v-model="loginForm[field]"
                        :name='field'
                        :placeholder="schema[field].placegolder"
                        :disabled="schema[field].disabled"
                        :options='schema[field].options'
                        v-bind="{...schema[field].opts}"
                        @keyup.enter.native="keybroadLogin"
                        v-if="field !== 'captcha'"
                    ></component>
                    <Row else>
                        <Col :span="16">
                            <component
                                :is='schema[field].type'
                                :name='field'
                                :value='schema[field].value'
                                :placeholder='schema[field].placeholder'
                                :disabled='schema[field].disabled'
                                :options='schema[field].options'
                                v-model="loginForm[field]"
                                v-bind="{...schema[field].opts}"
                                @keyup.enter.native="keybroadLogin"
                            ></component>
                        </Col>
                        <Col 
                            :span='7'
                            :offset='1'
                        >
                            <div :class="styles['img-wrap']">
                                <CaptchaImg />
                            </div>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import styles from './index.scss';
import schema from './schema';
import model from './loginModel';
import {
    Form,
    FormItem,
    Input,
    Button,
    Row,
    Col
} from 'element-ui';
import CaptchaImg from '@/componets/CaptchaImg/index';

export default {
    name: 'Login',
    components: {
        Form,
        FormItem,
        Input,
        Button,
        Row,
        Col,
        CaptchaImg
    },
    data(){
        return {
            styles,
            schema
        };
    },
    mixins: [model]
}
</script>
