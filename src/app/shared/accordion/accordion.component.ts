import { Component, Input, TemplateRef } from '@angular/core';
@Component({
  selector: 'app-table',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  dtOptions: DataTables.Settings = {};
  @Input() Page!: any;
  @Input() total!: any;
  @Input() tableName!: any;
  @Input() tableData!: any;
  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10, // Adjust as needed
      serverSide: false, // Set to true if using server-side processing
      processing: true,
      responsive: true,
      // ...add more options as needed
    };
  }
}
