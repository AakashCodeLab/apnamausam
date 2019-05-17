import { Component, Output, ViewChild, OnInit, EventEmitter, ElementRef, NgZone  } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
// import {} from 'googlemaps';


declare var $: any;

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  city = true;
  @ViewChild('search') public searchElement: ElementRef;
  @Output() messageEvent = new EventEmitter<any>();

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router) {}
requestObj = {
    lat: null,
    lng: null,
    weatherType: '',
    city: '',
    currentTime:new Date().toLocaleTimeString()
}



  ngOnInit() {
    console.log(this.router.url);
   
    /*
    $(document).ready(function(){
      // Call Geo Complete
      $("#address").geocomplete({details:"form#property"});
    });*/

  }

  emitLocationData(event, type) {
    if (type === 'city') {
      this.requestObj.weatherType = 'city';
      this.requestObj.city = event.target.value;
      delete this.requestObj.lat;
      delete this.requestObj.lng;
      this.messageEvent.emit(this.requestObj);
    } else {
      this.requestObj.weatherType = 'latlng';
      this.requestObj.lat = 19.22;
      this.requestObj.lng = 72.00;
      delete this.requestObj.city;
      this.messageEvent.emit(this.requestObj);
      this.mapsAPILoader.load().then(
        () => {
          /*  const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });

            autocomplete.addListener('place_changed', () => {
              this.ngZone.run(() => {
                const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                 this.requestObj.lat=place.geometry.location.lat();
                 this.requestObj.lng=place.geometry.location.lng();
                 this.requestObj.type='current';
                this.messageEvent.emit(this.requestObj);
                if (place.geometry === undefined || place.geometry === null ) {
                  console.log(place.geometry);
                  return;
                }
              });
            });*/
        }

      );
    }



  }

  type(typeofdata) {
    console.log(typeofdata);
    if (typeofdata === 'city') {
      this.city = true;
    } else {
      this.city = false;
    }
  }
}
