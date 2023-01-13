export class Orders {

  userId?: number;
  date?: number;
  cartId?: number;
  method?: string

  public static createOrderWithoutId(userId: number, date: number, cartId: number, method: string): Orders {
    const order = new Orders();
    order.userId = userId;
    order.date = date;
    order.cartId = cartId;
    order.method = method;
    return order;
  }
}
