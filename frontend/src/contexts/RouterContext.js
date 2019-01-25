import { createContext } from 'react'

const PrevPathContext = createContext({})

export default PrevPathContext
export const PrevPathProvider = PrevPathContext.Provider
export const PrevPathConsumer = PrevPathContext.Consumer
