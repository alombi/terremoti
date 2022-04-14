import { writable } from 'svelte/store'

export const events = writable({})
export const specialEvent = writable({})
export const weeklyEvents = writable({})
export const refreshed = writable(false)