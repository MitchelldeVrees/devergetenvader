import { book } from "./site";
export function calculateTotal(quantity: number) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10)
    throw new Error("Invalid quantity");
  return book.paperbackPrice * quantity + book.shipping.price;
}
