<template>
  <div id='router' />
</template>

<script>
import Vue from 'vue'
export default {
  name: 'RouterWrapper',
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    path() {
      return this.$route.path
    },
    permissions() {
      return this.$store.getters['globe/user/permissions']
    },
  },
  watch: {
    path(p) {
      this.loadModule(p)
    },
  },
  mounted() {
    this.loadModule(this.path)
  },
  methods: {
    async loadModule(path) {
      const pkg = this.check(path)
      this.isLoading = true
      await this.load(pkg)
      this.isLoading = false
      window.loadShineStandard.call(Vue, '#router')
    },
    check(path) {
      const firstMatch = `/${path.split('/')[1]}`
      if (firstMatch in this.permissions) {
        const pkg = this.permissions[firstMatch]
        if (pkg) {
          return pkg
        } else {
          this.$router.replace('/error/403')
        }
      } else {
        this.$router.replace('/error/404')
      }
    },
    load(pkg) {
      console.log(pkg)
      return new Promise((resolve, reject) => { // eslint-disable-line
        const styles = pkg.filter(p => p.type === 'style')
        styles.forEach(({ url }) => {
          const link = document.createElement('link')
          link.setAttribute('rel', 'stylesheet')
          link.setAttribute('type', 'text/css')
          link.setAttribute('href', url)
          document.head.appendChild(link)
        })

        const scripts = pkg.filter(p => p.type === 'script')
        const load = (index = 0) => {
          const { url } = scripts[index]
          const tag = document.createElement('script')
          tag.setAttribute('type', 'text/javascript')
          tag.setAttribute('src', url)
          tag.onload = () => {
            index < scripts.length - 1 ? load(index + 1) : resolve()
          }
          document.head.appendChild(tag)
        }
        load()
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

