import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchPortfolioData } from "@/lib/services";
import type { PortfolioData } from "@/types/portfolio";

interface UsePortfolioResult {
  readonly data: PortfolioData | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly refetch: () => Promise<void>;
}

export function usePortfolio(): UsePortfolioResult {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 📌 SWAP EASY POINT: sustituye fetchPortfolioData() por:
      // const response = await fetch('/api/portfolio').then(r => r.json());
      const response = await fetchPortfolioData();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.error ?? "No se pudo cargar el portfolio.");
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Error inesperado al cargar datos.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void execute();
  }, [execute]);

  const result = useMemo<UsePortfolioResult>(
    () => ({ data, loading, error, refetch: execute }),
    [data, loading, error, execute],
  );

  return result;
}
