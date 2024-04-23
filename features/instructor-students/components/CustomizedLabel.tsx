export const renderCustomizedLabel = (props: {
  x?: number | string | undefined;
  y?: number | string | undefined;
  value?: number | string | undefined;
}) => {
  const chartWidth = 400;
  const { y, value } = props;

  const yValue = (() => {
    if (typeof y === 'undefined') return 0;
    if (typeof y === 'string') {
      return parseInt(y);
    }
    return y;
  })();

  return (
    <text x={chartWidth - 30} y={yValue + 15} fill="#666" textAnchor="end">
      {`${value}％`}
    </text>
  );
};
