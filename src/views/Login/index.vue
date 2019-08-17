<template>
    <div :class="styles.login">
        <div :class="styles['login-wrapper']">
            <div :class='styles.avatar'>
                <img :src="avatar">
            </div>
            <Card>
                <template #header>XXX管理平台</template>
                <Form
                    :ref="formRef"
                    label-width="80px"
                    :model='loginForm'
                >
                    <FormItem
                        v-for="(field,index) in Object.keys(schema)"
                        :key="index"
                        :label="schema[field].name"
                        :prop="field"
                        :rules="schema[field].rules"
                    >
                        <component
                            :is="schema[field].type"
                            :name="field"
                            :placeholder="schema[field].placeholder"
                            :disabled="schema[field].disabled"
                            v-model="loginForm[field]"
                            :options='schema[field].options'
                            v-bind="{...schema[field].opts}"
                            v-if="field !== 'captcha'"
                            @keyup.enter.native="submitForm"
                        ></component>
                        <Row 
                            v-else 
                        >
                            <Col :span="16">
                                <component
                                    :is='schema[field].type'
                                    :name='field'
                                    :placeholder='schema[field].placeholder'
                                    :disabled='schema[field].disabled'
                                    :options='schema[field].options'
                                    v-model="loginForm[field]"
                                    v-bind="{...schema[field].opts}"
                                    @keyup.enter.native="submitForm"
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
                    <div :class="styles['submit-wrap']">
                        <Button 
                            type="primary"
                            @click="submitForm"
                        >登录</Button>
                    </div>
                </Form>
            </Card>
        </div>
    </div>
</template>
<script>
import styles from './index.module.scss';
import schema from './schema';
import model from './loginModel';
import {
    Form,
    FormItem,
    Input,
    Button,
    Row,
    Col,
    Card
} from 'element-ui';
import CaptchaImg from '@/components/CaptchaImg/index';
import avatar from '@r/assets/images/avatar.jpg';

export default {
    name: 'Login',
    components: {
        Card,
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
            schema,
            avatar
        };
    },
    mixins: [model]
}
</script>
