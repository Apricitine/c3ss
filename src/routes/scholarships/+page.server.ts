import { supabase } from '$lib/supabaseClient';
import type { ScholarshipDTO } from '$lib/scripts/scholarships';
import type { Actions } from './$types';

const PAGE_SIZE = 5

export const load = async () => {
  const { data, error } = await supabase.from('scholarships').select<'scholarships', ScholarshipDTO>().limit(PAGE_SIZE).order("deadline", { ascending: true });
  if (error) {
    console.error('Error loading scholarships:', error.message);
    return { scholarships: [] };
  }
  return { scholarships: data ?? [] }
}



export const actions: Actions = {
  loadMore: async ({ request }) => {
    const formData = await request.formData()
    const page = Number(formData.get("page") ?? 1)

    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data, error } = await supabase
      .from("scholarships")
      .select("*")
      .order("deadline", { ascending: true })
      .range(from, to)

    if (error) throw error

    return { more: data as ScholarshipDTO[] }
  },
}











// export const actions = {
// 	default: async ( data ) => {
// 		console.log("loading new data!")
//     const { data: newData, error } = await supabase.from('scharships').select<'scholarships', ScholarshipDTO>().limit(5)
//     if (error) {
//       console.error('Error loading scholarships:', error.message)
//     }
//     return { newData }
// 	}
// } satisfies Actions;




