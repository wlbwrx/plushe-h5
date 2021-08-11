export default {
  methods: {
    setDocumentTitle(title) {
      this.$nextTick(() => {
        document.querySelector('.van-nav-bar__title').innerHTML = title
      })
    }
  }
}
