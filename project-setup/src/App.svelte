<script>
  import Header from './UI/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import TextInput from './UI/TextInput.svelte'
  import Button from "./UI/Button.svelte"

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
      contactEmail: 'something@test.com'
    },
    {
      id: 'm2',
      title: 'Swimming Class',
      subtitle: 'Learn the basics of swimming',
      description: 'We teach beginners how to swim.',
      imageUrl: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      address: '99 Broadway Ave, New York, New York 10005',
      contactEmail: 'swimming@test.com'
    }
  ];

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      contactEmail: email,
      address: address
    };

    // meetups.push(newMeetup); //this does not work
    meetups = [newMeetup, ...meetups] //the = sign lets svelte recognize that it needs to be updated and then updates the DOM
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault="{addMeetup}">
    <TextInput 
      id="title" 
      label="Title" 
      value={title} 
      type="text"
      on:input="{(event) => (title = event.target.value)}"
    />
    <TextInput 
      id="subtitle" 
      label="Subtitle" 
      value={subtitle} 
      type="text"
      on:input="{(event) => (subtitle = event.target.value)}"
    />
    <TextInput 
      id="address" 
      label="Address" 
      value={address}
      type="text"
      on:input="{(event) => (address = event.target.value)}"
    />
    <TextInput 
      id="imageUrl" 
      label="Image URL" 
      value={imageUrl} 
      type="text"
      on:input="{(event) => (imageUrl = event.target.value)}"
    />
    <TextInput 
      id="email" 
      label="Email" 
      value={email} 
      type="email"
      on:input="{(event) => (email = event.target.value)}"
    />
    <TextInput 
      id="description" 
      label="Description" 
      controlType="textarea"
      value={description} 
      on:input="{(event) => (description = event.target.value)}"
    />
    <Button type="submit" caption="Save"/>
  </form>
  <MeetupGrid {meetups}/>
</main>