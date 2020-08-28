<script>
  import Header from './UI/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import TextInput from './UI/TextInput.svelte'
  import Button from "./UI/Button.svelte"
  import EditMeetup from "./Meetups/EditMeetup.svelte"

  let title = '';
  let subtitle = '';
  let address = '';
  let email = '';
  let description = '';
  let imageUrl = '';

  let meetups = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      description: 'In this meetup, we will have some experts that teach you how to code.',
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      address: '123 Broadway Ave, New York, New York 10005',
      contactEmail: 'something@test.com',
      isFavorite: false
    },
    {
      id: 'm2',
      title: 'Swimming Class',
      subtitle: 'Learn the basics of swimming',
      description: 'We teach beginners how to swim.',
      imageUrl: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      address: '99 Broadway Ave, New York, New York 10005',
      contactEmail: 'swimming@test.com',
      isFavorite: false
    }
  ];

  let editMode;

  function addMeetup(event) {
    const newMeetup = {
      id: Math.random().toString(),
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      contactEmail: event.detail.email,
      address: event.detail.address
    };

    // meetups.push(newMeetup); //this does not work
    meetups = [newMeetup, ...meetups] //the = sign lets svelte recognize that it needs to be updated and then updates the DOM
    let editMode;
  }

  function toggleFavorite(event) {
    const id = event.detail
    const updatedMeetup = { ...meetups.find(m => m.id === id)}
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite
    const meetupIndex = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup
    meetups = updatedMeetups;
  }

  function cancelEdit() {
    editMode = null;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click="{() => editMode = 'add'}">New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save="{addMeetup}" on:cancel={cancelEdit}/>
  {/if}
  <MeetupGrid {meetups} on:togglefavorite="{toggleFavorite}"/>
</main>