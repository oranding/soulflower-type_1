import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://aypsrllvjedkddpkugzq.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_9fyaKbQ9EytaGSTslMce1g_YM_UZxaL';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface BirthdayRecordPayload {
  birth_year: number;
  birth_month: number;
  birth_day: number;
  archetype_number: number;
  role: 'self' | 'partner';
}

/**
 * Saves calculated records to Supabase 'records' table asynchronously in the background.
 * Failures are logged to console without interfering with UI or throwing errors to user.
 */
export function saveRecordsInBackground(records: BirthdayRecordPayload[]): void {
  if (!records || records.length === 0) return;

  // Execute in background
  Promise.resolve().then(async () => {
    try {
      const { data, error } = await supabase.from('records').insert(records);
      if (error) {
        console.error('Supabase write error:', error.message, error);
      } else {
        // Optional debug logging in development
        if (import.meta.env.DEV) {
          console.debug('Successfully stored records in Supabase:', data);
        }
      }
    } catch (err) {
      console.error('Failed to write records to Supabase in background:', err);
    }
  });
}
