export default function ErrorBlock({ errorCode, errorMessage }) {
  return (
    <div
      className="col-md-8 mb-3 text-center p-2 bg-danger text-white"
      style={{ display: errorCode ? "" : "none" }}
    >
      {errorCode} - {errorMessage}
    </div>
  );
}
