import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function POST(request) {
  const { email, password } = await request.json()

  const { data, error } = await supabase
    .from('Users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single()

  if (data && !error) {
    const cookieStore = await cookies()
    cookieStore.set('session', 'true', { httpOnly: true })
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  }

  return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
}