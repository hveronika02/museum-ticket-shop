import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Ticket } from 'src/app/shared/models/Ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseTestService } from 'src/app/services/firebase-test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tickets: Ticket[] = [];
  testData: any[] = [];

  constructor(private router: Router, private ticketService: TicketService, private route: ActivatedRoute, private firebaseTestService: FirebaseTestService) {}

  ngOnInit(): void {
    this.firebaseTestService.getTestData().subscribe({
      next: data => {
        console.log('Data from Firestore:', data);
        this.testData = data;
      },
      error: err => {
        console.error('Failed to connect to Firebase:', err);
      }
    });

    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        const searchTerm = params['searchTerm'].toLowerCase();
        this.ticketService.getAllTicketsBySearchTerm(searchTerm).subscribe(tickets => {
          this.tickets = tickets; // imageUrl is already just a filename
          console.log(this.tickets);
        });
    
      } else if (params['tag']) {
        const tag = params['tag'];
        this.ticketService.getAllTicketsByTag(tag).subscribe(tickets => {
          this.tickets = tickets;
          console.log(this.tickets);
        });
    
      } else {
        this.ticketService.getAllTickets().subscribe(tickets => {
          this.tickets = tickets;
        });
      }
    });
  }

  goToTicket(id: string) {
    this.router.navigate(['/ticket', id]);
  }
}
