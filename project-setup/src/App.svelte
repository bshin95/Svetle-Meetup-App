<script>
  import Header from './UI/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'

  const meetups = [
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
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  <MeetupGrid {meetups}/>
</main>