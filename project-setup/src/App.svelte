<script>
  import meetups from "./Meetups/meetups-store"
  import Header from './UI/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import TextInput from './UI/TextInput.svelte'
  import Button from "./UI/Button.svelte"
  import EditMeetup from "./Meetups/EditMeetup.svelte"
  import MeetupDetail from './Meetups/MeetupDetail.svelte'

  let title = '';
  let subtitle = '';
  let address = '';
  let email = '';
  let description = '';
  let imageUrl = '';
  // let loadedMeetups = meetups;

  // let meetups = ;

  let editMode;
  let editedId;
  let page = 'overview';
  let pageData = {};

  function savedMeetup(event) {
    // const meetupData = {
    //   id: Math.random().toString(),
    //   title: event.detail.title,
    //   subtitle: event.detail.subtitle,
    //   description: event.detail.description,
    //   imageUrl: event.detail.imageUrl,
    //   contactEmail: event.detail.email,
    //   address: event.detail.address
    // };

    // // meetups.push(newMeetup); //this does not work
    // // meetups = [newMeetup, ...meetups] //the = sign lets svelte recognize that it needs to be updated and then updates the DOM
    // meetups.addMeetup(meetupData)
    let editMode = null;
    let editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showDetails(event) {
    page = 'details'
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = 'overview'
    pageData = {};
  }

  function startEdit(event) {
    editMode = 'edit';
    editedId = event.detail
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

</style>

<Header />

<main>
{#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save="{savedMeetup}" on:cancel={cancelEdit}/>
    {/if}
    <MeetupGrid meetups={$meetups} on:showdetails={showDetails} on:edit="{startEdit}" on:add={() => {editMode = 'edit'}}/>
  {:else}
  <MeetupDetail id={pageData.id} on:click={closeDetails}/>
{/if}
</main>