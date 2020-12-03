<template>
  <v-app>
    <Nav />
    <nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Footer from '../components/Footer.vue'
import Nav from '../components/Nav.vue'

export default {
  components: {
    Footer,
    Nav,
  },
  created() {
    this.$vuetify.theme.dark = false
  },
}
</script>
