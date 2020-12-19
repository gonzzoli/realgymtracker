<template>
  <div>
    <v-card :class="{ 'red accent-1': isIncomplete }">
      <v-row v-if="modifyRoutine === false">
        <v-col cols="4">
          <v-card-title class="text-left">{{
            capitalizeName(exercise.name)
          }}</v-card-title>
        </v-col>
        <v-col cols="4" class="text-center">
          <v-card-text
            v-if="exercise.hasOwnProperty('reps')"
            style="font-size: 15px"
            ><strong
              >{{ exercise.sets }} x {{ exercise.reps }} reps</strong
            ></v-card-text
          >
          <v-card-text v-else style="font-size: 15px"
            ><strong>{{ exercise.duration }} min</strong></v-card-text
          >
        </v-col>
        <v-col cols="4">
          <v-card-text
            v-if="exercise.hasOwnProperty('weight') && exercise.weight != 0"
            class="text-center"
            style="font-size: 15px"
            ><strong>{{ exercise.weight }}kg</strong></v-card-text
          >
          <v-card-text v-else class="text-center" style="font-size: 15px"
            >No weight</v-card-text
          >
        </v-col>
      </v-row>
      <v-form v-else>
        <v-row justify="center" align="center">
          <v-col cols="4">
            <v-text-field
              v-model="newName"
              placeholder="Name"
              class="ml-2"
              autocomplete="off"
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="text-center">
            <v-row
              v-if="exercise.hasOwnProperty('reps')"
              justify="center"
              align="center"
              style="font-size: 15px"
              class="mb-n5"
            >
              <v-col cols="4">
                <v-text-field
                  v-model="newSets"
                  type="number"
                  placeholder="Sets"
                  min="0"
                  max="999"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
              <v-col cols="1">x</v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="newReps"
                  type="number"
                  placeholder="Reps"
                  min="0"
                  max="999"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-col v-else cols="12">
              <v-row justify="center" align="center" class="mb-n5">
                <v-col cols="4">
                  <v-text-field
                    v-model="newDuration"
                    placeholder="Time"
                    type="number"
                    min="0"
                    max="999"
                    autocomplete="off"
                  ></v-text-field> </v-col
              ></v-row>
            </v-col>
            <v-btn
              x-small
              fab
              class="my-n3"
              color="red accent-2"
              @click.stop="deleteExercise"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-row justify="center">
              <v-col cols="6">
                <v-text-field
                  v-if="exercise.hasOwnProperty('weight')"
                  v-model="newWeight"
                  placeholder="Weight"
                  :class="{ 'mb-n4': showCheckMark }"
                  type="number"
                  min="0"
                  max="999"
                  step=".01"
                  autocomplete="off"
                ></v-text-field>
                <v-btn
                  v-if="showCheckMark"
                  icon
                  class="mb-n4"
                  color="success"
                  @click="addNewExercise"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-row v-if="modifyRoutine === true" justify="center" class="">
      <v-btn
        color="light-green accent-2"
        class="my-3"
        fab
        x-small
        @click.stop="addEmptyExercise"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    exercise: {
      type: Object,
      default: () => {
        return {
          name: 'Exercise',
          sets: 0,
          reps: 0,
          weight: 0,
          id: 0,
        }
      },
    },
    selectedDay: {
      type: String,
      default: () => {
        return ''
      },
    },
    modifyRoutine: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {
      newName: this.exercise.name,
      newSets: this.exercise.sets,
      newReps: this.exercise.reps,
      newWeight: this.exercise.weight,
      newDuration: this.exercise.duration,
      id: this.exercise.id,
      nameChanged: false,
      setsChanged: false,
      repsChanged: false,
      weightChanged: false,
      durationChanged: false,
    }
  },
  computed: {
    newExercise() {
      if (this.exercise.duration === undefined) {
        return {
          name: this.newName,
          sets: Number(this.newSets),
          reps: Number(this.newReps),
          weight: Number(this.newWeight),
          id: Number(this.id),
        }
      }
      return {
        name: this.newName,
        duration: Number(this.newDuration),
        id: Number(this.id),
      }
    },
    isIncomplete() {
      if (
        this.newName !== '' &&
        this.newSets !== '' &&
        this.newReps !== '' &&
        this.newWeight !== ''
      ) {
        return false
      } else if (this.newName !== '' && this.newDuration !== undefined) {
        return false
      }
      return true
    },
    showCheckMark() {
      if (this.isIncomplete === false) {
        if (
          this.nameChanged === true ||
          this.setsChanged === true ||
          this.repsChanged === true ||
          this.weightChanged === true ||
          this.durationChanged === true
        ) {
          return true
        }
      }
      return false
    },
  },
  watch: {
    newName(value) {
      const original = this.exercise.name
      if (original !== value) {
        this.nameChanged = true
      } else {
        this.nameChanged = false
      }
    },
    newSets(value) {
      const original = String(this.exercise.sets)
      if (original !== value) {
        this.setsChanged = true
      } else {
        this.setsChanged = false
      }
    },
    newReps(value) {
      const original = String(this.exercise.reps)
      if (original !== value) {
        this.repsChanged = true
      } else {
        this.repsChanged = false
      }
    },
    newWeight(value) {
      const original = String(this.exercise.weight)
      if (original !== value) {
        this.weightChanged = true
      } else {
        this.weightChanged = false
      }
    },
    newDuration(value) {
      const original = String(this.exercise.duration)
      if (original !== value) {
        this.durationChanged = true
      } else {
        this.durationChanged = false
      }
    },
  },
  methods: {
    ...mapActions(['actDeleteExercise']),
    capitalizeName(name) {
      const capitalized = []
      const arr = name.split(' ')
      arr.forEach((word) => {
        const capitalizedWord =
          word[0].toUpperCase() + word.slice(1, word.length)
        capitalized.push(capitalizedWord)
      })
      return capitalized.join(' ')
    },
    addEmptyExercise() {
      this.$emit('addEmptyExercise', this.exercise.id)
    },
    addNewExercise() {
      this.$emit('addNewExercise', this.newExercise)
    },
    deleteExercise() {
      this.$emit('deleteExercise', this.exercise.id)
    },
  },
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
