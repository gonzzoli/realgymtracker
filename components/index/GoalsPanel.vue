<template>
  <div>
    <div v-if="$vuetify.breakpoint.mdAndUp === true">
      <h1>Goals</h1>
      <AddGoal />
      <v-row>
        <v-col
          v-for="goal in showAllGoals ? goals : goals.slice(0, 6)"
          :key="goal.id"
          cols="6"
        >
          <GoalCard :goal="goal" />
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-btn
          v-if="goals.length > 6 && showAllGoals === false"
          text
          class="my-5"
          @click.stop="showAllGoals = true"
          >Show All</v-btn
        >
        <v-btn
          v-else-if="goals.length > 6 && showAllGoals === true"
          text
          class="my-5"
          @click.stop="showAllGoals = false"
          >Show Less</v-btn
        >
      </v-row>
    </div>
    <v-row v-else justify="center">
      <v-col cols="11">
        <h1>Goals</h1>
        <AddGoal />
        <v-row justify="start">
          <v-col
            v-for="goal in showAllGoals ? goals : goals.slice(0, 6)"
            :key="goal.id"
            cols="6"
            sm="4"
          >
            <GoalCard :goal="goal" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn
            v-if="goals.length > 6 && showAllGoals === false"
            text
            class="my-5"
            @click.stop="showAllGoals = true"
            >Show All</v-btn
          >
          <v-btn
            v-else-if="goals.length > 6 && showAllGoals === true"
            text
            class="my-5"
            @click.stop="showAllGoals = false"
            >Show Less</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GoalCard from './GoalCard.vue'
import AddGoal from './AddGoal.vue'

export default {
  components: {
    GoalCard,
    AddGoal,
  },
  props: {
    goals: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      showAllGoals: false,
    }
  },
  computed: {
    ...mapGetters(['goals']),
  },
}
</script>
