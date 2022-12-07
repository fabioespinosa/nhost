import Cookies from 'js-cookie'
import { GetServerSidePropsContext } from 'next'
import { StateFrom } from 'xstate'
import { waitFor } from 'xstate/lib/waitFor'

import { AuthMachine, NhostClient, NHOST_REFRESH_TOKEN_KEY } from '@nhost/nhost-js'

/**
 * Creates an Nhost client that runs on the server side.
 * It will try to get the refesh token in cookies, or from the request URL
 * If a refresh token is found, it uses it to get an up to date access token (JWT) and a user session
 * This method resolves when the authentication status is known eventually
 * @param backendUrl
 * @param context
 * @returns instance of `NhostClient` that is ready to use on the server side (signed in or signed out)
 */
export const createServerSideClient = async (
  backendUrl: string,
  context: GetServerSidePropsContext
) => {
  const nhost = new NhostClient({
    backendUrl,
    clientStorageType: 'custom',
    clientStorage: {
      getItem: (key) => {
        // TODO does not perfectly work in the same way as the 'regular' client:
        // in the authentication machine, if the refresh token is null but an error is found in the url, then the authentication stops and fails.
        // * When the requested key is `NHOST_REFRESH_TOKEN_KEY`, we have to look for the given 'refreshToken' value
        // * in the url as this is the key sent by hasura-auth
        const urlKey = key === NHOST_REFRESH_TOKEN_KEY ? 'refreshToken' : key
        const urlValue = context.query[urlKey]
        const cookieValue = Cookies.get(key) ?? null
        const nextCtxValue = context.req.cookies[key]

        return typeof urlValue === 'string' ? urlValue : cookieValue ?? nextCtxValue
      },
      setItem: (key, value) => {
        // TODO: Set expires based on the actual refresh token expire time
        // For now, we're using 30 days so the cookie is not removed when the browser is closed because if `expiers` is omitted, the cookie becomes a session cookie.
        Cookies.set(key, value, { httpOnly: false, sameSite: 'strict', expires: 30 })
      },
      removeItem: (key) => {
        Cookies.remove(key)
      }
    },
    start: true,
    autoRefreshToken: false,
    autoSignIn: true
  })

  await waitFor(
    nhost.auth.client.interpreter!,
    (state: StateFrom<AuthMachine>) => !state.hasTag('loading')
  )
  return nhost
}
