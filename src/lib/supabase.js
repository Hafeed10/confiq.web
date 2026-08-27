import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://olminrbtsrtuexkiosvz.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_kjIPXCXtE9gsYL7j9A-kEw_tFHcTzuf';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


