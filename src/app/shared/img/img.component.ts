import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  defaultImage: string = 'assets/images/imageLoader.gif';
  @Input() src!: string;
  @Input() alt!: string;
  @Input() classes!: string;
  @Input() ids!: string;
  @Input() styles!: { [key: string]: string };
}
