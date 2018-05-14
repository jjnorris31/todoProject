<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <img class="gif" v-if="gif"  :src="gif.fixed_width_small_url"  height="60" width="60">
      <VueUploadcare :url.sync="photoUrl"></VueUploadcare>
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <div v-if="!editing" @dblclick="editTodo" class="todo-item-label" :class="{ completed : completed }">{{ title }}</div>
      <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
    </div> <!-- end todo-item-left -->
    <div>
      <span class="remove-item" @click="removeTodo(todo.id)">
        &times;
      </span>
    </div>
  </div> <!-- end todo-item -->
</template>

<script>
import VueUploadcare from 'vue-uploadcare';
import axios from "axios";

export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'completed': this.todo.completed,
      'timestamp': this.todo.timestamp,
      'editing': this.todo.editing,
      'beforeEditCache': '',
      'photoUrl': '',
      'gif':''
    }
  },
  created() {
    eventBus.$on('pluralize', this.handlePluralize)
  },
  beforeDestroy() {
    eventBus.$off('pluralize', this.handlePluralize)
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed
    },
    todo() {
      this.title = this.todo.title
      this.completed = this.todo.completed
      if(this.completed){
        this.showGif();
      }else {
        this.gif = '';
      }

      console.log(this.gif.image_url)
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    removeTodo(id) {
      this.$store.dispatch('deleteTodo', id)
    },
    editTodo() {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$store.dispatch('updateTodo', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'timestamp': this.timestamp,
        'editing': this.editing,
      })
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
    pluralize() {
      eventBus.$emit('pluralize')
    },
    handlePluralize() {
      this.title = this.title + 's'
      this.$store.dispatch('updateTodo', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'timestamp': this.timestamp,
        'editing': this.editing,
      })
    },
    showGif(){
      var link = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&q=";
      var apiLink = link + 'amlo';

      axios.get(apiLink).then(response => {
        this.gif = response.data.data;
      }).catch(error => {
        console.log(error);
      });
    }
  },
  components: {
    VueUploadcare
  }
}
</script>

