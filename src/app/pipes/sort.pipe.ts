import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(data: any[], selectedSort: string): any[] {
    console.log(selectedSort);

    if (!selectedSort) {
      return data; // Return the original data array as it is
    }

    const filteredData = data?.filter(item => item?.categoryNames?.includes(selectedSort));

    if (filteredData?.length === 0) {
      return []; // No matching category names found, return an empty array
    }

    return filteredData?.sort((a, b) => {
      const nameA = a?.name;
      const nameB = b?.name;
      return nameA?.localeCompare(nameB);
    });
  }
}
