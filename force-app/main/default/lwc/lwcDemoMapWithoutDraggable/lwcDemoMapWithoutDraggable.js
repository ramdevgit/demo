import { LightningElement, track } from 'lwc';
//import olaMarker from '@salesforce/resourceUrl/mapMarker';
//import SVG_LOGO from '@salesforce/resourceUrl/salesforceLogo';

export default class LwcDemoMapWithoutDraggable extends LightningElement {
    
    
    @track olaImage = olaMarker;
    //svgUrl = SVG_LOGO;
    mapOptions = {
        'disableDefaultUI': true, // when true disables Map|Satellite, +|- zoom buttons
        'draggable': false // when false prevents panning by dragging on the map
    };
    
      mapMarkers = [
        {   
          location: {
              City: 'San Francisco',
              Country: 'USA',
              PostalCode: '94105',
              State: 'CA',
              Street: '425 Mission St', 
          },
          mapIcon : {
              path:'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
              fillColor: '#CF3476',
              fillOpacity: .5,
              strokeWeight: 1,
              scale: .10,
          },
          title:'ABT Transport  Hub'
        },
        {
        location: {
            City: 'SOUTH SAN FRANCISCO',
            Country: 'USA',
            PostalCode: '94080',
            State: 'CA',
            Street: '2216  Carriage Court', 
        },
        mapIcon : {
            path:'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            fillColor: '#CF3476',
            fillOpacity: .5,
            strokeWeight: 1,
            scale: .10,
        },
        title:'ABT Transport  Hub'
     
        },
        {
            location: {
                City: ' SUSSEX ',
                Country: 'USA',
                PostalCode: '07461',
                State: 'NJ',
                Street: '961  Pearcy Avenue', 
            },
            mapIcon : {
                path:'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                fillColor: '#CF3476',
                fillOpacity: .5,
                strokeWeight: 1,
                scale: .10,
            },
            title:'ABT Transport  Hub'
        },
        {
            location: {
                City: ' New York ',
                Country: 'USA',
                PostalCode: '10011',
                State: 'NY',
                Street: '3444  Grove Street', 
            },
            mapIcon : {
                path:'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                fillColor: '#CF3476',
                fillOpacity: .5,
                strokeWeight: 1,
                scale: .10,
            },
            title:'ABT Transport  Hub'
          
        },
        {
            location: {
                    City: 'Seattle',
                    Country: 'USA',
                    PostalCode: '98155',
                    State: 'Washington',
                    Street: '2877  University Street', 
                },
                mapIcon : {
                    path:'M 125,5 155,90 245,90     ,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                    fillColor: '#CF3476',
                    fillOpacity: .5,
                    strokeWeight: 1,
                    scale: .10,
                },
                title:'ABT Transport  Hub'
        },
  ];
  zoomLevel = 3;
  connectedCallback(){
    //console.log('olaMarker::', olaMarker);
    //this.olaImage = olaMarker;
  }
}