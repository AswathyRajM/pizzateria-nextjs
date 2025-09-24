import { AddonType } from "@/helpers/types";

interface AddOnProductType {
  addons?: AddonType[];
}
export const productAddonFormat = (addons: AddOnProductType[]) => {
  return addons?.map((addon: any) => addon?.addons);
};
