<script>
  export let controlType;
  export let id;
  export let label;
  export let rows;
  export let value;
  export let type;
</script>

<!-- {#if controlType === 'textarea'}
  <div class="form-control">
    <label for="description">Description</label>
    <textarea rows="3" id="description" bind:value={description}/>
  </div>
{:else}
  <div class="form-control">
    <label for="title">Title</label>
    <input type="text" id="title" bind:value={title}/>
  </div>
{/if} -->

<style>
  input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: none;
  border-bottom: 2px solid #ccc;
  border-radius: 3px 3px 0 0;
  background: white;
  padding: 0.15rem 0.25rem;
  transition: border-color 0.1s ease-out;
}

input:focus,
textarea:focus {
  border-color: #e40763;
  outline: none;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
}

.form-control {
  padding: 0.5rem 0;
  width: 100%;
  margin: 0.25rem 0;
}

</style>

<div class="form-control">
  <label for="{id}">{label}</label>
  {#if controlType === 'textarea'}
    <textarea {rows} {id} {value} on:input/>
  {:else}
    <input type="{type}" {id} {value} on:input />
  {/if}
</div>