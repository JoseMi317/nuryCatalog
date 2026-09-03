import type { SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';

let clientPromise: Promise<SupabaseClient> | null = null;

export function getSupabaseClient(): Promise<SupabaseClient> {
  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(environment.supabaseUrl, environment.supabasePublishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }),
  );

  return clientPromise;
}
