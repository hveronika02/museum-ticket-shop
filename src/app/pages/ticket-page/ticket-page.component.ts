import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../shared/models/Ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TicketService } from '../../services/ticket/ticket.service';
import { CartService } from '../../services/cart/cart.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit  {

  ticket!: Ticket;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private cartService: CartService,
    private router: Router
  ) {}

  addToCart() {
    this.cartService.addToCart(this.ticket);
    this.router.navigateByUrl('/cart-page');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        const id = params['id'];
        this.ticketService.getTicketById(id).subscribe(ticket => {
          if (ticket) {
            this.ticket = ticket;
          } else {
            this.router.navigateByUrl('/not-found');
          }
        });
      }
    });
  }
}
