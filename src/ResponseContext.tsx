import { createContext } from 'react'

const initialResponse = { responses:[{}], setResponses: (responses: any) => { } };
const ResponseContext = createContext<any>(initialResponse)
export default ResponseContext;

