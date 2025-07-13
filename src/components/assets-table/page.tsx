import { columns } from "./columns";
import { DataTable } from "./data-table";
import { type AssetData } from "../main-tabs/content/assets/asset-dialog";

function getData(): AssetData[] {
  return [
    {
      category: "fixed-income-br",
      name: "CDB CDI% BTG Pactual",
      quantity: 1,
      currentValue: 7923.33,
      grade: 7,
    },
    {
      category: "fixed-income-us",
      name: "CDB CDI% BTG Pactual",
      quantity: 1,
      currentValue: 7923.33,
      grade: 7,
    },
    {
      category: "stocks-br",
      name: "CDB CDI% BTG Pactual",
      quantity: 1,
      currentValue: 7923.33,
      grade: 7,
    },
    {
      category: "stocks-us",
      name: "CDB CDI% BTG Pactual",
      quantity: 1,
      currentValue: 7923.33,
      grade: 7,
    },
    {
      category: "fii",
      name: "CDB CDI% BTG Pactual",
      quantity: 1,
      currentValue: 7923.33,
      grade: 7,
    },
    {
      category: "crypto",
      name: "CDB CDI% BTG Pactual",
      quantity: 1,
      currentValue: 7923.33,
      grade: 7,
    },
  ];
}

export default function DemoPage() {
  const data = getData();

  return (
    <div className="dark dark:text-white container mx-auto py-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
