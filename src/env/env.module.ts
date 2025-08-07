import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvService } from './env.service';
import z from 'zod';

export const EnvironmentVariablesSchema = z.object({
  PORT: z.coerce.number().min(1024).readonly(),
  DATABASE_URL: z.string().min(4, 'DATABASE_URL can not be empty').readonly(),
  SUPABASE_URL: z.string().min(4, 'SUPABASE_URL can not be empty').readonly(),
  SUPABASE_ANON_KEY: z
    .string()
    .min(4, 'SUPABASE_ANON_KEY can not be empty')
    .readonly(),
});

export type TEnvironmentVariables = z.infer<typeof EnvironmentVariablesSchema>;

@Global()
@Module({
  providers: [EnvService],
  exports: [EnvService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [`.env`, `.env.local`],
      validate: (config) => {
        const parsed = EnvironmentVariablesSchema.parse(config);
        // This to make data types coerced
        return { ...config, ...parsed };
      },
    }),
  ],
})
export class EnvModule {}
