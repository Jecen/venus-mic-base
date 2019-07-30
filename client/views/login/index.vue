<template>
  <div @click='login'>login page</div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
      const data = {
        '/tpl-module': {
          namespace: 'tpl-module',
          host: 'http://localhost:6006',
          manifest: {
            'client.css': 'http://localhost:6006/static/style/0.564e4634.tpl-module.css',
            'client.js': 'http://localhost:6006/static/client.a6c61a3.tpl-module.js',
            'runtime.js': 'http://localhost:6006/static/runtime.26d99a1.tpl-module.js',
            'vendors~client.css': 'http://localhost:6006/static/style/5.4b2b79e8.tpl-module.css',
            'vendors~client.js': 'http://localhost:6006/static/vendors~client.2246e03.tpl-module.js',
          },
        },
        '/two': {
          namespace: 'two',
          host: 'http://localhost:6007',
          manifest: {
            'client.css': 'http://localhost:6007/static/style/0.564e4634.two.css',
            'client.js': 'http://localhost:6007/static/client.a087918.two.js',
            'runtime.js': 'http://localhost:6007/static/runtime.e8425fc.two.js',
            'vendors~client.css': 'http://localhost:6007/static/style/5.056c2450.two.css',
            'vendors~client.js': 'http://localhost:6007/static/vendors~client.98dc5bf.two.js',
          },
        },
        '/three': null,
      }

      this.$store.commit('globe/user/updatePermission', data)
      this.$router.push(`${Object.keys(data)[0]}/tpl/home`)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

