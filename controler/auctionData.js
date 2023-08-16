const auctionData = require("../model/auction");

const mongoose = require("mongoose");

const creatAuction = async (req, res) => {
  try {
    const auctionItems = await auctionData.find().exec();
    // const cookies = req.cookies;
    // const refreshToken = cookies.jwt;
    const userName = req?.user;
    const withName = auctionItems.filter((item) => item.userName === userName);
    const user = true;
    const dataB = withName.map((element) => {
      element = { ...element, user };
      return element;
    });
    const otherData = auctionItems.filter((item) => item.userName !== userName);
    const allData = [...otherData, ...dataB];

    const itemByName = {};
    allData.map((item) => {
      if (!itemByName[item.name]) {
        itemByName[item.name] = [];
      }
      itemByName[item.name].push(item);
      return itemByName;
    });
    //console.log(data, "this first data");
    for (const auc in itemByName) {
      itemByName[auc].sort((a, b) => {
        a.prices - b.prices;
      });
    }

    const data = Object.values(itemByName).flat();

    res.render("auction", { data });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = creatAuction;
