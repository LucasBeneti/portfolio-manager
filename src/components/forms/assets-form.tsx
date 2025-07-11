import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { CategorySelect } from "./category-select/category-select";

const formSchema = z.object({
  category: z.string(),
  name: z.string().min(2).max(40),
  quantity: z.number(),
  currentValue: z.number(),
  grade: z.number(),
});

export function AssetsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      name: "",
      quantity: 0,
      currentValue: 0,
      grade: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 dark">
        <section className="flex flex-col gap-4">
          <section className="flex gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="dark:text-white">Categoria</FormLabel>
                  <FormControl>
                    <CategorySelect field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="CDB CDI% BTG Pactual" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className="flex gap-4">
            <FormField
              control={form.control}
              name="currentValue"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel>Valor Atual</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      {...form.register("currentValue", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      {...form.register("quantity", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel>Nota</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      {...form.register("grade", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        </section>
        <DialogFooter className="sm:justify-between mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
