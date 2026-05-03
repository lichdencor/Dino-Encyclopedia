import { createClient } from "@supabase/supabase-js";

// --- Supabase (BaaS) comentado para build solo front; descomentá para usar proyecto real ---
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente dummy: no hay llamadas a useSupabaseClient en la app; evita crash si faltan env vars.
export const supabase = createClient(
  "https://placeholder.local",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder",
);
