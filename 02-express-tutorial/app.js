// const http = require("http");
// const { readFileSync } = require("fs");

// const homepage = readFileSync("./navbar-app/index.html");
// const homeStyle = readFileSync("./navbar-app/styles.css");
// const homelogo = readFileSync("./navbar-app/logo.svg");
// const homelogic = readFileSync("./navbar-app/browser-app.js");

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   if (url === "/") {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write(homepage);
//     res.end();
//   } else if (url === "/about") {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write("<h1>About page</h1>");
//     res.end();
//   } else if (url === "/styles.css") {
//     res.writeHead(200, { "content-type": "text/css" });
//     res.write(homeStyle);
//     res.end();
//   } else if (url === "/logo.svg") {
//     res.writeHead(200, { "content-type": "image/svg+xml" });
//     res.write(homelogo);
//     res.end();
//   } else if (url === "/browser-app.js") {
//     res.writeHead(200, { "content-type": "text/javascript" });
//     res.write(homelogic);
//     res.end();
//   } else {
//     res.writeHead(404, { "content-type": "text/html" });
//     res.write("<h1>page not found</h1>");
//     res.end();
//   }
// });

// server.listen(5000);
// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   console.log("user hit the resource");
//   res.status(200).send("Home Page");
// });

// app.get("/about", (req, res) => {
//   res.status(200).send("About Page");
// });

// app.get("*", (req, res) => {
//   res.status(404).send("<h1>resources not found</h1>");
// });

// app.listen(5000, () => {
//   console.log("server is listening on  port 5000");
// });

// const express = require("express");
// const path = require("path");
// const app = express();

// app.use(express.static("./public"));

// // console.log(__dirname);

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// });

// app.all("*", (req, res) => {
//   res.status(404).send("resource not found");
// });

// app.listen(5000, () => {
//   console.log("user hitting the server 5000...");
// });

// const { products } = require("./data");

// app.get("/", (req, res) => {
//   res.send('<h1>Home Page</h1> <a href = "/api/products"> Products </a>');
// });

// app.get("/api/products", (req, res) => {
//   const newProducts = products.map((product) => {
//     const { id, name, image } = product;
//     return { id, name, image };
//   });
//   res.json(newProducts);
// });

// app.get("/api/products/1", (req, res) => {
//   const singleProduct = products.find((product) => product.id === 1);

//   res.json(singleProduct);
// });

// app.get("/api/products/:prodID", (req, res) => {
//   const { prodID } = req.params;
//   const singleProduct = products.find(
//     (product) => product.id == Number(prodID)
//   );
//   if (!singleProduct) {
//     return res.status(404).send("product does not exist");
//   }
//   return res.json(singleProduct);
// });

// app.get("/api/v1/query", (req, res) => {
//   const { search, limit } = req.query;
//   let sortedProducts = [...products];
//   if (search) {
//     sortedProducts = sortedProducts.filter((product) => {
//       return product.name.startsWith(search);
//     });
//   }
//   if (limit) {
//     sortedProducts = sortedProducts.slice(0, Number(limit));
//   }
//   if (sortedProducts.length < 1) {
//     return res.status(200).json({ success: true, data: [] });
//   }

//   res.status(200).json(sortedProducts);
// });

// const morgan = require("morgan");
// const logger = require("./logger");
// const authorize = require("./authorize");
// // app.use([logger, authorize]);
// app.use(morgan("tiny"));

// app.get("/", (req, res) => {
//   console.log(req.user);
//   res.send("Home");
// });

// app.get("/about", (req, res) => {
//   res.send("About");
// });

// app.get("/api/products", (req, res) => {
//   res.send("Products");
// });

// app.get("/api/items", (req, res) => {
//   res.send("Items");
// });

const express = require("express");
const app = express();

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
let { people } = require("./data");

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please provide credentials");
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide the name value" });
  }
  res.status(201).send({ success: true, data: [...people, name] });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
