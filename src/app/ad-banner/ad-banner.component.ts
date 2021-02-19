import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { AdItem } from '../ad-item';
import { AdDirective } from '../directive/ad.directive';
import { Ad } from '../interface/ad';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})
export class AdBannerComponent implements OnInit {

  @Input() ads: AdItem[];
  currentAdIndex = -1;
  @ViewChild(AdDirective, {static: true}) adDirective: AdDirective;
  interval: any;

  constructor(
    private componentFactoryResolver : ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  loadComponent(){
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem : AdItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver
                                  .resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<Ad>(componentFactory);
    componentRef.instance.data = adItem.data;
  }

  getAds(){
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }

}
