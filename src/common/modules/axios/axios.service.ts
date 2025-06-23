import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}
  async sendMessage(res) {
    return await firstValueFrom(
      this.httpService
        .post(res.url, res.data, {
          headers: JSON.parse(res.headers),
        })
        .pipe(
          map(response => response.data),
          catchError(error => {
            return of(error.response.data)
          }),
        ),
    )
  }
}
