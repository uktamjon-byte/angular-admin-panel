import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SystemService } from '../../services/system.service';

export interface IPagination {
  page: number;
  active: boolean;
}


@Component({
  selector: 'app-role-pagination',
  templateUrl: './role-pagination.component.html',
  styleUrls: ['./role-pagination.component.scss']
})
export class RolePaginationComponent implements OnInit,OnChanges {
  @Input() totalAmount: number = 0;
  @Output() changePage = new EventEmitter();
  @Input() currentPage:number = 1;

  listPaging:IPagination[] = [];
  pageLimit:number = 10;
 
  constructor() { }


  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    console.log('total amount', this.totalAmount);
    if (changes.totalAmount) {
      if (!changes.totalAmount.firstChange) {
        this.totalAmount = changes.totalAmount.currentValue;      
        this.fillPage();
      }
    }
  }

    ngOnInit(): void {
      console.log('total amount INIT', this.totalAmount);
    // window.setTimeout(()=>{
        this.fillPage();
      // console.log('total am', this.totalAmount);
        console.log('total page', this.calculateTotalPageNumber());
    // },5000)
    
    }

    calculateTotalPageNumber(){
      
        let totalPage:number = Math.trunc(this.totalAmount/this.pageLimit);
        console.log('math trunc', totalPage)
        if(totalPage < 1){
            totalPage += 1;
            console.log('if')
            
        }else if(this.totalAmount % 10 !== 0){
          totalPage += 1;
          console.log('else if')
        }
        
        return totalPage;
    
    }

    goToPage(i:any){
      console.log('item', i)
      this.listPaging.forEach((item) => item.active = false)
      this.listPaging[i].active = true;
      console.log('paging', this.listPaging)
      this.emitPage()
    }

    fillPage(){
      this.listPaging = [];
      for(let i = 1; i <=  this.calculateTotalPageNumber(); i++ ){
        console.log('qqqq');
        this.listPaging.push({
          page: i,
          active: i == this.currentPage
        });
      }
    }

    prev(){
      let activeIndex:any = this.listPaging.findIndex((activeItem)=> activeItem.active===true);
      if(activeIndex-1 >= 0 ) this.goToPage(activeIndex-1);
    }

    next(){
      let activeIndex:any = this.listPaging.findIndex((activeItem)=> activeItem.active===true);
      if(activeIndex+1 <= this.listPaging.length - 1 ) this.goToPage(activeIndex+1);
    }

    emitPage(){
      const activePage:any = this.listPaging.find((item)=> item.active === true)?.page;
      this.currentPage = activePage;
      this.changePage.emit(activePage);
    }

   

}
