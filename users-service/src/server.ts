import http from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"
import app from "./app";
import resolvers from "./gql/resolvers";
import typeDefs from "./gql/typeDefs";
import connectDB from "./db/connectDB";

const runApp = async () => {

    try {

        const httpServer = http.createServer(app);
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            cache: 'bounded',
            csrfPrevention: true,
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer }),
                ApolloServerPluginLandingPageLocalDefault({ embed: true })
            ]
        })

        await connectDB();
        await apolloServer.start()
        apolloServer.applyMiddleware({ app, path: '/graphql' })

        const PORT = process.env.PORT || 4000;

        await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));

        console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runApp()