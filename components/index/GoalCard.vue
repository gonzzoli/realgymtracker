<template>
  <div>
    <v-menu v-if="editMode === false" offset-y>
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
        <v-list-item @click="editMode = true">
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-card v-else>
      <v-card-actions>
        <v-form @submit.prevent="editGoal(goal.id)">
          <v-row justify="center" align="center" class="my-n4" dense>
            <v-col cols="9">
              <v-text-field v-model="goalCopy" autofocus></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-icon color="success" @click="editGoal(goal.id)"
                >mdi-check</v-icon
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-actions>
    </v-card>
  </div>
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
  data() {
    return {
      editMode: false,
      // Used to not modify state directly
      goalCopy: this.goal.goal,
    }
  },
  methods: {
    ...mapActions(['actChangeGoalState', 'actDeleteGoal', 'actEditGoal']),
    editGoal(id) {
      const newGoal = { id, goal: this.goalCopy, done: false }
      this.actEditGoal(newGoal)
      this.editMode = false
    },
  },
}
</script>
