<template>
  <div>
    <v-app-bar>
      <v-toolbar-title class="display-1">Gymtracker</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="$vuetify.breakpoint.name != 'xs'">
        <v-list-item v-for="item in navItems" :key="item.name">
          <v-btn text :to="item.link" class="py-5 mx-n3">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            {{ item.name }}
          </v-btn>
        </v-list-item>
      </v-toolbar-items>
      <span v-else>
        <v-btn @click.stop="drawer = !drawer">
          <v-icon v-if="drawer">mdi-wrap mdi-rotate-180</v-icon>
          <v-icon v-else>mdi-wrap-disabled mdi-rotate-180</v-icon>
        </v-btn>
      </span>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list>
        <v-list-item
          v-for="item in navItems"
          :key="item.name"
          :to="item.link"
          class="py-1"
        >
          <v-icon class="mr-3">{{ item.icon }}</v-icon>
          <v-list-item-title style="font-size: 16px">{{
            item.name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
      drawer: false,
    }
  },
}
</script>
