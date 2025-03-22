import { createContext, useContext } from "react";
import { supabase } from "../../lib";

export const SupabaseContext = createContext(supabase);

export const useSupabaseClient = () => useContext(SupabaseContext);
