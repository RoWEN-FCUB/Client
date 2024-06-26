import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Company } from '../../models/Company';
import { WeatherService } from '../../services/weather.service';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  company: Company = {};
  user = {name: '', picture: '', id: 0, role: '', fullname: '', position: '', supname: '', supposition: '', id_emp: 0, municipio: ''};
  tiempo = {
    latitud: 0,
    longitud: 0,
    descripcion: '',
    icon: '',
    temperatura: 0,
    sensacion_termica: 0,
    presion: 0,
    humedad: 0,
    visibilidad: 0,
    velocidad: 0,
    nubes: 0,
    grados: 0, // viento
    direccion: '', // viento
    lluvia: 0,
  };
  deviceInfo = null;
  isMobile = false;
  constructor(private authService: NbAuthService, private companyService: CompanyService, private weather: WeatherService, private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.weather.getWeather(this.user.municipio).subscribe((res: any) => {
        //console.log(res);
        if (res.hasOwnProperty('latitude')) { // verificar que la api haya devuelto datos de la ubicacion enviada
          this.tiempo.latitud = Number(res.latitude);
          this.tiempo.longitud = Number(res.longitude);
          //this.tiempo.descripcion = res.weather[0].description;
          //this.tiempo.icon = res.weather[0].icon;
          if (res.current_weather.weathercode === 0) {
            this.tiempo.icon = 'day';
          } else if (res.current_weather.weathercode === 1) {
            this.tiempo.icon = 'cloudy-day-1';
          } else if (res.current_weather.weathercode === 2) {
            this.tiempo.icon = 'cloudy-day-3';
          } else if (res.current_weather.weathercode === 3) {
            this.tiempo.icon = 'cloudy';
          }  else if (res.current_weather.weathercode === 61) {
            this.tiempo.icon = 'rainy-1';
          }  else if (res.current_weather.weathercode === 63) {
            this.tiempo.icon = 'rainy-3';
          }  else if (res.current_weather.weathercode === 65) {
            this.tiempo.icon = 'rainy-4';
          } else if (res.current_weather.weathercode === 80) {
            this.tiempo.icon = 'rainy-5';
          }  else if (res.current_weather.weathercode === 81) {
            this.tiempo.icon = 'rainy-6';
          }  else if (res.current_weather.weathercode === 82) {
            this.tiempo.icon = 'rainy-7';
          } else if (res.current_weather.weathercode === 95) {
            this.tiempo.icon = 'thunder';
          } else {
            this.tiempo.icon = 'weather';
          }
          this.tiempo.temperatura = Number(res.current_weather.temperature);
          //this.tiempo.sensacion_termica = Number(res.main.feels_like);
          //this.tiempo.presion = Number(res.main.pressure);
          //this.tiempo.humedad = Number(res.main.humidity);
          //this.tiempo.visibilidad = Number(res.visibility);
          this.tiempo.velocidad = Number(res.current_weather.windspeed);
          //this.tiempo.nubes = Number(res.clouds.all);
          this.tiempo.grados = Number(res.current_weather.winddirection);
          /*if (res.hasOwnProperty('rain')) {
            this.tiempo.lluvia = Number(res.rain['1h']);
          }*/
          this.tiempo.direccion = this.GradosADireccion(this.tiempo.grados);
          // console.log(this.tiempo);
        }
        // console.log(res);
      }, (error: any) => {});
      this.companyService.getOne(this.user.id_emp).subscribe((res: Company) => {
        this.company = res;
      });
    });
  }

  GradosADireccion(deg: number) {
    if (deg > 11.25 && deg <= 33.75) {
      return 'NNE';
    } else if (deg > 33.75 && deg <= 56.25) {
      return 'NE';
    } else if (deg > 56.25 && deg <= 78.75) {
      return 'ENE';
    } else if (deg > 78.75 && deg <= 101.25) {
      return 'E';
    } else if (deg > 101.25 && deg <= 123.75) {
      return 'ESE';
    } else if (deg > 123.75 && deg <= 146.25) {
      return 'SE';
    } else if (deg > 146.25 && deg <= 168.75) {
      return 'SSE';
    } else if (deg > 168.75 && deg <= 191.25) {
      return 'S';
    } else if (deg > 191.25 && deg <= 213.75) {
      return 'SSW';
    } else if (deg > 213.75 && deg <= 236.25) {
      return 'SW';
    } else if (deg > 236.25 && deg <= 258.75) {
      return 'WSW';
    } else if (deg > 258.75 && deg <= 281.25) {
      return 'W';
    } else if (deg > 281.25 && deg <= 303.75) {
      return 'WNW';
    } else if (deg > 303.75 && deg <= 326.25) {
      return 'NW';
    } else if (deg > 326.25 && deg <= 348.75) {
      return 'NNW';
    } else {
      return 'N';
    }
  }
}
