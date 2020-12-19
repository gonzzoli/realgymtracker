<template>
  <v-container>
    <v-row>
      <v-col
        v-if="$vuetify.breakpoint.name != 'xs' && modifyingRoutine === false"
        cols="2"
      >
        <DaysPanel @daySelection="onSelectDay" />
      </v-col>
      <v-row v-else-if="modifyingRoutine === false">
        <DaysPanel @daySelection="onSelectDay" />
      </v-row>
      <v-col
        v-if="modifyingRoutine === false"
        cols="12"
        offset-sm="1"
        offset-md="0"
        sm="9"
        md="7"
        class="text-center"
      >
        <RoutinePanel
          :selected-day="selectedDay"
          :selected-routine="selectedRoutine"
          :modifying-routine="modifyingRoutine"
          @startedModifying="modifyingRoutine = true"
          @finishedModifying="modifyingRoutine = false"
        />
      </v-col>
      <v-row v-else justify="center">
        <v-col cols="12" sm="9" md="7" class="text-center">
          <RoutinePanel
            :selected-day="selectedDay"
            :selected-routine="selectedRoutine"
            :modifying-routine="modifyingRoutine"
            @startedModifying="modifyingRoutine = true"
            @finishedModifying="modifyingRoutine = false"
          />
        </v-col>
      </v-row>
      <!-- For the smAndUp goals section
        I wanted to do an scrollable panel
        so that when opening all goals the page 
        doesn`t get too large. Will do in the future.
       -->
      <v-col
        v-if="$vuetify.breakpoint.mdAndUp == true && modifyingRoutine === false"
        cols="3"
      >
        <GoalsPanel />
      </v-col>
      <v-row v-else-if="modifyingRoutine === false">
        <v-col cols="12">
          <GoalsPanel />
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import DaysPanel from '../components/index/DaysPanel.vue'
import RoutinePanel from '../components/index/RoutinePanel.vue'
import GoalsPanel from '../components/index/GoalsPanel.vue'

export default {
  components: {
    DaysPanel,
    RoutinePanel,
    GoalsPanel,
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
      selectedDay: '',
      selectedRoutine: [],
      modifyingRoutine: false,
    }
  },
  computed: {
    ...mapGetters(['routineByDay']),
  },
  created() {
    this.setNextDay()
  },
  methods: {
    onSelectDay({ day, routine }) {
      this.selectedDay = day
      this.selectedRoutine = routine
      console.log(this.selectedDay, this.selectedRoutine)
    },
    setNextDay() {
      const currentDay = this.days[new Date().getDay() - 1]
      // days ordered from today, if today is wednesday, then
      // ['wednesday', 'thursday', 'friday'.....,'tuesday']
      const previousDays = this.days.slice(0, this.days.indexOf(currentDay))
      const nextDays = this.days.slice(
        this.days.indexOf(currentDay),
        this.days.length
      )
      const orderedDays = nextDays.concat(previousDays)
      // iterate over the days to find next workout
      for (let i = 0; i < orderedDays.length; i++) {
        const day = orderedDays[i]
        try {
          const routine = JSON.parse(JSON.stringify(this.routineByDay(day)))
          // check if there are exercises on that day
          // else just catch it
          if (routine.exercises.length > 0) {
            this.selectedDay = day
            this.selectedRoutine = routine.exercises
            break
          }
        } catch {}
      }
    },
  },
}
</script>
