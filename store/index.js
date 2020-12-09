export const state = () => ({
  routines: [
    {
      day: 'monday',
      exercises: [
        {
          name: 'bicycle',
          duration: '5 min',
        },
        {
          name: 'legs extension',
          sets: 3,
          reps: 10,
          weight: 20,
        },
        {
          name: 'squats',
          sets: 3,
          reps: 8,
          weight: 70,
        },
        {
          name: 'calf raises',
          sets: 3,
          reps: 15,
          weight: 35,
        },
        {
          name: 'side squats',
          sets: 3,
          reps: 20,
          weight: 12,
        },
        {
          name: 'lunges',
          sets: 3,
          reps: 10,
          weight: 20,
        },
        {
          name: 'arms warmup',
          duration: '3min',
        },
        {
          name: 'pull ups',
          sets: 3,
          reps: 10,
          weight: 0,
        },
        {
          name: 'chin ups',
          sets: 3,
          reps: 8,
          weight: 0,
        },
        {
          name: 'dips',
          sets: 3,
          reps: 10,
          weight: 20,
        },
        {
          name: 'crunches',
          sets: 3,
          reps: 10,
          weight: 0,
        },
        {
          name: 'side crunches',
          sets: 3,
          reps: 10,
          weight: 0,
        },
        {
          name: 'table',
          sets: 3,
          duration: '1min',
          weight: 0,
        },
        {
          name: 'leg raises',
          sets: 3,
          reps: 10,
          weight: 0,
        },
      ],
    },
  ],
})

export const getters = {
  routineByDay: (state) => (day) => {
    const exercises = state.routines.filter((routine) => {
      return routine.day === day ? routine.exercises : null
    })
    return exercises[0]
  },
}

export const actions = {}

export const mutations = {}
