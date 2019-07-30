<template>
  <div ref='wrapper' style='width: 100%; height: 100%;' />
</template>

<script>
export default {
  name: 'RouterWrapper',
  data() {
    return {
      isLoading: false,
      currentNamespace: '',
      currentPkgInfo: null,
    }
  },
  inject: ['bus'],
  computed: {
    userInfo() {
      return this.$store.getters['globe/user/userInfo']
    },
    namespace() {
      return this.$route.path.split('/')[1]
    },
    permissions() {
      return this.$store.getters['globe/user/permissions']
    },
  },
  watch: {
    namespace(p) {
      this.unload(this.currentPkgInfo)
      this.$nextTick(() => {
        this.loadModule(p)
      })
      // this.$router.go(0) // 页面强刷
    },
  },
  mounted() {
    this.loadModule(this.namespace)
  },
  beforeDestroy() {
    this.bus.rmAll(`${this.currentNamespace}-mount`)
    this.currentNamespace = ''
  },
  methods: {
    async loadModule(namespace) {

      const pkg = this.check(namespace)
      const content = document.createElement('div')
      this.$refs.wrapper.hasChildNodes() && this.$refs.wrapper.removeChild(this.$refs.wrapper.firstChild)
      this.$refs.wrapper.appendChild(content)
      if (pkg) {
        window[`load_${pkg.namespace}`] = null
        this.currentPkgInfo = pkg
        this.currentNamespace = pkg.namespace
        // ! FOR TEST
        this.bus.on(`${pkg.namespace}-mount`, (...data) => { console.log(pkg.namespace, '加载啦！', data) })

        this.isLoading = true
        await this.load(pkg)
        this.isLoading = false
        window[`load_${pkg.namespace}`](content, this.userInfo, this.bus, this.$router)
      }
    },
    check(namespace) {
      const firstMatch = `/${namespace}`
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
    async load(pkg) {
      const { manifest, namespace } = pkg
      const sources = Object.values(manifest)

      const styles = sources.filter(s => s.endsWith(`${namespace}.css`))
      styles.forEach(href => {
        const link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('type', 'text/css')
        link.setAttribute('data-namespace', namespace)
        link.setAttribute('href', href)
        document.head.appendChild(link)
      })

      const scripts = sources.filter(s => s.endsWith(`${namespace}.js`))
      const load = (src) => {
        return new Promise((resolve, reject) => {
          const tag = document.createElement('script')
          tag.setAttribute('data-namespace', namespace)
          tag.setAttribute('src', src)
          tag.onload = resolve
          tag.onerror = reject
          document.head.appendChild(tag)
        })
      }

      const rst = await Promise.all(scripts.map(load))
      return rst
    },
    unload(pkg) {
      const { namespace } = pkg
      delete window[`load_${namespace}`]
      const links = [...document.head.querySelectorAll('link')]
      links.filter(t => t.href.includes(namespace)).forEach(l => l.remove())
      const scripts = [...document.head.querySelectorAll('script')]
      scripts.filter(s => s.src.includes(namespace)).forEach(l => l.remove())
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

