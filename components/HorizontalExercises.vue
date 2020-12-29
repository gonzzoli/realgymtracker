<template>
  <div>
    <v-card :key="updater">
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
            ><strong
              >{{ exercise.sets }} x {{ exercise.duration }} min</strong
            ></v-card-text
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
      <v-form v-else :class="{ 'red accent-1': isIncomplete }">
        <v-row justify="center" align="center">
          <v-col cols="4">
            <v-text-field
              v-model="newName"
              label="Name"
              class="ml-2"
              autocomplete="off"
            ></v-text-field>
          </v-col>
          <v-col cols="5" class="text-center">
            <v-row justify="center" align="center" style="font-size: 15px">
              <v-col cols="4">
                <v-text-field
                  v-model="newSets"
                  type="number"
                  label="Sets"
                  min="0"
                  max="999"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
              <v-col cols="1">x</v-col>
              <v-col v-if="newExercise.hasOwnProperty('reps')" cols="4">
                <v-text-field
                  v-model="newReps"
                  type="number"
                  label="Reps"
                  min="0"
                  max="999"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
              <v-col v-else cols="4">
                <v-text-field
                  v-model="newDuration"
                  type="number"
                  label="Time"
                  min="0"
                  max="999"
                  autocomplete="off"
                ></v-text-field>
              </v-col>
              <v-col :key="updater" cols="1">
                <v-btn
                  v-if="newExercise.hasOwnProperty('reps')"
                  fab
                  x-small
                  text
                  class="ml-n4"
                  @click="putTime"
                >
                  <v-icon>mdi-timer-outline</v-icon>
                </v-btn>
                <v-btn v-else fab x-small text class="ml-n4" @click="putReps">
                  <v-icon>mdi-counter</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-row justify="center">
              <v-col cols="6">
                <v-text-field
                  v-model="newWeight"
                  label="Weight"
                  :class="{ 'mb-n4': showCheckMark }"
                  type="number"
                  min="0"
                  max="999"
                  step=".01"
                  autocomplete="off"
                ></v-text-field>
                <v-btn
                  v-if="showCheckMark"
                  :key="updater"
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
          <v-row justify="center" align="center">
            <v-btn
              x-small
              fab
              color="red accent-2"
              class="mt-n8 mb-2"
              @click.stop="deleteExercise"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-row>
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
      updater: 1,
    }
  },
  computed: {
    newExercise() {
      if (this.newDuration === undefined) {
        return {
          name: this.newName.toLowerCase(),
          sets: Number(this.newSets),
          reps: Number(this.newReps),
          weight: Number(this.newWeight),
          id: Number(this.id),
        }
      }
      return {
        name: this.newName.toLowerCase(),
        sets: Number(this.newSets),
        duration: Number(this.newDuration),
        weight: Number(this.newWeight),
        id: Number(this.id),
      }
    },
    isIncomplete() {
      if (Object.prototype.hasOwnProperty.call(this.newExercise, 'reps')) {
        if (
          this.newName.length > 0 &&
          Number(this.newSets) > 0 &&
          Number(this.newReps) > 0 &&
          Number(this.newWeight) >= 0
        ) {
          return false
        }
      } else if (this.newName.length > 0 && Number(this.newDuration) > 0) {
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
    // keep on working here
    // you should set to true the incompleteExercises
    // in parent, find a way to send that info
    modifyRoutine(value) {
      console.log('locoooo ' + value)
    },
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
      let original = this.exercise.reps
      original = original === undefined ? '' : String(original)
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
      let original = this.exercise.duration
      original = original === undefined ? '' : String(original)
      if (original !== value) {
        this.durationChanged = true
      } else {
        this.durationChanged = false
      }
      // console.log(
      //   this.repsChanged,
      //   this.durationChanged,
      //   this.newDuration,
      //   this.isIncomplete
      // )
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
      this.updater += 1
      this.$emit('addNewExercise', this.newExercise)
    },
    deleteExercise() {
      this.$emit('deleteExercise', this.exercise.id)
    },
    // in this two functions i should delete one property
    // and add the other, but im not quite sure about
    // to which exercise do those changes, if the prop
    // or making a copy of the prop or something else
    putReps() {
      this.newDuration = undefined
      this.newReps = 0
      this.updater += Math.random()
    },
    putTime() {
      this.newReps = undefined
      this.newDuration = 0
      this.updater += Math.random()
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
