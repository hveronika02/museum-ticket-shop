import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Ticket } from 'src/app/shared/models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();

  constructor() { }

  addToCart(ticket: Ticket): void {
    let cartItem = this.cart.items.find(item => item.ticket.id === ticket.id);
    if (cartItem) {
      // Ha már van ilyen jegy, frissítjük a mennyiséget
      this.changeQuantity(ticket.id, cartItem.quantity + 1);
    } else {
      // Ha új jegy, hozzáadjuk a kosárhoz
      this.cart.addItem(new CartItem(ticket));
    }
  }

  removeFromCart(ticketId: string): void {
    this.cart.removeItem(ticketId);
  }

  changeQuantity(ticketId: string, quantity: number): void {
    this.cart.updateQuantity(ticketId, quantity);
  }

  getCart(): Cart {
    return this.cart;
  }
}
