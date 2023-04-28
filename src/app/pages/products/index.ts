export type Discount = {
  percent: number;
  quantity: number;
}

export type Product = {
  id: number;
  name: string;
  price: number;
  discount: Discount[];
}

export type LineItem = {
  id: number;
  product: Product;
  quantity: number
}

interface Order {
  order: LineItem[];
}

export class OrderService implements Order {
  order: LineItem[] = [];

  constructor(data: LineItem[]) {
    this.order = [...data];
  }

  getOrder() {
    return this.order;
  }

  getLineItem(id: number) {
    return this.order.find((item: LineItem) => item.id === id);
  }

  addLineItem(lineItem: LineItem) {
    this.order.push(lineItem);
  }

  removeLineItem(id: number) {
    this.order = this.order.filter((item: LineItem) => item.id !== id );
  }

  removeOrder() {
    this.order = [];
  }

  getLineItemDiscount(lineItem: LineItem) {
    let discountMax = 0;
    lineItem.product.discount.forEach((discount: Discount) => {
      if (lineItem.quantity >= discount.quantity && discount.percent > discountMax) {
        discountMax = discount.percent;
      }
    });
    return discountMax;
  }

  getTotalPayment() {
    return this.order.reduce((sum, lineItem: LineItem) => {
      const discount = this.getLineItemDiscount(lineItem);
      return sum + lineItem.product.price * lineItem.quantity * (100 - discount) / 100;
    }, 0);
  }
}
