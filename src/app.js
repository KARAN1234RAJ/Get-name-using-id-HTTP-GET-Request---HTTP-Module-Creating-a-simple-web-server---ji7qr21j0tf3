const fs = require("fs");
const express = require("express");
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
  fs.readFileSync(`${__dirname}/data/names.json`)
);

//Middlewares
app.use(express.json());

// GET endpoint for sending the products to client by id
//Endpoint - /api/v1/names/:id
app.get("/api/v1/names/:id", (req, res) => {
  // console.log("request receive", req.params);
  const { id } = req.params; //destructuring assignment
//   console.log("id-->", id);
//   console.log(productNames.map((item) => item.id));
  const product = productNames.find((item) => item.id == id);
  if (product) {
    res.status(200).json({
      status: "success",
      message: "Product Name fetched successfully",
      data: {
        name: product,
      },
    });
  } else {
    res.status(404).json({
      status: "falure",
      message: "Not found",
    });
  }
  //   if (productNames.map((item) => item.id) === id) {
  //     console.log("product id match");
  //   } else {
  //     console.log("product id doesn't match");
  //   }

  //   const filterData = productNames.filter((item) => item.id == id);
  //   res.send({
  //     status: 200,
  //     message: "Product Name fetched successfully",
  //     data: filterData,
  //   });
});

module.exports = app;
