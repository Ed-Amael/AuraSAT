export default function HomePage() {
  return (
    <div className="grid">
      <section className="card">
        <h1 className="section-title">Satellite internet for every corner</h1>
        <p className="muted">AuraSAT brings dependable satellite internet to rural communities—so you can work, learn, and connect wherever you live.</p>
      </section>
      <section className="grid cols-3">
        <div className="card">
          <h3>Check plans</h3>
          <p className="muted">Compare speed, data, and price to find the right fit.</p>
        </div>
        <div className="card">
          <h3>Government resources</h3>
          <p className="muted">See available programs and support for rural residents.</p>
        </div>
        <div className="card">
          <h3>Speed test</h3>
          <p className="muted">Measure your connection to identify bottlenecks.</p>
        </div>
      </section>
    </div>
  );
}