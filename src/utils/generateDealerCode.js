const Dealer = require("../models/Dealer");

const cityPrefix = {
  Bangalore: "BLR",
  Mumbai: "MUM",
  Delhi: "DEL",
  Chennai: "CHE",
  Hyderabad: "HYD",
  Pune: "PUN",
  Kolkata: "KOL",
};

const generateDealerCode = async (city) => {
  const prefix =
    cityPrefix[city] ||
    city.substring(0, 3).toUpperCase();

  const totalDealers = await Dealer.countDocuments({
    city,
  });

  const number = String(totalDealers + 1).padStart(
    3,
    "0"
  );

  return `${prefix}${number}`;
};

module.exports = generateDealerCode;