import { writable } from "svelte/store"

const meetups = writable([
  {
    id: "m1",
    title: "Coding Bootcamp",
    subtitle: "Learn to code in 2 hours",
    description:
      "In this meetup, we will have some experts that teach you how to code.",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    address: "123 Broadway Ave, New York, New York 10005",
    contactEmail: "something@test.com",
    isFavorite: false,
  },
  {
    id: "m2",
    title: "Swimming Class",
    subtitle: "Learn the basics of swimming",
    description: "We teach beginners how to swim.",
    imageUrl:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    address: "99 Broadway Ave, New York, New York 10005",
    contactEmail: "swimming@test.com",
    isFavorite: false,
  },
])

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false,
    }
    meetups.update((items) => {
      return [newMeetup, ...items]
    })
  },
  updatedMeetup: (id, meetupData) => {
    meetups.update((items) => {
      const meetupIndex = items.findIndex((i) => i.id === id)
      const updatedMeetup = { ...items[meetupIndex], ...meetupData }
      const updatedMeetups = [...items]
      updatedMeetups[meetupIndex] = updatedMeetup
      return updatedMeetups
    })
  },
  removeMeetup: (id) => {
    meetups.update((items) => {
      return items.filter(i => i.id !== id)
    })
  },
  toggleFavorite: (id) => {
    meetups.update((items) => {
      const updatedMeetup = { ...items.find((m) => m.id === id) }
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite
      const meetupIndex = items.findIndex((m) => m.id === id)
      const updatedMeetups = [...items]
      updatedMeetups[meetupIndex] = updatedMeetup
      return updatedMeetups
    })
  },
}

export default customMeetupsStore
