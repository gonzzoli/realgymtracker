<template>
  <div>
    <v-container v-if="modifyingRoutine === false" style="background: #fafafa">
      <h3 v-if="firstOpened == true" class="mb-2">
        Next Workout:
        {{ selectedDay[0].toUpperCase() + selectedDay.slice(1) }}
      </h3>
      <h3 v-else class="mb-2">
        {{ selectedDay[0].toUpperCase() + selectedDay.slice(1) }}
      </h3>
      <HorizontalExercises
        v-for="exercise in showAllExercises
          ? copiedRoutine
          : copiedRoutine.slice(0, 3)"
        :key="exercise.name"
        :exercise="exercise"
        :modify-routine="modifyingRoutine"
      />
      <h3 v-if="copiedRoutine.length === 0">No routine set for this day!</h3>
      <v-row justify="space-around">
        <v-btn
          v-if="copiedRoutine.length > 3 && showAllExercises === false"
          text
          class="my-5"
          @click.stop="showAllExercises = true"
          >Show All</v-btn
        >
        <v-btn
          v-else-if="copiedRoutine.length > 0 && showAllExercises === true"
          class="my-5"
          text
          @click.stop="showAllExercises = false"
          >Show Less</v-btn
        >
        <v-btn text class="my-5" @click.stop="startedModifying">Modify</v-btn>
      </v-row>
    </v-container>
    <v-container v-else style="background: #fafafa">
      <h3 class="mb-2">
        {{ selectedDay[0].toUpperCase() + selectedDay.slice(1) }}
      </h3>
      <v-btn
        x-small
        fab
        class="my-3"
        color="light-green accent-2"
        @click="addEmptyExercise()"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <div v-for="exercise in copiedRoutine" :key="exercise.name">
        <HorizontalExercises
          :exercise="exercise"
          :selected-day="selectedDay"
          :modify-routine="modifyingRoutine"
          @addEmptyExercise="addEmptyExercise"
          @addNewExercise="addExercise"
          @deleteExercise="deleteExercise"
        />
      </div>
      <v-btn class="my-5" @click.stop="finishedModifying">Done</v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    modifyingRoutine: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      showAllExercises: false,
      firstOpened: true,
      copiedRoutine: [],
    }
  },
  updated() {
    this.firstOpened = false
    // this is the last thing
    // successfully modifying the state, but needing to re-rendes
    // the whole index component to get the updated routines
    this.copiedRoutine = this.selectedRoutine.slice(
      0,
      this.selectedRoutine.length
    )
  },
  methods: {
    ...mapActions(['actSetNewRoutine']),
    startedModifying() {
      // dont know why but i have to press the modify button
      // twice to get this working
      this.$emit('startedModifying')
      this.showAllExercises = true
    },
    finishedModifying() {
      this.showAllExercises = false
      this.actSetNewRoutine({
        exercises: this.copiedRoutine,
        day: this.selectedDay,
      })
      this.$emit('finishedModifying')
    },
    addEmptyExercise(id) {
      try {
        const index = this.copiedRoutine.findIndex(
          (exercise) => exercise.id === id
        )
        const lastId = Number(
          this.copiedRoutine
            .map((exercise) => exercise.id)
            .sort((a, b) => a - b)
            .reverse()[0]
        )
        const exercise = {
          name: '',
          sets: '',
          reps: '',
          weight: '',
          id: lastId + 1,
        }
        this.copiedRoutine.splice(index + 1, 0, exercise)
        console.log(this.copiedRoutine, this.selectedRoutine)
      } catch {
        const lastId = Number(
          this.copiedRoutine
            .map((exercise) => exercise.id)
            .sort((a, b) => a - b)
            .reverse()[0]
        )
        this.copiedRoutine.unshift({
          name: '',
          sets: '',
          reps: '',
          weight: '',
          id: lastId + 1,
        })
      }
    },
    addExercise(newExercise) {
      const index = this.copiedRoutine.findIndex(
        (exercise) => exercise.id === newExercise.id
      )
      this.copiedRoutine.splice(index, 1, newExercise)
    },
    deleteExercise(id) {
      const index = this.copiedRoutine.findIndex(
        (exercise) => exercise.id === id
      )
      this.copiedRoutine.splice(index, 1)
      console.log(this.copiedRoutine)
    },
  },
}
</script>
