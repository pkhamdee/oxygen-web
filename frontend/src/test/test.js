const axios = require("axios").default;

let test = axios.get("http://localhost:8080/user/1").then((res) => {
  console.log(res.data);
});