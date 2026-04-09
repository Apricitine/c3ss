import { supabase } from '$lib/supabaseClient';
import type { ScholarshipDTO } from '$lib/scripts/scholarships';

export const load = async () => {
  const { data, error } = await supabase.from('scholarships').select<'scholarships', ScholarshipDTO>();
  if (error) {
    console.error('Error loading scholarships:', error.message);
    return { scholarships: [] };
  }
  return { scholarships: data ?? [] }
}
