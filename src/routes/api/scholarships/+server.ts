import { supabase } from '$lib/supabaseClient'
import type { ScholarshipDTO } from '$lib/scripts/scholarships'
import { json } from '@sveltejs/kit'

const PAGE_SIZE = 5

export const GET = async ({ url }) => {
  const page = Number(url.searchParams.get('page') ?? 1)
  const from = page * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error } = await supabase
    .from('scholarships')
    .select('*')
    .order('deadline', { ascending: true })
    .range(from, to)

  if (error) return json({ more: [] }, { status: 500 })
  return json({ more: data as ScholarshipDTO[] })
}