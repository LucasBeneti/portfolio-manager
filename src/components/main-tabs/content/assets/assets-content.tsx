import DemoPage from "@/components/assets-table/page";
import { AssetDialog } from "./asset-dialog";
import { Button } from "@/components/ui/button";
import { useNewAssetDialog } from "@/hooks/use-new-asset-dialog";
import { CustomDialog } from "@/components/custom-dialog/custom-dialog";
import * as React from "react";

export function AssetsContent() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <section className="flex justify-between items-center">
        <p className="dark:text-white">Seus ativos:</p>
        <Button onClick={() => setIsDialogOpen(true)}>adicionar ativo</Button>
      </section>
      <CustomDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="asset dialog"
      />
      <DemoPage />
    </>
  );
}
