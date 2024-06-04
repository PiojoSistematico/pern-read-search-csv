import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CustomTableProps = {
  data: Record<string, string>[];
};

const CustomTable: React.FunctionComponent<CustomTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const columnNames = Object.keys(data[0]);

  return (
    <Table>
      <TableCaption>Yur CSV data</TableCaption>
      <TableHeader>
        <TableRow>
          {columnNames.map((columnName, index) => (
            <TableHead key={index} className="text-right">
              {columnName}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowindex) => (
          <TableRow key={rowindex}>
            {Object.values(row).map((cell) => (
              <TableCell className="text-right">{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
