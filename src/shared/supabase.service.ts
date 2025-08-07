import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { EnvService } from '../env/env.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor(private readonly envService: EnvService) {
    this.supabase = createClient(
      this.envService.get<string>('SUPABASE_URL')!,
      this.envService.get<string>('SUPABASE_ANON_KEY')!,
    );
  }

  async uploadImage(
    base64: string,
    folder = 'complaints',
  ): Promise<string | null> {
    const fileName = `${folder}/${uuid()}.jpg`;
    const buffer = Buffer.from(base64, 'base64');

    const { error } = await this.supabase.storage
      .from('nagorik-awaj')
      .upload(fileName, buffer, {
        contentType: 'image/jpeg',
      });

    if (error) {
      console.error('Upload error:', error.message);
      return null;
    }

    const { data } = this.supabase.storage
      .from('nagorik-awaj')
      .getPublicUrl(fileName);

    return data?.publicUrl ?? null;
  }

  public async sendNotification(
    event: string,
    message: string | Record<string, unknown>,
  ) {
    const channel = this.supabase.channel('notification');
    try {
      await channel.send({
        type: 'broadcast',
        event: event,
        payload: {
          message: message,
        },
      });
    } catch (err) {
      console.log('error', err);
    }
  }
}
