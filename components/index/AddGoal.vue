<template>
  <div>
    <v-form @submit.prevent="submitForm()">
      <v-row align="center">
        <v-col cols="10">
          <v-text-field
            v-model="goalForm"
            name="goal"
            label="New goal..."
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn small color="success" fab @click.stop="submitForm()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      goalForm: '',
    }
  },
  methods: {
    ...mapActions(['actAddGoal']),
    submitForm() {
      this.actAddGoal(this.goalForm)
      this.goalForm = ''
    },
  },
}
</script>
