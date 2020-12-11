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
          <h3 v-if="selectedRoutine.length === 0">
            No routine set for this day!
          </h3>
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
      </v-col>
      <!-- For the smAndUp goals section
        I wanted to do an scrollable panel
        so that when opening all goals the page 
        doesn`t get too large. Will do in the future.
       -->
      <v-col v-if="$vuetify.breakpoint.mdAndUp == true" cols="3">
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
      </v-col>
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
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import HorizontalExercises from '../components/HorizontalExercises.vue'
import GoalCard from '../components/index/GoalCard.vue'
import AddGoal from '../components/index/AddGoal.vue'

export default {
  components: {
    HorizontalExercises,
    GoalCard,
    AddGoal,
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
      selectedDay: 'monday',
      selectedRoutine: [],
      showAllExercises: false,
      showAllGoals: false,
      firstOpened: true,
    }
  },
  computed: {
    ...mapGetters(['routineByDay', 'goals']),
  },
  created() {
    this.setNextDay()
    try {
      const routine = JSON.parse(
        JSON.stringify(this.routineByDay(this.selectedDay))
      )
      this.selectedRoutine = routine.exercises
    } catch {
      // In case there's no routine for the day set it back to empty
    }
  },
  methods: {
    selectDay(day) {
      this.firstOpened = false
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
    setNextDay() {
      const currentDay = this.days[new Date().getDay() - 1]
      // days ordered from today, if today is wednesday, then
      // ['wednesday', 'thursday', 'friday'.....,'tuesday']
      const previousDays = this.days.slice(0, this.days.indexOf(currentDay))
      const nextDays = this.days.slice(
        this.days.indexOf(currentDay),
        this.days.lenght
      )
      const orderedDays = nextDays.concat(previousDays)
      console.log(orderedDays)

      orderedDays.forEach((day) => {
        try {
          const routine = JSON.parse(JSON.stringify(this.routineByDay(day)))
          console.log(routine)
        } catch (e) {
          console.log(e)
        }
      })
    },
  },
}
</script>
