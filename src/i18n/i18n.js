import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import locale from 'element-ui/lib/locale';
import ja from './langs/ja.js'
import en from './langs/en.js'
// import enLocale from 'element-ui/lib/locale/lang/en'
// import jaLocale from 'element-ui/lib/locale/lang/ja'

Vue.use(VueI18n)

const messages = {
	en: Object.assign(en),
	ja: Object.assign(ja),
}

// console.log(messages.ja)

const i18n = new VueI18n({
	locale: 'en',
	messages,
})
// locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n
