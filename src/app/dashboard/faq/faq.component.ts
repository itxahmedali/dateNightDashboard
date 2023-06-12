import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HelperService } from 'src/app/services/helper.service';
import { Faq } from 'src/classes';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  public Editor = ClassicEditor;
  constructor(private fb: FormBuilder,
  private modalService: NgbModal, private helper:HelperService) { }
  public searchInput!: any;
  public duePage!: any;
  public total!: any;
  public selectedSort!: any;
  public faqs: any;

  public modalReference: any;
  public faqForm: any = this.fb.group({
    question: [null, Validators.required],
    answer: [null, Validators.required],
  });
  ngOnInit(){
    this.getFaqs()
  }
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
  save(){
    console.log(this.faqForm);
  }
  async getFaqs() {
    await this.helper.getFaqs()?.then((faq: Faq) => {
      this.faqs = faq;
    });
  }
}
