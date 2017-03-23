import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  private nextPageToken: string = 'CAoQAA';
  private playlist: string = 'UUuaPTYj15JSkETGnEseaFFg';
  private apiKey: string = 'AIzaSyDt1pdRNKqFQjYHMfWHgzQrw8NU9lb2rFE';
  private youtubeUrl: string = 'https://www.googleapis.com/youtube/v3';

  constructor(public http: Http) { }

  getVideos() {

    let params = new URLSearchParams();
    let url = `${this.youtubeUrl}/playlistItems`;

    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('key', this.apiKey);
    params.set('playlistId', this.playlist);

    if (this.nextPageToken) {
      params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, { search: params })
      .map(resp => {
        let videos: any[] = [];

        this.nextPageToken = resp.json().nextPageToken;

        for (let video of resp.json().items) {
          let snippet = video.snippet;
          videos.push(snippet);
        }
        return videos;

      });
  }

}
