import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAssetsActions } from "@/hooks/use-assets-actions";
import { type AssetData } from "../main-tabs/content/assets/asset-dialog";
import { CategoryBadge } from "../category-badge/category-badge";
import type { Category } from "../interfaces/category";

export const columns: ColumnDef<AssetData>[] = [
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.getValue("category") as Category;

      return <CategoryBadge name={category} />;
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "currentValue",
    header: () => <div className="text-right">Valor atual</div>,
    cell: ({ row }) => {
      const currentValue = parseFloat(row.getValue("currentValue"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(currentValue);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Quantidade</div>,
    cell: ({ row }) => {
      const currentValue = parseFloat(row.getValue("quantity"));

      return <div className="text-right font-medium">{currentValue}</div>;
    },
  },
  {
    accessorKey: "grade",
    header: () => <div className="text-right">Nota</div>,
    cell: ({ row }) => {
      const grade = parseFloat(row.getValue("grade"));

      return <div className="text-right font-medium">{grade}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const asset = row.original;
      const { handleDeleteAsset, handleEditAsset } = useAssetsActions();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEditAsset(asset)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDeleteAsset}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
