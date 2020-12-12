<template>
  <div>
    <div v-if="$vuetify.breakpoint.name != 'xs'">
      <v-list>
        <v-list-item v-for="day in days" :key="day" class="my-1">
          <v-btn @click.stop="selectDay(day)">{{ day }}</v-btn>
        </v-list-item>
      </v-list>
    </div>
    <v-row v-else justify="center">
      <v-col v-for="day in days" :key="day" cols="1" class="mx-1">
        <v-btn icon fab @click.stop="selectDay(day)">{{
          day[0].toUpperCase()
        }}</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
    }
  },
  computed: {
    ...mapGetters(['routineByDay']),
  },
  methods: {
    selectDay(day) {
      // Here I had problems with Vue observer, so don`t worry if seems complicated
      try {
        const routine = JSON.parse(JSON.stringify(this.routineByDay(day)))
        this.$emit('daySelection', {
          day,
          routine: routine.exercises,
        })
      } catch {
        // In case there's no routine for the day set it back to empty
        this.$emit('daySelection', {
          day,
          routine: [],
        })
      }
    },
  },
}
</script>
