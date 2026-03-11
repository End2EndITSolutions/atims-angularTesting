import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'app-parent-component',
    templateUrl: './parent-component.component.html',
    styleUrls: ['./parent-component.component.css'],
    standalone: false
})
export class ParentComponentComponent implements OnInit {
  message: string = "";
  showChildComponent: boolean = false;

  constructor(private vcref: ViewContainerRef, private cfr: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  async loadLazyComponent(){
    this.vcref.clear();
    const { LazythingComponent } = await import('../lazy-thing/lazything.component');
    // Angular V <13
    // let greetcomp = this.vcref.createComponent(
    //   this.cfr.resolveComponentFactory(GreetComponent)
    // );

    // Angular v. >=13
    let greetcomp = this.vcref.createComponent(LazythingComponent);
    greetcomp.instance.childMessage = "Message from parent.";
    greetcomp.instance.sendMessageEvent.subscribe(data=>{ 
      this.message = data
    })
  }

  onChange(event: any){
    this.message = event.target.value;
  }
  toggleComponent(){
    this.showChildComponent = !this.showChildComponent;
  }

  resetMessage(event: any){
    this.message = event
  }

}
