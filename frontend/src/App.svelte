<script>
  import Auth     from './components/Auth.svelte'
  import TodoItem from './components/TodoItem.svelte'
  import AddTodo  from './components/AddTodo.svelte'

  import { loggedIn, getTodos } from './api'

  let items = []
  let error = ''

  $: if ($loggedIn) updateItems()
     else items = []

  const updateItems = async() => {

    items = await getTodos()
  }

  const handleAdd = async(event) => {

    items = [...items, event.detail]
  }

  const handleUpdate = async(event) => {

    items = items.map(item => item.id == event.detail.id ? event.detail : item)
  }

  const handleDelete = async(event) => {

    items = items.filter(item => item.id != event.detail.id)
  }

  const handleError = async(event) => {

    error = event.detail
    setTimeout(() => error = '', 3000)
  }

</script>

<svelte:head>
  <link   rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css">
  <script type="module"    src ="https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.esm.js"/>
  <script nomodule=""      src ="https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.js"/>
</svelte:head>

<main class="container column is-three-quarters-tablet is-two-thirds-desktop is-half-widescreen is-one-third-fullhd">

  <Auth on:error={handleError}/>

  {#if $loggedIn}

    <div class="panel">
      <div class="panel-heading level is-mobile">
        <div class="level-left  level-item">TODO</div>
        <div class="level-right level-item">

          <a class="has-text-grey-darker" on:click={updateItems}>
            <span class="icon is-medium">
              <ion-icon name="reload-circle"></ion-icon>
            </span>
          </a>

        </div>
      </div>

      <AddTodo on:add={handleAdd} on:error={handleError}/>

      {#each items as item}

        <TodoItem {...item} on:update={handleUpdate} on:delete={handleDelete} on:error={handleError}/>

      {/each}

    </div>

  {/if}

  {#if error}

    <div class="notification is-danger is-light">
      <button class="delete" on:click={() => error = ''}></button>
      {error}
    </div>

  {/if}

</main>

<style>
  ion-icon{
    height: 100%;
    width: 100%;
  }
</style>
