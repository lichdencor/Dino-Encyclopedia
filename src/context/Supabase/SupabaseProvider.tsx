import { SupabaseContext } from "./SupabaseContext";
import { supabase } from "../../lib";

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};
