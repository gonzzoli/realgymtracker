<template>
  <v-container style="background: #fafafa">
    <h3 v-if="firstOpened == true" class="mb-2">
      Next Workout:
      {{ selectedDay[0].toUpperCase() + selectedDay.slice(1) }}
    </h3>
    <h3 v-else class="mb-2">
      {{ selectedDay[0].toUpperCase() + selectedDay.slice(1) }}
    </h3>
    <HorizontalExercises
      v-for="exercise in showAllExercises
        ? selectedRoutine
        : selectedRoutine.slice(0, 3)"
      :key="exercise.name"
      :exercise="exercise"
    />
    <h3 v-if="selectedRoutine.length === 0">No routine set for this day!</h3>
    <v-btn
      v-if="selectedRoutine.length > 3 && showAllExercises === false"
      text
      class="my-5"
      @click.stop="showAllExercises = true"
      >Show All</v-btn
    >
    <v-btn
      v-else-if="selectedRoutine.length > 0 && showAllExercises === true"
      class="my-5"
      text
      @click.stop="showAllExercises = false"
      >Show Less</v-btn
    >
  </v-container>
</template>

<script>
import HorizontalExercises from '../HorizontalExercises.vue'

export default {
  components: {
    HorizontalExercises,
  },
  props: {
    selectedDay: {
      type: String,
      default: () => {
        return ''
      },
    },
    selectedRoutine: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      showAllExercises: false,
      firstOpened: true,
    }
  },
  updated() {
    this.firstOpened = false
  },
}
</script>
