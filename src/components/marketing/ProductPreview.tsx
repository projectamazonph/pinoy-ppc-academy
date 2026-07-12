export function ProductPreview() {
  return (
    <div className="product-preview" aria-label="Student dashboard preview">
      <div className="preview-bar"><span>STUDENT CONSOLE / 001</span><strong>ONLINE</strong></div>
      <div className="preview-head">
        <div><small>Good evening, future operator</small><h3>Build proof one mission at a time.</h3></div>
        <b>00%</b>
      </div>
      <div className="preview-table">
        <div><span>Current path</span><strong>VA Career Starter</strong><em>ACTIVE</em></div>
        <div><span>Next lesson</span><strong>How Amazon work fits together</strong><em>12 MIN</em></div>
        <div><span>Practice mission</span><strong>Read a PPC performance table</strong><em>READY</em></div>
      </div>
      <div className="preview-progress"><div><span>Portfolio status</span><strong>0 of 6 proof items</strong></div><i /></div>
      <div className="preview-foot"><span>NO CLIENT ACCOUNT REQUIRED</span><span>RULE-BASED SCORING</span></div>
    </div>
  );
}
