import { writable } from 'svelte/store'

export const events = writable({})
export const specialEvent = writable({})
export const weekly = writable({})
export const refreshed = writable(false)