export default function Spinner({ loading }) {
  return (
    <div className="spinner-wrapper" style={{ display: loading ? "" : "none" }}>
      <div className="spinner text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden ">Loading...</span>
        </div>
      </div>
    </div>
  );
}
