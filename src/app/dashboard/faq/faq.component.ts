import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HelperService } from 'src/app/services/helper.service';
import { Faq } from 'src/classes';
import { HttpService } from 'src/app/services/http.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  public Editor = ClassicEditor;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private helper: HelperService,
    private http: HttpService,
    private toaster: ToastrService
  ) {}
  public searchInput!: any;
  public duePage!: any;
  public total!: any;
  public selectedSort!: any;
  public faqs: any;
  public selectedFaq: any;
  public modalReference: any;
  public state: boolean = false;
  public faqForm: any = this.fb.group({
    heading: [null, Validators.required],
    paragraph: [null, Validators.required],
    position: [null],
  });
  ngOnInit() {
    this.getFaqs();
  }
  open(content: any, state: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;
    if (state == 'edit') {
      const { id, heading, paragraph, position } = this.selectedFaq || {};
      this.faqForm.addControl('id', new FormControl(id));
      this.faqForm.patchValue({
        ...this.faqForm.value,
        heading,
        paragraph,
        position,
      });
    }
  }
  proceed() {
    this.modalReference.close();
    this.faqForm.reset();
  }
  save(modal: boolean) {
    console.log(this.state);
    
    if(!this.state){
      this.faqForm.patchValue({
        ...this.faqForm.value,
        position: this.faqs?.length + 1,
      });
    }
    this.http
      .loaderPost('faq-add', this.faqForm.value, true)
      .pipe(
        tap((res: any) => {
          this.toaster.success(res?.message ?? res?.messsage);
        })
      )
      .subscribe({
        next: () => {
          if (modal) {
            this.proceed();
          }
          this.faqForm.reset();
        },
        complete: () => {
          this.helper.setFaqs();
          this.getFaqs();
          this.faqForm.removeControl('id');
          this.faqForm.removeControl('active_status');
          this.state = false
        },
      });
  }
  async getFaqs() {
    await this.helper.getFaqs()?.then((faq: Faq) => {
      this.faqs = faq;
      console.log(faq);
      this.faqs = this.sortArrayByPosition(this.faqs);
    });
  }
  async stateItem(event: any, data: any) {
    this.selectedFaq = this.faqs?.find((e: any) => e?.id == event.id);
    if (this.selectedFaq) {
      const { id, heading, paragraph } = this.selectedFaq || {};
      this.faqForm.patchValue({
        ...this.faqForm.value,
        heading,
        paragraph,
      });
      this.faqForm.addControl('id', new FormControl(id));
      this.faqForm.addControl(
        'active_status',
        new FormControl(data.target.checked ? 1 : 0)
      );
    }
    this.save(false);
  }
  delete(id: any) {
    this.http.loaderGet(`faq-delete/${id}`, true).subscribe((res: any) => {
      this.helper.setFaqs();
      this.getFaqs();
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.faqs, event.previousIndex, event.currentIndex);
    const { id, heading, paragraph, active_status } = this.selectedFaq || {};
    console.log(id);
    const data = {
      id,
      current: event.currentIndex,
      previous: event.previousIndex,
    };
    this.changePosition(data);
  }
  changePosition(data: any) {
    this.http.loaderPost('faq-position', data, true).subscribe((res: any) => {
      console.log(res);
      this.helper.setFaqs();
      this.getFaqs();
    });
  }
  sortArrayByPosition(array: any[]): any[] {
    return array.sort((a, b) => {
      const positionA = parseInt(a.position);
      const positionB = parseInt(b.position);

      if (positionA < positionB) {
        return -1;
      } else if (positionA > positionB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
