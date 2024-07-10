import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { env } from "../env";

export default async function confirmParticipant(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/participants/:partcipantId/confirm",
		{
			schema: {
				params: z.object({
					participantId: z.string().uuid(),
				}),
			},
		},
		async (request, reply) => {
			const { participantId } = request.params;

			const participant = await prisma.participant.findUnique({
				where: { id: participantId },
			});

			if (!participant) {
				throw new Error("Participant Not Found!");
			}

			if (participant.is_confirmed) {
				return reply.redirect(
					`${env.CLIENT_BASE_URL}/trips/${participant.trip_id}`,
				);
			}

			await prisma.participant.update({
				where: { id: participantId },
				data: { is_confirmed: true },
			});

			return reply.redirect(
				`${env.CLIENT_BASE_URL}/trips/${participant.trip_id}`,
			);
		},
	);
}
