<script>
  import { createEventDispatcher } from 'svelte'
  import { addTodo } from '../api'

  let title = ''
  let description = ''

  const dispatch = createEventDispatcher()

  const handleAdd = async () => {
    try{
      if(title === '') throw 'Title cannot be empty'

      const todo = await addTodo(title, description)

      title = ''
      description = ''
      dispatch('add', todo)
    }
    catch(err) {
      dispatch('error', err)
    }
  }

</script>

<div class="panel-block pt-1 pb-5 px-5">

  <div class="control field has-addons has-addons-centered">

    <div class="control is-narrow">
      <input class="input" type="text" placeholder="Title" bind:value={title}/>
    </div>

    <div class="control is-expanded">
      <input class="input" type="text" placeholder="Description" bind:value={description}/>
    </div>

    <div class="control is-narrow">

      <button class="button is-primary" on:click={handleAdd}>
        <span class="icon">
          <ion-icon name="add"></ion-icon>
        </span>
      </button>

    </div>
  </div>

</div>

<style></style>
