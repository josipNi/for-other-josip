import { useEffect, useState } from 'react'
import { SubscriptionUtility } from '../utilities/subscription.utility'

export const useSubscription = <T>(subscription: SubscriptionUtility<T>) => {
    const [state, setState] = useState(subscription.get)

    useEffect(() => {
        const subscriptionId = subscription.subscribe(setState)
        return () => subscription.unsubscribe(subscriptionId)
    }, [subscription])

    return state
}
