import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Company } from '../../models/Company';
import { WeatherService } from '../../services/weather.service';
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
    presion: 0,
    humedad: 0,
    visibilidad: 0,
    velocidad: 0,
    nubes: 0,
    grados: 0, // viento
    direccion: '', // viento
    lluvia: 0,
  };
  constructor(private authService: NbAuthService, private companyService: CompanyService, private weather: WeatherService) { }

  ngOnInit(): void {
    const usr = this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
      this.weather.getWeather(this.user.municipio).subscribe((res: any) => {
        // console.log(res);
        this.tiempo.latitud = Number(res.coord.lat);
        this.tiempo.longitud = Number(res.coord.lon);
        this.tiempo.descripcion = res.weather[0].description;
        this.tiempo.icon = res.weather[0].icon;
        this.tiempo.temperatura = Number(res.main.temp);
        this.tiempo.presion = Number(res.main.pressure);
        this.tiempo.humedad = Number(res.main.humidity);
        this.tiempo.visibilidad = Number(res.visibility);
        this.tiempo.velocidad = Math.round(Number(res.wind.speed) * 3.6);
        this.tiempo.nubes = Number(res.clouds.all);
        this.tiempo.grados = Number(res.wind.deg);
        if (res.hasOwnProperty('rain')) {
          this.tiempo.lluvia = Number(res.rain['1h']);
        }
        this.tiempo.direccion = this.GradosADireccion(this.tiempo.grados);
        // console.log(this.tiempo);
      });
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
