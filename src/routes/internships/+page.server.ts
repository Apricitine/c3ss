import { supabase } from '$lib/supabaseClient';


type Internship = {
  id: number
  name: string
  created: string
  description: string
  deadline: string
  primary_link: string
  filters: { filters: [] }
}

export const load = async () => {
  const { data, error } = await supabase.from('internships').select<'internships', Internship>();
  if (error) {
    console.error('Error loading internships:', error.message);
    return { scholarships: [] };
  }
  return { scholarships: data ?? [] }
}