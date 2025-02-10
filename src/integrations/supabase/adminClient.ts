
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rizjgafyjuptieiqcwgr.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpempnYWZ5anVwdGllaXFjd2dyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTIwODgwNSwiZXhwIjoyMDU0Nzg0ODA1fQ.EPfqpdZ8ML195PRAzIcEiIPXQTSkDpcZ70-xJ0TEBfQ";

export const supabaseAdmin = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
