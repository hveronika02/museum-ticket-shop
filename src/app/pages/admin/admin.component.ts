import { Component } from '@angular/core';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Ticket } from 'src/app/shared/models/Ticket';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  displayedColumns: string[] = ['name', 'price', 'actions'];
  dataSource: Ticket[] = [];
  selectedTicket: Ticket = new Ticket();
  updateDialog: boolean = false; 
  addDialog: boolean = false; 

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    console.log('ngOnInit triggered');
    this.ticketService.getAllTickets().subscribe(tickets => {
      console.log('Tickets from Firestore:', tickets);
      this.dataSource = tickets;
    });
  }

  deleteTicket(ticketId: string): void {
    this.ticketService.deleteTicket(ticketId)
      .then(() => {
        console.log('Ticket deleted successfully.');
      })
      .catch(error => {
        console.error(error);
      });
  }
  openUpdateDialog(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.updateDialog = true;

  }
  closeUpdateDialog(){
    this.updateDialog = false;
  }
  updateTicket(ticket: Ticket) {
    this.ticketService.updateTicket(ticket.id, ticket)
      .then(() => console.log(`Ticket with id ${ticket.id} updated successfully.`))
      .catch(error => console.log(`Error updating ticket: ${error}`));
      this.updateDialog = false;
  }
  openAddDialog(){
    this.selectedTicket = new Ticket();
    this.addDialog = true;
  }
  closeAddDialog(){
    this.addDialog = false;
  }
  addTicket():void {
    this.selectedTicket.imageUrl = 'tickets_image/not-found.jpg';
    this.selectedTicket.tags = [];
    const ticketData = Object.assign({}, this.selectedTicket); 
  
    this.ticketService.addTicket(ticketData)
      .then(() => {
        console.log('Ticket added successfully!');
        this.closeAddDialog();
      })
      .catch((error) => {
        console.error('Error adding ticket: ', error);
      });
  }
  
}
