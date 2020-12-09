<template>
  <v-card>
    <v-row>
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
          ><strong>{{ exercise.duration }}</strong></v-card-text
        >
        <v-icon size="26" style="weight: 600" class="mt-n2"
          >mdi-chevron-down</v-icon
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
  </v-card>
</template>

<script>
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
        }
      },
    },
  },
  methods: {
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
  },
}
</script>
