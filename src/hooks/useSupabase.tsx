import { useState, useEffect } from "react";
import { supabase } from "../lib";

export function useSupabaseData(table: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from(table).select("*");
      if (error) {
        setError(error.message);
      } else {
        setData(data || []);
      }
      setLoading(false);
    }
    fetchData();
  }, [table]);

  return { data, loading, error };
}
