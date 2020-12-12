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
    {
      day: 'wednesday',
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
      ],
    },
    {
      day: 'friday',
      exercises: [
        {
          name: 'pull ups',
          sets: 3,
          reps: 8,
          weight: 0,
        },
        {
          name: 'inclined barbell row',
          sets: 3,
          reps: 8,
          weight: 20,
        },
        {
          name: 'renegade row',
          sets: 3,
          reps: 10,
          weight: 7.5,
        },
        {
          name: 'front raises',
          sets: 3,
          reps: 10,
          weight: 7.5,
        },
        {
          name: 'militar press',
          sets: 3,
          reps: 10,
          weight: 15,
        },
        {
          name: 'rear delt fly',
          sets: 3,
          reps: 8,
          weight: 7.5,
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
          reps: 8,
          weight: 0,
        },
      ],
    },
  ],
  goals: [
    {
      goal: 'Bench press 50kg',
      id: 1,
      done: false,
    },
    {
      goal: 'Squat 90kg',
      id: 2,
      done: true,
    },
    {
      goal: 'Deadlift 70kg',
      id: 3,
      done: true,
    },
    {
      goal: 'Do 10 pull ups with 5kg hung',
      id: 4,
      done: false,
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
  goals: (state) => state.goals,
}

export const actions = {
  actDeleteGoal({ commit }, id) {
    commit('deleteGoal', id)
  },
  actEditGoal({ commit }, newGoal) {
    commit('editGoal', newGoal)
  },
  actChangeGoalState({ commit }, id) {
    commit('changeGoalState', id)
  },
  actAddGoal({ commit }, goal) {
    commit('addGoal', goal)
  },
}

export const mutations = {
  deleteGoal(state, id) {
    const index = state.goals.findIndex((goal) => goal.id === id)
    state.goals.splice(index, 1)
  },
  editGoal(state, newGoal) {
    const index = state.goals.findIndex((goal) => goal.id === newGoal.id)
    state.goals.splice(index, 1, newGoal)
  },
  changeGoalState(state, id) {
    const index = state.goals.findIndex((goal) => goal.id === id)
    state.goals[index].done = !state.goals[index].done
  },
  addGoal(state, goal) {
    const nextId =
      state.goals
        .map((goal) => goal.id)
        .sort()
        .reverse()[0] + 1
    state.goals.push({
      goal,
      id: nextId,
    })
  },
}
