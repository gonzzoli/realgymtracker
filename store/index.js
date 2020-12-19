export const state = () => ({
  routines: [
    {
      day: 'monday',
      exercises: [
        {
          name: 'bicycle',
          duration: 5,
          id: 0,
        },
        {
          name: 'legs extension',
          sets: 3,
          reps: 10,
          weight: 20,
          id: 1,
        },
        {
          name: 'squats',
          sets: 3,
          reps: 8,
          weight: 70,
          id: 2,
        },
        {
          name: 'calf raises',
          sets: 3,
          reps: 15,
          weight: 35,
          id: 3,
        },
        {
          name: 'side squats',
          sets: 3,
          reps: 20,
          weight: 12,
          id: 4,
        },
        {
          name: 'lunges',
          sets: 3,
          reps: 10,
          weight: 20,
          id: 5,
        },
        {
          name: 'arms warmup',
          duration: 3,
          id: 6,
        },
        {
          name: 'pull ups',
          sets: 3,
          reps: 10,
          weight: 0,
          id: 7,
        },
        {
          name: 'chin ups',
          sets: 3,
          reps: 8,
          weight: 0,
          id: 8,
        },
        {
          name: 'dips',
          sets: 3,
          reps: 10,
          weight: 20,
          id: 9,
        },
        {
          name: 'crunches',
          sets: 3,
          reps: 10,
          weight: 0,
          id: 10,
        },
        {
          name: 'side crunches',
          sets: 3,
          reps: 10,
          weight: 0,
          id: 11,
        },
        {
          name: 'table',
          sets: 3,
          duration: 1,
          weight: 0,
          id: 12,
        },
        {
          name: 'leg raises',
          sets: 3,
          reps: 10,
          weight: 0,
          id: 13,
        },
      ],
    },
    {
      day: 'tuesday',
      exercises: [],
    },
    {
      day: 'wednesday',
      exercises: [
        {
          name: 'bicycle',
          duration: 5,
          id: 0,
        },
        {
          name: 'legs extension',
          sets: 3,
          reps: 10,
          weight: 20,
          id: 1,
        },
      ],
    },
    {
      day: 'thursday',
      exercises: [],
    },
    {
      day: 'friday',
      exercises: [
        {
          name: 'pull ups',
          sets: 3,
          reps: 8,
          weight: 0,
          id: 0,
        },
        {
          name: 'inclined barbell row',
          sets: 3,
          reps: 8,
          weight: 20,
          id: 1,
        },
        {
          name: 'renegade row',
          sets: 3,
          reps: 10,
          weight: 7.5,
          id: 2,
        },
        {
          name: 'front raises',
          sets: 3,
          reps: 10,
          weight: 7.5,
          id: 3,
        },
        {
          name: 'militar press',
          sets: 3,
          reps: 10,
          weight: 15,
          id: 4,
        },
        {
          name: 'rear delt fly',
          sets: 3,
          reps: 8,
          weight: 7.5,
          id: 5,
        },
        {
          name: 'chin ups',
          sets: 3,
          reps: 8,
          weight: 0,
          id: 6,
        },
        {
          name: 'dips',
          sets: 3,
          reps: 8,
          weight: 0,
          id: 7,
        },
      ],
    },
    {
      day: 'saturday',
      exercises: [],
    },
    {
      day: 'sunday',
      exercises: [],
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
  modifyRoutine: (state) => state.modifyRoutine,
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
  actModifyRoutineMode({ commit }) {
    commit('modifyRoutineMode')
  },
  // takes in the routine with
  // all deleted, added and modified exercises
  // and sets it back to routine in state
  actSetNewRoutine({ commit }, newRoutine) {
    commit('setNewRoutine', newRoutine)
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
  modifyRoutineMode(state) {
    state.modifyRoutine = !state.modifyRoutine
  },
  setNewRoutine(state, newRoutine) {
    const routineIndex = state.routines.findIndex(
      (routine) => routine.day === newRoutine.day
    )
    state.routines[routineIndex].exercises = newRoutine.exercises
    // console.log(state.routines[routineIndex].exercises)
    // console.log(state.routines)
  },
}
