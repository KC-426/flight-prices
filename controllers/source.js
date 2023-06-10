const Source = require("../models/source");
const Price = require("../models/flight-prices");

exports.getIndex = (req, res, next) => {
  res.render("index", {
    path: "/home",
  });
};


exports.fetchPrice = (req, res, next) => {
  const source = req.body.source;
  const destination = req.body.destination;
  Source.findOne({ source, destination })
  .then((sourceData) => {
    if (!sourceData) {
      const error = new Error("Could not find flights.");
      error.statusCode = 404;
      throw error;
    }
    console.log(sourceData);
    res.render("flight-prices", {
      path: "/prices",
      source: sourceData,
    });
  })
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.getPrices = (req, res, next) => {
  var source = req.body.source
  var destination = req.body.destination
  console.log(req.body)

  Source.findOne({ source: source, destination: destination})
    .then((data) => {
      if (!data) {
        throw new Error("Price not found");
      }
      
      data.rate = data.source.toString()
      res.render("flight-prices", {
        path: "/prices",
        source: data.source,
        destination: data.destination,
        price: data.price,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
