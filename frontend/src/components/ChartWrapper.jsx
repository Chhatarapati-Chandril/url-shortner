export default function ChartWrapper({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      {children}
    </div>
  );
}