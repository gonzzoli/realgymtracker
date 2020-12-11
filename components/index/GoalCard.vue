<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-card
        hover
        :color="goal.done ? 'success' : null"
        v-bind="attrs"
        v-on="on"
      >
        <v-card-text
          ><strong>{{ goal.goal }}</strong></v-card-text
        >
      </v-card>
    </template>
    <v-list>
      <v-list-item v-if="!goal.done" @click="actChangeGoalState(goal.id)">
        <v-list-item-title>Done</v-list-item-title>
      </v-list-item>
      <v-list-item v-else @click="actChangeGoalState(goal.id)">
        <v-list-item-title>Undo</v-list-item-title>
      </v-list-item>
      <v-list-item @click="actDeleteGoal(goal.id)">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
      <v-list-item @click="actEditGoal(goal.id)">
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    goal: {
      type: Object,
      default: () => {
        return 'no goal'
      },
    },
  },
  methods: {
    ...mapActions(['actChangeGoalState', 'actDeleteGoal', 'actEditGoal']),
  },
}
</script>
