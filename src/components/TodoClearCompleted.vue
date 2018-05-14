<template>
  <button type="button" class="btn btn-primary btn-sm" v-if="showClearCompletedButton" @click="clearCompleted">Eliminar completados</button>
</template>

<script>
export default {
  name: 'todo-clear-completed',
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton
    }
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    }
  }
}
</script>

