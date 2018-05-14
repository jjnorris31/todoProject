<template>
  <div>
    <input type="text" class="todo-input" placeholder="¿Qué es lo siguiente que harás?" v-model="newTodo" @keyup.enter="addTodo">
    <div v-if="$store.state.loading" class="lds-ripple">
      <div></div><div></div><div></div><div></div>
    </div>
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
    </todo-item>
    </transition-group>

    <div class="extra-container">
      <todo-check-all></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div> <!-- end extra-container -->

    <div class="extra-container">
      <todo-filtered></todo-filtered>

      <div>
        <transition name="fade">
        <todo-clear-completed></todo-clear-completed>
        </transition>
      </div>
    </div> <!-- end extra-container -->
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted,
  },
  data() {
    return {
      newTodo: '',
      idForTodo: 3,
    }
  },
  created() {
    this.$store.dispatch('initRealtimeListeners')
    this.$store.dispatch('retrieveTodos')
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }

      this.$store.dispatch('addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
      })

      this.newTodo = ''
      this.idForTodo++
    },
  }
}
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; //override defaults
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.gif {
  border: 5px solid white;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover {
    background: lightgreen;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
}

// CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// CSS Spinning Loader
.lds-ripple {
  display: block;
  position: relative;
  width: 64px;
  height: 64px;
  margin: auto;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid grey;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}

</style>
