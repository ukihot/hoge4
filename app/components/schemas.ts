import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

const playerNameSchema = z
  .string()
  .regex(/^[a-zA-Z\s]*$/, {
    message: 'Username must contain only letters and spaces.',
  })
  .max(26, {
    message: 'Username must be at most 26 characters.',
  })
  .min(2, {
    message: 'Username must be at least 2 characters.',
  })
  .transform((v) => v.toUpperCase());

const playerSchema = z.object({
  id: z.string().uuid(),
  playerName: playerNameSchema,
  height: z.preprocess(
    (v) => Number(v),
    z
      .number()
      .min(90, {
        message: 'Height must be between 90 and 251.',
      })
      .max(251, {
        message: 'Height must be between 90 and 251.',
      })
  ),
  weight: z.preprocess(
    (v) => Number(v),
    z
      .number()
      .min(40, {
        message: 'Weight must be between 40 and 85.',
      })
      .max(85, {
        message: 'Weight must be between 40 and 85.',
      })
  ),
  jerseyNumber: z.preprocess(
    (v) => Number(v),
    z
      .number()
      .min(0, {
        message: 'Jersey number must be between 0 and 999.',
      })
      .max(999, {
        message: 'Jersey number must be between 0 and 999.',
      })
  ),
});

const matchEventSchema = z.object({
  eventId: z.string().uuid(),
  raiderId: z.string().uuid(),
  occurredAt: z.string().regex(/^\d+:\d+$/, {
    message: 'OccurredAt must be in the format of minutes:seconds.',
  }),
  raidDuration: z.preprocess(
    (v) => Number(v),
    z
      .number()
      .int()
      .min(0, { message: 'Raid duration must be between 0 and 30 seconds.' })
      .max(30, { message: 'Raid duration must be between 0 and 30 seconds.' })
  ),
  scoreBefore: z.preprocess((v) => Number(v), z.number().int()),
  emptyCount: z.preprocess(
    (v) => Number(v),
    z
      .number()
      .int()
      .min(0, { message: 'Empty count must be 0, 1, or 2.' })
      .max(2, { message: 'Empty count must be 0, 1, or 2.' })
  ),
  opponentsCount: z.preprocess(
    (v) => Number(v),
    z
      .number()
      .int()
      .min(1, { message: 'Opponents count must be between 1 and 7.' })
      .max(7, { message: 'Opponents count must be between 1 and 7.' })
  ),
  isSuccess: z.boolean(),
  pointGained: z.preprocess((v) => Number(v), z.number().int()),
  pointLost: z.preprocess((v) => Number(v), z.number().int()),
});

const formSchema = z.object({
  dog_team_name: z.string().min(2, {
    message: 'Team name must be at least 2 characters.',
  }),
  cat_team_name: z.string().min(2, {
    message: 'Team name must be at least 2 characters.',
  }),
  dog_players: z.array(playerSchema),
  cat_players: z.array(playerSchema),
});

export type TeamSchemaType = z.infer<typeof formSchema>;

export const PlayerDefaultValue = {
  id: uuidv4(),
  playerName: '',
  height: 0,
  weight: 0,
  jerseyNumber: 0,
};

export type PlayerSchemaType = z.infer<typeof playerSchema>;

export const TeamDefaultValue = {
  dog_team_name: '',
  cat_team_name: '',
  dog_players: [PlayerDefaultValue],
  cat_players: [PlayerDefaultValue],
};

export type MatchEventSchemaType = z.infer<typeof matchEventSchema>;

export const MatchEventDefaultValue = {
  eventId: uuidv4(),
  raiderId: uuidv4(),
  occurredAt: '0:0',
  raidDuration: 0,
  scoreBefore: 0,
  emptyCount: 0,
  opponentsCount: 7,
  isSuccess: false,
  pointGained: 0,
  pointLost: 0,
};
