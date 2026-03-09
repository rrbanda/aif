import { useState, useEffect, useCallback } from "react";
import { api } from "../lib/api";
import type {
  CustomerSummary,
  CustomerAccount,
  ModelRecord,
  UseCaseRecord,
  MetricsEntry,
  DeliverableSummary,
} from "../types/customer-data";
import type { PersonasConfig } from "../types/agent";

export function useCustomers() {
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setLoading(true);
    api
      .get<{ customers: CustomerSummary[] }>("/data/customers")
      .then((d) => setCustomers(d.customers))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { customers, loading, error, refresh };
}

export function useCustomerAccount(customerId: string | undefined) {
  const [data, setData] = useState<CustomerAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) { setLoading(false); return; }
    setLoading(true);
    api
      .get<CustomerAccount>(`/data/customers/${customerId}`)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [customerId]);

  return { data, loading, error };
}

export function useCustomerModels(customerId: string | undefined) {
  const [models, setModels] = useState<ModelRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    if (!customerId) { setLoading(false); return; }
    setLoading(true);
    api
      .get<{ models: ModelRecord[] }>(`/data/customers/${customerId}/models`)
      .then((d) => setModels(d.models))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [customerId]);

  useEffect(() => { refresh(); }, [refresh]);

  return { models, loading, error, refresh };
}

export function useCustomerPortfolio(customerId: string | undefined) {
  const [useCases, setUseCases] = useState<UseCaseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    if (!customerId) { setLoading(false); return; }
    setLoading(true);
    api
      .get<{ use_cases: UseCaseRecord[] }>(`/data/customers/${customerId}/portfolio`)
      .then((d) => setUseCases(d.use_cases))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [customerId]);

  useEffect(() => { refresh(); }, [refresh]);

  return { useCases, loading, error, refresh };
}

export function useModelMetrics(
  customerId: string | undefined,
  modelId: string | undefined
) {
  const [metrics, setMetrics] = useState<MetricsEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerId || !modelId) { setLoading(false); return; }
    setLoading(true);
    api
      .get<MetricsEntry>(`/data/customers/${customerId}/metrics/${modelId}`)
      .then(setMetrics)
      .catch(() => setMetrics(null))
      .finally(() => setLoading(false));
  }, [customerId, modelId]);

  return { metrics, loading };
}

export function useDeliverables(customerId: string | undefined) {
  const [deliverables, setDeliverables] = useState<DeliverableSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerId) { setLoading(false); return; }
    setLoading(true);
    api
      .get<{ deliverables: DeliverableSummary[] }>(`/data/customers/${customerId}/deliverables`)
      .then((d) => setDeliverables(d.deliverables))
      .catch(() => setDeliverables([]))
      .finally(() => setLoading(false));
  }, [customerId]);

  return { deliverables, loading };
}

export function usePersonas() {
  const [personas, setPersonas] = useState<PersonasConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<PersonasConfig>("/data/personas")
      .then(setPersonas)
      .catch(() => setPersonas(null))
      .finally(() => setLoading(false));
  }, []);

  return { personas, loading };
}
