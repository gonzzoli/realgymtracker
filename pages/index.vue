<template>
  <v-container>
    <v-row>
      <v-col v-if="$vuetify.breakpoint.name != 'xs'" cols="2">
        <v-list>
          <v-list-item v-for="day in days" :key="day" class="my-1">
            <v-btn @click.stop="selectDay(day)">{{ day }}</v-btn>
          </v-list-item>
        </v-list>
      </v-col>
      <v-row v-else justify="center">
        <v-col v-for="day in days" :key="day" cols="1" class="mx-1">
          <v-btn icon fab @click.stop="selectDay(day)">{{
            day[0].toUpperCase()
          }}</v-btn>
        </v-col>
      </v-row>
      <v-col
        cols="12"
        offset-sm="1"
        offset-md="0"
        sm="9"
        md="7"
        class="text-center"
      >
        <v-container style="background: #fafafa">
          <h3 v-if="selectedDay == null" class="mb-2">Next: {nextworkout}</h3>
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
          <h3 v-if="selectedRoutine.length === 0">
            No routine set for this day!
          </h3>
          <v-btn
            v-if="selectedRoutine.length > 0 && showAllExercises === false"
            text
            class="my-5"
            @click.stop="showAllExercises = true"
            >Show All</v-btn
          >
          <v-btn
            v-else-if="selectedRoutine.length > 0"
            class="my-5"
            text
            @click.stop="showAllExercises = false"
            >Show Less</v-btn
          >
        </v-container>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp == true" cols="3">
        <h1>Goals</h1>
      </v-col>
      <v-row v-else justify="center">
        <v-col cols="11">
          <h1>Goals</h1>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import HorizontalExercises from '../components/HorizontalExercises.vue'

export default {
  components: {
    HorizontalExercises,
  },
  data() {
    return {
      days: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      selectedDay: null,
      selectedRoutine: [],
      showAllExercises: false,
    }
  },
  computed: {
    ...mapGetters(['routineByDay']),
  },
  methods: {
    selectDay(day) {
      this.selectedDay = day
      // Here I had problems with Vue observer, so don`t worry if seems complicated
      try {
        const routine = JSON.parse(
          JSON.stringify(this.routineByDay(this.selectedDay))
        )
        this.selectedRoutine = routine.exercises
      } catch {
        // In case there's no routine for the day set it back to empty
        this.selectedDay = day
        this.selectedRoutine = []
      }
    },
  },
}
</script>
