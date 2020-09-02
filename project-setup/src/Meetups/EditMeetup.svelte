<script>
  import meetups from './meetups-store'
  import { createEventDispatcher } from 'svelte'

  import TextInput from "../UI/TextInput.svelte"
  import Button from "../UI/Button.svelte"
  import Modal from "../UI/Modal.svelte"
  import { isEmpty, isValidEmail } from "../helpers/validation"

  export let id = null;


  let title = '';
  let subtitle = '';
  let address = '';
  let email = '';
  let description = '';
  let imageUrl = '';

  if (id) {
    const unsubscribe = meetups.subscribe(items => {
      const selectedMeetup = items.find(i => i.id === id)
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      email = selectedMeetup.contactEmail;
      description = selectedMeetup.description;
      imageUrl = selectedMeetup.imageUrl;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher()

  $: titleValid = !isEmpty(title)
  $: subtitleValid = !isEmpty(subtitle)
  $: addressValid = !isEmpty(address)
  $: descriptionValid = !isEmpty(description)
  $: imageUrlValid = !isEmpty(imageUrl)
  $: emailValid = isValidEmail(email)
  $: formIsValid = titleValid && subtitleValid && addressValid && descriptionValid && imageUrlValid &&emailValid

  function submitForm() {
    const meetupData = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      contactEmail: email,
      address: address
    };

    // meetups.push(newMeetup); //this does not work
    // meetups = [newMeetup, ...meetups] //the = sign lets svelte recognize that it needs to be updated and then updates the DOM
    if (id) {
      fetch(`https://svelte-http-3a7a6.firebaseio.com/meetups/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify(meetupData),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('An error has occured, please try again.')
        }
        meetups.updateMeetup(id, meetupData)
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      fetch("https://svelte-http-3a7a6.firebaseio.com/meetups.json", {
        method: 'POST',
        body: JSON.stringify({...meetupData, isFavorite: false}),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('An error occured!')
        }
        return res.json()
      })
      .then(data => {
        meetups.addMeetup({...meetupData, isFavorite: false, id: data.name})
      })
      .catch(err => {
        console.log(err)
      });
    } 
    dispatch('save')
  }

  function deleteMeetup() {
    fetch(`https://svelte-http-3a7a6.firebaseio.com/meetups/${id}.json`, {
      method: 'DELETE'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('An error has occured, please try again.')
      }
      meetups.removeMeetup(id)
    })
    .catch(err => {
      console.log(err)
    })
    dispatch('save')
  }

  function cancel() {
    dispatch('cancel')
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput 
      id="title" 
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title"
      value={title} 
      on:input="{(event) => (title = event.target.value)}"
    />
    <TextInput 
      id="subtitle" 
      label="Subtitle" 
      value={subtitle} 
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle"
      type="text"
      on:input="{(event) => (subtitle = event.target.value)}"
    />
    <TextInput 
      id="address" 
      label="Address" 
      value={address}
      valid={addressValid}
      validityMessage="Please enter a valid address"
      on:input="{(event) => (address = event.target.value)}"
    />
    <TextInput 
      id="imageUrl" 
      label="Image URL" 
      value={imageUrl}
      valid={imageUrlValid}
      validityMessage="Please enter a valid URL" 
      type="text"
      on:input="{(event) => (imageUrl = event.target.value)}"
    />
    <TextInput 
      id="email" 
      label="Email" 
      value={email}
      valid={emailValid}
      validityMessage="Please enter a valid email" 
      type="email"
      on:input="{(event) => (email = event.target.value)}"
    />
    <TextInput 
      id="description" 
      label="Description" 
      controlType="textarea"
      valid={descriptionValid}
      validityMessage="Please enter a valid description" 
      bind:value={description}
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
    {#if id}
      <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>