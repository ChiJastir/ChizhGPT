import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://77.222.43.35:5000/graphql/'
const client = new GraphQLClient(endpoint)

export default client