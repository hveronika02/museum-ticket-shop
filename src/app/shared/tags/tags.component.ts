import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../models/Tag';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input()
  ticketPageTags?: string[];

  @Input()
  justifyContent: string = 'center'

  tags?: Tag[];

  constructor(private TicketService: TicketService) { }

  ngOnInit(): void {
    this.tags = this.TicketService.getAllTags();
  }

}
