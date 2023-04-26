import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(data: any[], selectedSort: string): any[] {
    if (!data || !selectedSort) {
      return data;
    }
    console.log(data, selectedSort);

    switch (selectedSort) {
      case 'name': {
        return data?.sort((a, b) => {
          const nameA = a?.user?.name;
          const nameB = b?.user?.name;
          return nameA?.localeCompare(nameB) || a?.name?.localeCompare(b?.name) || a?.item?.name?.localeCompare(b?.item?.name) || a?.description?.localeCompare(b?.description);
        });
      }
      case 'date': {
        return data?.sort((a, b) => {
          const originaldateA = new Date(a?.date)?.getTime();
          const originaldateB = new Date(b?.date)?.getTime();
          const dateA = new Date(a?.created_at)?.getTime();
          const dateB = new Date(b?.created_at)?.getTime();
          const joiningA = new Date(a?.joining_date)?.getTime();
          const joiningB = new Date(b?.joining_date)?.getTime();
          const createdAtA = new Date(a?.user?.created_at)?.getTime();
          const createdAtB = new Date(b?.user?.created_at)?.getTime();
          const itemDateA = new Date(a?.item?.created_at)?.getTime();
          const itemDateB = new Date(b?.item?.created_at)?.getTime();
          return dateA - dateB || joiningA - joiningB || createdAtA - createdAtB || itemDateA - itemDateB || originaldateA - originaldateB;
        });
      }
      default: {
        return data;
      }
    }
  }
}
