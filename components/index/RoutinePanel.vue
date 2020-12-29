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
          ? selectedRoutine
          : selectedRoutine.slice(0, 3)"
        :key="exercise.name"
        :exercise="exercise"
        :modify-routine="modifyingRoutine"
      />
      <h3 v-if="selectedRoutine.length === 0">No routine set for this day!</h3>
      <v-row justify="space-around">
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
          @isIncomplete="incompleteExercises = true"
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
      copiedRoutine: this.selectedRoutine.slice(0),
      incompleteExercises: false,
    }
  },
  updated() {
    this.firstOpened = false
  },
  methods: {
    ...mapActions(['actSetNewRoutine']),
    startedModifying() {
      this.copiedRoutine = this.selectedRoutine.slice(0)
      this.$emit('startedModifying')
      this.showAllExercises = true
    },
    finishedModifying() {
      if (!this.incompleteExercises) {
        this.showAllExercises = false
        this.actSetNewRoutine({
          exercises: this.copiedRoutine,
          day: this.selectedDay,
        })
        this.$emit('finishedModifying', this.copiedRoutine)
      } else {
        console.log('You got incomplete exercises in ther boi')
      }
    },
    addEmptyExercise(id) {
      try {
        const index = this.copiedRoutine.findIndex(
          (exercise) => exercise.id === id
        )
        let lastId = Number(
          this.copiedRoutine
            .map((exercise) => exercise.id)
            .sort((a, b) => a - b)
            .reverse()[0]
        )
        lastId = isNaN(lastId) ? 1 : lastId
        const exercise = {
          name: '',
          sets: '',
          reps: '',
          weight: '',
          id: lastId + 1,
        }
        this.copiedRoutine.splice(index + 1, 0, exercise)
      } catch {}
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
    },
  },
}
</script>
