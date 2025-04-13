import { Ticket } from "./Ticket";

export class CartItem{
    constructor(ticket: Ticket){
        this.ticket = ticket;
    }
    id: number = 1;
    ticket: Ticket;
    quantity: number = 1;
    
    get price():number{
        return this.ticket.price * this.quantity;
    }

}