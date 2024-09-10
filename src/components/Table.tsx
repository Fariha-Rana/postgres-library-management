interface Props<T> {
  heading: string;
  tableHeadings: string[];
  tableBodyData: T[];
  renderRow: (item: T) => React.ReactNode;
}

function Table<T>({
  heading,
  tableHeadings,
  tableBodyData,
  renderRow,
}: Props<T>) {
  return (
    <section className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-semibold mb-4 ">{heading}</h2>
      <table className="text-gray-200 w-full ">
        <thead>
          <tr>
            {tableHeadings.map((heading: string, i: number) => (
              <th key={i} className="bg-gray-800">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBodyData.map((item, index) => (
            <tr key={index}>{renderRow(item)}</tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
