import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bfivirozrihywppizaqv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YAXxuGdO0Yn0zM4yOJty9g_ugcFcvxr';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
