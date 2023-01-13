export class CartItem {

  quantity?: number;
  price?: number;
  cartId?: number;
  productId?: number;

  public static createCartItemWithoutId(quantiy: number, price: number, cartId: number, productId: number): CartItem {
    const cartItem = new CartItem();
    cartItem.quantity = quantiy;
    cartItem.price = price;
    cartItem.cartId = cartId;
    cartItem.productId = productId;
    return cartItem;
  }
}
