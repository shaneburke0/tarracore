import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Product {
  readonly id: string;
  readonly categories: (string | null)[];
  readonly price: number;
  readonly name: string;
  readonly image: string;
  readonly description: string;
  readonly currentInventory: number;
  readonly maxInventory: number;
  readonly brand?: string;
  readonly intro?: string;
  readonly sold?: boolean;
  readonly endDate?: string;
  readonly question?: string;
  readonly options?: (string | null)[];
  readonly answer?: string;
  readonly gallery?: (string | null)[];
  constructor(init: ModelInit<Product>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}