import { useEffect, useState } from 'react';

interface Plan {
  id: string;
  name: string;
  priceMonthlyUsd: number;
  downMbps: number;
  upMbps: number;
  dataCapGb: number;
  description: string;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/plans').then(r => r.json()).then(d => {
      setPlans(d.plans || []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="muted">Loading plans…</p>;

  return (
    <div className="grid cols-3">
      {plans.map(p => (
        <div key={p.id} className="card">
          <h3>{p.name}</h3>
          <p className="muted">{p.description}</p>
          <p><strong>${p.priceMonthlyUsd.toFixed(2)}</strong>/mo</p>
          <p>{p.downMbps}↓ / {p.upMbps}↑ Mbps</p>
          <p>{p.dataCapGb} GB monthly data</p>
          <button className="button">Get started</button>
        </div>
      ))}
    </div>
  );
}