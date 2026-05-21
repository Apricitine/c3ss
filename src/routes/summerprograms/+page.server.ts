import { supabase } from '$lib/supabaseClient'
import type { SummerDTO } from '$lib/scripts/summerprograms'

const PAGE_SIZE = 5

export const load = async () => {
  const { data, error } = await supabase
    .from('internships')
    .select<'internships', SummerDTO>()
    .limit(PAGE_SIZE)
    .order('deadline', { ascending: true })

  if (error) {
    console.error('Error loading internships:', error.message)
    return { scholarships: [] }
  }

  return { scholarships: data ?? [] }
}