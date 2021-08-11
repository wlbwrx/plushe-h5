module.exports = {
  // `https://cdn.plushe.com/plugn/js/element-ui@2.15.1.js`
  css: [],
  js: [
    {
      name: `vue`,
      scope: `Vue`,
      js: `${process.env.VUE_APP_CND}/plugn/js/vue@2.6.12.js`
    },
    {
      name: `vue-router`,
      scope: `VueRouter`,
      js: `${process.env.VUE_APP_CND}/plugn/js/vue-route@3.5.1.js`
    },
    {
      name: `vuex`,
      scope: `Vuex`,
      js: `${process.env.VUE_APP_CND}/plugn/js/vuex@3.6.2.js`
    },
    {
      name: `vant`,
      scope: `vant`,
      js: `${process.env.VUE_APP_CND}/plugn/js/vant@2.12.9.js`
    },
    {
      name: `axios`,
      scope: `axios`,
      js: `${process.env.VUE_APP_CND}/plugn/js/axios@0.21.1.js`
    },
    {
      name: `better-scroll`,
      scope: `BetterScroll`,
      js: `${process.env.VUE_APP_CND}/plugn/js/better-scroll@2.2.1.js`
    },
    // { // APP.vue中加载,不全部加载
    //   name: `countrys`,
    //   scope: `countrys`,
    //   js: `${process.env.VUE_APP_CND}/plugn/js/countrys.js`,
    //   async: true
    // },
    // {
    //   name: `jp-country`,
    //   scope: `jp-country`,
    //   js: `${process.env.VUE_APP_CND}/plugn/js/jpCountry.js`,
    //   async: true
    // }
  ]
}
