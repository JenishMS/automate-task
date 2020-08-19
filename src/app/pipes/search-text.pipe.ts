import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {}
  /**
   * get text and search text and check search text there or not
   * if its there change font color orange
   * @param {string} text
   * @param {string} searchText
   * @returns {SafeHtml}
   * @memberof SearchTextPipe
   */
  transform(text: string, searchText: string): SafeHtml {
    if(searchText != ''){
      let textArr = text.split(searchText);
      if(textArr.length > 0){
        let finalText = textArr.join('<span style="color: orange">'+ searchText +'</span>');
        return this.sanitized.bypassSecurityTrustHtml(finalText);
      }else{
        return text;
      }
    }else{
      return text;
    }
  }

}
