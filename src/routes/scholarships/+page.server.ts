import { supabase } from '$lib/supabaseClient';
import type { ScholarshipDTO } from '$lib/scripts/scholarships';
import type { Actions } from './$types';

export const load = async () => {
  const { data, error } = await supabase.from('scholarships').select<'scholarships', ScholarshipDTO>().limit(5);
  if (error) {
    console.error('Error loading scholarships:', error.message);
    return { scholarships: [] };
  }
  return { scholarships: data ?? [] }
}

export const actions = async (data: ScholarshipDTO[]) => {
  const { data: newData, error } = await supabase.from('scharships').select<'scholarships', ScholarshipDTO>().limit(5)
  if (error) {
    console.error('Error loading scholarships:', error.message);
    return { data };
  }
  return { newData } }


