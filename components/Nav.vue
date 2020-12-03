<template>
  <div>
    <v-app-bar>
      <v-toolbar-title class="display-1">Gymtracker</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-list-item v-for="item in navItems" :key="item.name">
          <v-btn text :to="item.link" class="py-5 mx-n3">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            {{ item.name }}
          </v-btn>
        </v-list-item>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        { name: 'Workout', link: '/', icon: 'mdi-dumbbell' },
        { name: 'Board', link: '/board', icon: 'mdi-chart-line' },
        { name: 'Profile', link: '/profile', icon: 'mdi-account' },
      ],
    }
  },
}
</script>
