import { fetch } from '../../utils/fetch'
import type { SearchFunction } from '../types'

import { requestToken } from './auth'

export const search: SearchFunction = async({  artist, title }) => {
    const token = await requestToken()

    const response = await fetch({
        url: 'https://api.tidal.com/v1/search/albums',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.access_token}`,
            'Accept': 'application/json'
        },
        urlParameters: {
            query: `${artist} ${title}`,
            limit: '1',
            countryCode: 'US'
        },
    })

    const data = typeof response === 'string' ? JSON.parse(response) : response

    const album = data?.albums?.items?.[0]

    return album?.url ?? undefined
}