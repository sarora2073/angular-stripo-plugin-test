import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { fetch } from "node-fetch";

const STRIPO_AUTH_PATH = "https://plugins.stripo.email/api/v1/auth";

@Injectable()
export class StripoAuthService {
  getAuthToken(): Observable<any> {
    // TEMPORARILY INSERT CREDS HERE, BUT DON'T SAVE IT PERMANENTLY!!!
    let pluginId = ""; // <----
    let secretKey = ""; // <----

    let config = {
      url: STRIPO_AUTH_PATH,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        pluginId: pluginId,
        secretKey: secretKey
        // role: 'ADMIN' // only pass this if you want admin role; leave blank for normal users
      }
    };

    return fetch(config.url, {
      method: config.method,
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: config.headers,
      body: JSON.stringify(config.body)
    })
      .then(async token => {
        // console.log('token', await token.json());
        let _token = await token.json();
        // console.log('token', _token);
        return _token;
      })
      .catch(e => {
        console.error("fetchUrl error:", e);
        return { error: e };
      });
  }
}
