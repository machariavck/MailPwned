import dotenv from 'dotenv'
import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'


dotenv.config()
const app = express();


const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'Each user',
	fields: () => ({
		Name: { type: GraphQLString }
	})
})

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		description: 'Root Query',
		fields: () => ({
			user: {
				type: new GraphQLList(UserType),
				args: { email: { type: GraphQLString } },
				resolve: (parent,args) => (async () => {

					const res = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${args.email}`,{
						headers: {
							'hibp-api-key': `${process.env.KEY}`
						}
					})

					return res.json()
				})()
			}
		})
	})
})


app.use(cors({
	origin: 'http://localhost:3000'
}))

app.use('/breaches', graphqlHTTP({
	graphiql: true,
	schema: schema
}))


app.listen(5000, () => {
	console.log('\n<<<Server Running>>>\nurl: http://localhost:5000/breaches\n\n')
})