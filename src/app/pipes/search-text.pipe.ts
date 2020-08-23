import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { NOTE_CONST } from '../constants/note.constants';

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
    const checksearchText = searchText != '';
    if(checksearchText){
      let textArr = text.split(searchText);
      const checkArrayLength = textArr.length > 0;
      if(checkArrayLength){
        let finalText = textArr.join(NOTE_CONST.SPAN_TAG_OPEN+ searchText +NOTE_CONST.SPAN_TAG_CLOSE);
        return this.sanitized.bypassSecurityTrustHtml(finalText);
      }else{
        return text;
      }
    }else{
      return text;
    }
  }

}
