import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(data: any[], selectedSort: string): any[] {
    const filteredData = data?.filter(item => item?.categoryNames?.includes(selectedSort));
    console.log(filteredData);
    
    if (filteredData?.length == 0) {
      return [];
    }

    return filteredData?.sort((a, b) => {
      const nameA = a?.name;
      const nameB = b?.name;
      return nameA?.localeCompare(nameB);
    });
  }
}
