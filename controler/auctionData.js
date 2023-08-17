const auctionData = require("../model/auction");

const mongoose = require("mongoose");

const joinAuction = async (req, res) => {
  try {
    let auctionItems = await auctionData.find().exec();
    // const cookies = req.cookies;
    // const refreshToken = cookies.jwt;
    const userName = req?.user;
    const withName = auctionItems.filter((item) => item.userName === userName);
    if (withName) {
      //  const user = true;
      // const dataB = withName.map((element) => {
      //   element.user = true;
      //   return element;
      // });
      const dataB = withName.forEach((obj) => {
        obj.user = true;
      });
      console.log(dataB, withName);
      const otherData = auctionItems.filter(
        (item) => item.userName !== userName
      );
      auctionItems = [...otherData, ...withName];
    }
    const itemByName = {};
    auctionItems.map((item) => {
      if (!itemByName[item.name]) {
        itemByName[item.name] = [];
      }
      itemByName[item.name].push(item);
      return itemByName;
    });
    //console.log(itemByName, "this  data");
    for (const auc in itemByName) {
      itemByName[auc].sort((a, b) => {
        a.bid - b.bid;
      });
    }

    const data = Object.values(itemByName).flat();
    //console.log(data);
    res.render("auction", { data, message: undefined });
  } catch (error) {
    console.log({ error });
  }
};

//const findByModel=

module.exports = joinAuction;
