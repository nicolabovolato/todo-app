<script>
  import { onMount, createEventDispatcher }   from 'svelte'
  import { loggedIn, login, signup, logout, refresh, getUsername } from '../api'

  let isSignup = false

  let username = ''
  let password = ''
  let confirmPassword = ''

  $: if ($loggedIn) username = getUsername()
     else username = password = confirmPassword = ''

  onMount(async() => {
    await refresh()
  })

  const dispatch = createEventDispatcher()

  const handleLogout = async() => {

    await logout()
  }

  const handleLogin = async() => {
    try{
      if(username.trim() === '') throw 'Username must not be empty'
      if(password.trim() === '') throw 'Password must not be empty'

      await login(username, password)
    }
    catch(err) {
      dispatch('error', err)
    }
  }

  const handleSignup = async() => {
    try {
      if(username.trim() === '') throw 'Username must not be empty'
      if(password.trim() === '') throw 'Password must not be empty'
      if(password != confirmPassword) throw 'Password do not match'

      await signup(username, password)

      isSignup = false
    }
    catch(err) {
      dispatch('error', err)
    }
  }

</script>


{#if $loggedIn}

  <div class="level is-mobile my-5">
    <div class="level-left">

      <span class="level-item icon-text">
        <span class="icon">
          <ion-icon name="person"></ion-icon>
        </span>
        <span class="has-text-weight-bold">{username}</span>
      </span>

    </div>

    <div class="level-right">
      <button class="level-item button is-ghost" on:click={handleLogout}>Logout</button>
    </div>

  </div>

{:else}

  <div class="box">

    <div class="level level-item buttons has-addons">
      <button class="button" class:is-primary={!isSignup} on:click={() => isSignup = false}>Login</button>
      <button class="button" class:is-primary={ isSignup} on:click={() => isSignup = true }>Sign Up</button>
    </div>

    <div class="field control has-icons-left">
      <span class="icon is-small is-left">
        <ion-icon name="person"></ion-icon>
      </span>
      <input class="input" type="text" placeholder="Username" bind:value={username}/>
    </div>

    <div class="field control has-icons-left">
      <span class="icon is-small is-left">
        <ion-icon name="key"></ion-icon>
      </span>
      <input class="input" type="password" placeholder="Password" bind:value={password}/>
    </div>

    {#if isSignup}

      <div class="field control has-icons-left">
        <span class="icon is-small is-left">
          <ion-icon name="key"></ion-icon>
        </span>
        <input class="input" type="password" placeholder="Confirm Password" bind:value={confirmPassword}/>
      </div>

      <div class="has-text-centered">
        <button class="control button is-primary" on:click={handleSignup}>Signup</button>
      </div>

    {:else}

      <div class="has-text-centered">
        <button class="control button is-primary" on:click={handleLogin}>Login</button>
      </div>

    {/if}

  </div>

{/if}

<style>
  .box{
    margin-top:50%;
  }
</style>
