import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cbdlxpunxwlsjizjwkax.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiZGx4cHVueHdsc2ppemp3a2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MDI0NjUsImV4cCI6MjA4ODM3ODQ2NX0.BqMteg4YySDbFYso7b-uzFaO68m6wu_SemMUTg8P_NQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
