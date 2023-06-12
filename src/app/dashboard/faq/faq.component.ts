import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  constructor(private fb: FormBuilder,
    private modalService: NgbModal) { }
  public searchInput!: any;
  public duePage!: any;
  public total!: any;
  public selectedSort!: any;
  public faqs: any;

  public modalReference: any;
  public faqUserForm: any = this.fb.group({
    id: [null, Validators.required],
    question: [null, Validators.required],
    answer: [null, Validators.required],
  });
  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
  }
  proceed() {
    this.modalReference.close();
  }
}
