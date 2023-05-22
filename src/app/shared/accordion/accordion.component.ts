import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() Page!: any;
  @Input() total!: any;
  @Input() tableName!: any;
  @Input() tableData!: any;
}
