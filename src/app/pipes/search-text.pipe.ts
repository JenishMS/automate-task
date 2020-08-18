import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {}

  transform(text: string, searchText: string): string {
    if(searchText != ''){
      let textArr = text.split(searchText);
      if(textArr.length > 0){
        let finalText: SafeHtml = textArr.join('<span style="color: orange">'+ searchText +'</span>');
        return this.sanitized.bypassSecurityTrustHtml(finalText);
      }else{
        return text;
      }
    }else{
      return text;
    }
  }

}
