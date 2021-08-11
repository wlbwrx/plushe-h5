import I18n from '@/i18n/i18n'
import { Toast } from 'vant'
import Clipboard from 'clipboard'

export default {
  directives: {
    copy: {
      inserted(el) {
        const obj = new Clipboard(el)
        obj.on('success', () => {
          Toast(I18n.t('copied'))
        })
        obj.on('error', () => {
          Toast(I18n.t('copyFail'))
        })
      }
    }
  }
}
