<template>
  <v-data-table>
    <draggable :list="items" tag="tbody">
      <!-- the row will go here -->
      <tr v-for="item in items" :key="item">
        <td>{{ item }}</td>
      </tr>
    </draggable>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      items: ['hola', 'como', 'estas', 'yo', 'todo', 'bien'],
    }
  },
}
</script>
