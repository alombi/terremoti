// @ts-nocheck
export async function load(event) {
    let data = await fetch(event.url.origin + '/api/latest')
    data = await data.json()
    return {data: data.last37}
}