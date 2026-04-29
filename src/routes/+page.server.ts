/*
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
*/


import { supabase } from '$lib/supabaseClient';


type Scholarship = {
  id: number
  name: string
  created: string
  description: string
  deadline: string
  primary_link: string
  filters: { filters: [] }
}

export const load = async () => {
  const { data, error } = await supabase.from('scholarships').select<'scholarships', Scholarship>();
  if (error) {
    console.error('Error loading scholarships:', error.message);
    return { scholarships: [] };
  }
  return { scholarships: data ?? [] }
}
