export default function Pagination({ meta, onPage }) {
  if (!meta || meta.totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button className="btn btn-outline" disabled={meta.page <= 1} onClick={() => onPage(meta.page - 1)}>
        Prev
      </button>
      <span>
        Page {meta.page} / {meta.totalPages} ({meta.total} items)
      </span>
      <button
        className="btn btn-outline"
        disabled={meta.page >= meta.totalPages}
        onClick={() => onPage(meta.page + 1)}
      >
        Next
      </button>
    </div>
  );
}
