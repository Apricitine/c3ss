import { supabase } from '$lib/supabaseClient';
import type { SummerDTO } from '$lib/scripts/summerprograms';

export const load = async () => {
  const { data, error } = await supabase.from('summerprograms').select<'summerprograms', SummerDTO>();
  if (error) {
    console.error('Error loading summer programs:', error.message);
    return { summers: [] };
  }
  return { summers: data ?? [] }
}
