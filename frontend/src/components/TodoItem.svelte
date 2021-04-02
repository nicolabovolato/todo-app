<script>
  import { createEventDispatcher  } from 'svelte'
  import { deleteTodo, updateTodo } from '../api'

  export let id = 0
  export let title = ''
  export let description = ''
  export let completed = false

  const dispatch = createEventDispatcher()

  const handleCompleted = async () => {

    try{
      completed = !completed

      const todo = await updateTodo({id, title, description, completed})

      dispatch('update', todo)
    }
    catch(err) {
      dispatch('error', err)
    }
  }

  const handleDelete = async () => {
    try{
      const todo = await deleteTodo({id, title, description, completed})

      dispatch('delete', todo)
    }
    catch(err) {
      dispatch('error', err)
    }
  }

</script>

<div class="panel-block columns is-mobile py-3 px-5">

  <div class="column">
    <div class="title is-5">{title}</div>
    <div class="subtitle is-6">{description}</div>
  </div>

  <div class="column is-narrow">
    <div class=" buttons has-addons">

      <button class="button" class:is-primary={completed} on:click={handleCompleted}>
        <span class="icon">
          <ion-icon name="checkmark-outline"></ion-icon>
        </span>
      </button>

      <button class="button" on:click={handleDelete}>
        <span class="icon">
          <ion-icon name="trash"></ion-icon>
        </span>
      </button>

    </div>
  </div>

</div>

<style></style>
