import { unix } from "moment";

const API_ROOT = `http://localhost:3000/api/v1`;

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token()
  };
};

const getConstellations = () => {
  return fetch(`${API_ROOT}/constellations/`, { headers: headers() }).then(res =>
    res.json()
  );
};

const getCalendars = () => {
  return fetch(`${API_ROOT}/calendars`, { headers: headers() })
  .then(res =>
    res.json())
};

const getPhenomena = () => {
    return fetch(`${API_ROOT}/sky_events`, {headers: headers() })
    .then(res => res.json())
}

const getMoonPhase = (unixTimestamp) => {
    return fetch(`http://api.farmsense.net/v1/moonphases/?d=${unixTimestamp}`)
    .then(res => res.json())
}

const login = data => {
  return fetch(`${API_ROOT}/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify( {auth: data})
  }).then(res => res.json());
};

const getCurrentUser = () => {
  console.log("getting current user", headers)
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers()
  }).then(res => {
    console.log(res)
    return res.json();
  });
};

const createUser = data => {
  return fetch(`${API_ROOT}/signup`, {
    method: "POST",
    headers: {      
      "Content-Type": "application/json",
      Accept: "application/json"
      },
    body: JSON.stringify({user: data})
  }).then(res => res.json());
};

const getPhotos = (searchTerm) => {
    return fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=qj3dfpSydcMDVv4cmGnE6bxKn_1PYW3-JLvt_IJCLJs`, {headers: headers()})
    .then(res => {
        return res.json()
    })
}

export const api = {
  auth: {
    login,
    getCurrentUser,
    getCalendars,
    createUser
  },
  constellations: {
    getConstellations
  },
  photos: {
    getPhotos
  },
  phenomena: {
      getPhenomena
  },
  moonPhase: {
    getMoonPhase
  }
};