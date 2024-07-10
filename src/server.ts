import fastify from "fastify";
import createTrip from "./routes/create-trip";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import cors from "@fastify/cors";
import confirmTrip from "./routes/confirm-trip";
import confirmParticipant from "./routes/confirm-participant";
import createActivity from "./routes/create-activity";
import getActivities from "./routes/get-activities";
import createLink from "./routes/create-link";
import getLinks from "./routes/get-links";
import getParticipants from "./routes/get-participants";
import createInvite from "./routes/create-invite";
import updateTrip from "./routes/update-trip";
import getTripDetails from "./routes/get-trip-details";
import getParticipant from "./routes/get-participant";
import { env } from "./env";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
	origin: "*",
});
app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(createInvite);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);

app.listen({ port: env.PORT }).then(() => {
	console.log("Servidor Rodando na Porta 3333!");
});
