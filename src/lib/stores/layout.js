import { writable } from 'svelte/store'

export const sidebar = writable(false)
export const weekly = writable(false)
export const icon = writable('moon')