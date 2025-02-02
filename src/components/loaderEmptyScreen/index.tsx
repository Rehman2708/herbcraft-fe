import "./style.scss";

export const LoaderEmptyState = ({
  length = 0,
  loading = false,
  text,
}: {
  length?: number;
  loading?: boolean;
  text?: string;
}) => {
  return (
    <div className="center">
      {loading ? (
        <div className="loader"></div>
      ) : length < 1 ? (
        <p className="noDataText">{text ?? "No data"}</p>
      ) : (
        ""
      )}
    </div>
  );
};
