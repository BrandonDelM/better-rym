import { fetch } from '../../utils/fetch'
import type { SearchFunction } from '../types'

export const search: SearchFunction = async({  artist, title }) => {
    const response = await fetch({
        url: `https://deezer.com/search/${artist} ${title}/album`,
        method: 'GET',
    })

    const html = new DOMParser().parseFromString(response, 'text/html')
    const topResult = html.querySelector('[data-testid="album_thumbnail"]')
    if (!topResult) {
        return undefined
    }

    const url = topResult.querySelector('a')?.href
    return url ?? undefined
}