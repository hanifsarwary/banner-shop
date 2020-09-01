import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderHtmlPipe } from './render-html.pipe';



@NgModule({
  declarations: [RenderHtmlPipe],
  imports: [
    CommonModule
  ],
  exports: [RenderHtmlPipe]
})
export class RenderHtmlModule { }
