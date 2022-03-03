import { useContext } from 'react'
import { ApiContext } from '../contexts/api.context'
import { SubscriptionUtility } from '../utilities/subscription.utility'
import { useSubscription } from './useSubscription.hook'

export const useApiHook = () => useContext(ApiContext)
export const useTestSubscription = () => {
    const subscription = new SubscriptionUtility<any>({ jo: 'sip' })
    return useSubscription(subscription)
}
