import I18n from '@/i18n/i18n'

const httpCode = {
  400: I18n.t('errCode.400'),
  401: I18n.t('errCode.401'),
  403: I18n.t('errCode.403'),
  404: I18n.t('errCode.404'),
  500: I18n.t('errCode.500'),
  501: I18n.t('errCode.501'),
  502: I18n.t('errCode.502'),
  503: I18n.t('errCode.503'),
  504: I18n.t('errCode.504'),
  timeOut: I18n.t('errCode.timeOut')
}
export default httpCode
