const auctionData = require("../model/auction");

const mongoose = require("mongoose");

const creatAuction = async (req, res) => {
  const { model, userName, bid } = req?.body;
  try {
    const auciontItem = await auctionData.find({ name: model }).exec();

    const data = auciontItem.sort((a, b) => {
      a.bid - b.bid;
    });

    if (!userName)
      return res.render("auction", {
        data,
        message: "enter valid username and your bid call",
      });
    const user = req.user;
    if (user !== userName)
      return res.render("auction", {
        data,
        message: "enter valid username and your bid call",
      });
  } catch (error) {
    console.log(error);
  }
  try {
    const create = await auctionData.create({
      name: model,

      bid: bid,
      userName: userName,
    });
    const myAuction = await auctionData.findOne({ name: model, userName });
    //we need to insert the user status here for displaying the update and delete button
    myAuction.user = true;
    const modelAuction = await auctionData.find({ name: model }).exec();

    const otherData = modelAuction.filter(
      //i needed to filter out the bid item and bidders without the loggedin user
      (item) => typeof item.prices === "number" || item.userName !== userName
    );

    const allData = [...otherData, myAuction];
    console.log(allData);
    data = allData.sort((a, b) => {
      a.bid - b.bid;
    });

    res.render("auction", { data, message: undefined });
  } catch (error) {
    console.log(error);
  }
};

module.exports = creatAuction;
