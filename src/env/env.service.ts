import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { type TEnvironmentVariables } from './env.module';

@Injectable()
export class EnvService extends ConfigService<TEnvironmentVariables> {}
