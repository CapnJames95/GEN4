/*
 * pgAuth — shared Google sign-in for pkmnguide.com and its game subdomains.
 *
 * Goals:
 *   - One Google account signs you in across pkmnguide.com, gen3.pkmnguide.com, gen4.pkmnguide.com.
 *   - Persist profile + access token in a cookie scoped to ".pkmnguide.com" so subdomains share state.
 *   - Silent re-auth on page load when an existing Google session is detected.
 *   - Expose a tiny API: pgAuth.signIn(), pgAuth.signOut(), pgAuth.getUser(), pgAuth.getAccessToken(),
 *     pgAuth.ensureFreshToken(), pgAuth.onChange().
 *
 * Local development falls back to localStorage when the cookie can't be set on a real parent domain.
 */
(function (global) {
  'use strict';

  var CLIENT_ID = '67400975308-p53sdautjffekbun985l2ct08osjapp2.apps.googleusercontent.com';
  var SCOPE = [
    'https://www.googleapis.com/auth/drive.appdata',
    'openid',
    'email',
    'profile'
  ].join(' ');
  var COOKIE_NAME = 'pgauth';
  var GIS_SRC = 'https://accounts.google.com/gsi/client';
  var LOCAL_KEY = 'pgauth_local';

  function isPkmnguideDomain() {
    return /(^|\.)pkmnguide\.com$/i.test(location.hostname);
  }
  function cookieDomain() {
    return isPkmnguideDomain() ? '.pkmnguide.com' : null;
  }

  function readCookie() {
    try {
      var m = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)'));
      if (!m) return null;
      return JSON.parse(decodeURIComponent(m[1]));
    } catch (e) {
      return null;
    }
  }
  function readLocal() {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null'); } catch (e) { return null; }
  }
  function writeStore(obj) {
    var domain = cookieDomain();
    var secure = location.protocol === 'https:';
    if (!obj) {
      var clear = COOKIE_NAME + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax' +
        (domain ? '; domain=' + domain : '') + (secure ? '; Secure' : '');
      document.cookie = clear;
      try { localStorage.removeItem(LOCAL_KEY); } catch (e) {}
      return;
    }
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(obj)); } catch (e) {}
    if (domain) {
      var exp = new Date(Date.now() + 30 * 24 * 3600 * 1000).toUTCString();
      var val = encodeURIComponent(JSON.stringify(obj));
      document.cookie = COOKIE_NAME + '=' + val + '; expires=' + exp + '; path=/; SameSite=Lax' +
        '; domain=' + domain + (secure ? '; Secure' : '');
    }
  }
  function loadStored() {
    return readCookie() || readLocal();
  }

  var listeners = [];
  var cachedUser = loadStored();

  function fire() {
    cachedUser = loadStored();
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](cachedUser); } catch (e) {}
    }
    try { document.dispatchEvent(new CustomEvent('pgauth:change', { detail: cachedUser })); } catch (e) {}
  }

  var gisPromise = null;
  function loadGIS() {
    if (gisPromise) return gisPromise;
    gisPromise = new Promise(function (resolve, reject) {
      if (window.google && window.google.accounts && window.google.accounts.oauth2) {
        return resolve();
      }
      var existing = document.querySelector('script[src="' + GIS_SRC + '"]');
      if (existing) {
        existing.addEventListener('load', function () { resolve(); }, { once: true });
        existing.addEventListener('error', function () { reject(new Error('GIS script failed to load')); }, { once: true });
        return;
      }
      var s = document.createElement('script');
      s.src = GIS_SRC;
      s.async = true;
      s.defer = true;
      s.onload = function () { resolve(); };
      s.onerror = function () { gisPromise = null; reject(new Error('GIS script failed to load')); };
      document.head.appendChild(s);
    });
    return gisPromise;
  }

  var tokenClient = null;
  function ensureTokenClient() {
    return loadGIS().then(function () {
      if (tokenClient) return tokenClient;
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPE,
        callback: function () {}
      });
      return tokenClient;
    });
  }

  function requestAccessToken(opts) {
    opts = opts || {};
    return ensureTokenClient().then(function (client) {
      return new Promise(function (resolve, reject) {
        client.callback = function (resp) {
          if (resp && resp.error) return reject(new Error(resp.error_description || resp.error));
          resolve(resp);
        };
        var params = { prompt: opts.silent ? 'none' : '' };
        if (opts.hint && opts.silent) params.hint = opts.hint;
        try { client.requestAccessToken(params); } catch (e) { reject(e); }
      });
    });
  }

  function fetchUserinfo(accessToken) {
    return fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: 'Bearer ' + accessToken }
    }).then(function (r) {
      if (!r.ok) throw new Error('userinfo HTTP ' + r.status);
      return r.json();
    });
  }

  function tokenAlive(user, marginMs) {
    if (!user || !user.accessToken || !user.expiresAt) return false;
    return user.expiresAt > Date.now() + (marginMs || 0);
  }

  var api = {
    CLIENT_ID: CLIENT_ID,
    SCOPE: SCOPE,

    getUser: function () { return cachedUser || loadStored(); },

    isSignedIn: function () {
      var u = api.getUser();
      return !!(u && u.email);
    },

    hasValidToken: function () {
      return tokenAlive(api.getUser(), 30 * 1000);
    },

    getAccessToken: function () {
      var u = api.getUser();
      return tokenAlive(u, 30 * 1000) ? u.accessToken : null;
    },

    onChange: function (fn) {
      listeners.push(fn);
      try { fn(api.getUser()); } catch (e) {}
      return function () {
        var i = listeners.indexOf(fn);
        if (i >= 0) listeners.splice(i, 1);
      };
    },

    signIn: function () {
      return requestAccessToken({ silent: false }).then(function (resp) {
        return fetchUserinfo(resp.access_token).then(function (info) {
          var user = {
            email: info.email,
            name: info.name,
            picture: info.picture,
            sub: info.sub,
            accessToken: resp.access_token,
            expiresAt: Date.now() + (Number(resp.expires_in) || 3600) * 1000
          };
          writeStore(user);
          fire();
          return user;
        });
      });
    },

    signOut: function () {
      var u = api.getUser();
      if (u && u.accessToken && window.google && google.accounts && google.accounts.oauth2) {
        try { google.accounts.oauth2.revoke(u.accessToken, function () {}); } catch (e) {}
      }
      writeStore(null);
      fire();
    },

    /**
     * Ensures a usable access token. Returns Promise<string|null>.
     * If profile cookie exists but token expired, performs silent re-auth.
     * Returns null when the user hasn't signed in or silent auth failed.
     */
    ensureFreshToken: function () {
      var u = api.getUser();
      if (!u) return Promise.resolve(null);
      if (tokenAlive(u, 60 * 1000)) return Promise.resolve(u.accessToken);
      return requestAccessToken({ silent: true, hint: u.email }).then(function (resp) {
        var merged = Object.assign({}, u, {
          accessToken: resp.access_token,
          expiresAt: Date.now() + (Number(resp.expires_in) || 3600) * 1000
        });
        writeStore(merged);
        fire();
        return resp.access_token;
      }).catch(function () {
        return null;
      });
    }
  };

  global.pgAuth = api;

  // Cross-tab sync: when another tab updates the local fallback, refresh state here.
  try {
    window.addEventListener('storage', function (ev) {
      if (ev.key === LOCAL_KEY) fire();
    });
  } catch (e) {}

  // Best-effort silent refresh on load if we already have a profile.
  if (cachedUser && cachedUser.email && !tokenAlive(cachedUser, 60 * 1000)) {
    setTimeout(function () { api.ensureFreshToken(); }, 300);
  }
})(window);
