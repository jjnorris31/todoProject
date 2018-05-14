<template>
  <div>
    <button type="button" class="btn btn-primary btn-sm" :class="{ active: filter == 'all' }" @click="changeFilter('all')">Todos</button>
    <button type="button" class="btn btn-primary btn-sm":class="{ active: filter == 'active' }" @click="changeFilter('active')">Activos</button>
    <button type="button" class="btn btn-primary btn-sm":class="{ active: filter == 'completed' }" @click="changeFilter('completed')">Completados</button>
  </div>
</template>

<script>
export default {
  name: 'todo-filtered',
  computed: {
    filter() {
      return this.$store.state.filter
    }
  },
  methods: {
    changeFilter(filter) {
      this.$store.dispatch('updateFilter', filter)
    }
  }
}
</script>

