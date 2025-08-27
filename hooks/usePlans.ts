'use client';

import { useEffect, useState } from 'react';
import { supabase, Plan } from '@/lib/supabase';

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from<Plan>('plans')
        .select('*')
        .order('price');
      if (!error && data) {
        setPlans(data);
      }
      setLoading(false);
    };

    fetchPlans();
  }, []);

  return { plans, loading };
}
