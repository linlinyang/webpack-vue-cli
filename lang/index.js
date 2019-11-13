import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import messages from './zh_CN';

Vue.use(VueI18n);

const defaultLanguage = 'zh_CN';

export const i18n = new VueI18n({
    locale: defaultLanguage,
    fallbackLocale: defaultLanguage,
    messages: {
        [defaultLanguage]: messages
    }
});

const loadedLanguages = [defaultLanguage];

function setI18nLanguage(lang){
    i18n.locale = lang;
    axios.defaults.headers.common['Accept-Language'] = lang;
    return lang;
}

export function loadLanguageAsync(lang){
    if(i18n.lang !== lang){
        if(!loadedLanguages.includes(lang)){
            return import(/* webpackChunkName: "lang-[request]" */`./${lang}`).then(msgs => {
                i18n.setLocaleMessage(lang,msgs.default);
                loadedLanguages.push(lang);
                return setI18nLanguage(lang);
            });
        }
        return Promise.resolve(setI18nLanguage(lang));
    }

    return Promise.resolve(lang);
}
