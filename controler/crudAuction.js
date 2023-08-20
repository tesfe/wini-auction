const auctionData = require("../model/auction");

const mongoose = require("mongoose");
// async function crud({ model, userName, bid, update }) {
//   try {
//     const auciontItem = await auctionData.find({ name: model }).exec();

//     let data = auciontItem.sort((a, b) => {
//       a.bid - b.bid;
//     });

//     if (!userName)
//       return res.render("auction", {
//         data,
//         message: "enter valid username and your bid call",
//       });
//     const user = req?.user;
//     //check if user is the loggin user
//     if (user !== userName)
//       return res.render("auction", {
//         data,
//         message: "enter valid username and your bid call",
//       });
//     //check if the bidder  already has active bid to prevent dublicate of bid in memory
//     let dublicate = auciontItem.find((item) => item.userName === userName);
//     // if (dublicate)
//     //   return res.render("auction", {
//     //     data,
//     //     message: "already bid exists",
//     //   });
//     // } catch (error) {
//     //   console.log(error);
//     // }
//     // try {
//     if (!dublicate) {
//       await auctionData.create({
//         name: model,

//         bid: bid,
//         userName: userName,
//       });
//     }
//     if (update) {
//       await auctionData
//         .updateOne({ name: model, userName: userName }, { $set: { bid: bid } })
//         .exec();
//     }

//     // const myAuction = await auctionData.findOne({ name: model, userName });
//     const modelAuction = await auctionData.find({ name: model }).exec();
//     //we need to insert the user status here for displaying the update and delete button

//     const myAuction = modelAuction.find((item) => item.userName === userName);
//     myAuction.user = true;
//     const otherData = modelAuction.filter(
//       //i needed to filter out the bid item and bidders without the loggedin user
//       (item) => typeof item.prices === "number" || item.userName !== userName
//     );

//     const allData = [...otherData, myAuction];
//     // console.log(allData);
//     data = allData.sort((a, b) => {
//       a.bid - b.bid;
//     });

//     res.render("auction", { data, message: undefined });
//   } catch (error) {
//     console.log(error);
//   }
// }

const creatAuction = async (req, res) => {
  const { model, userName, bid } = req?.body;
  console.log(model);
  try {
    if (!userName || !bid || !model)
      return res.render("auction", {
        data: undefined,
        message: "enter valid username and your bid call",
      });
    const user = req.user;
    //check if user is the loggin user
    if (user !== userName)
      return res.render("auction", {
        data: undefined,
        message: "enter valid username and your bid call",
      });
    const auciontItem = await auctionData.find({ name: model }).exec();

    //check if the bidder  already has active bid to prevent dublicate of bid in memory
    let dublicate = auciontItem.find((item) => item.userName === userName);

    if (!dublicate) {
      await auctionData.create({
        name: model,

        bid: bid,
        userName: userName,
      });
    }

    // const myAuction = await auctionData.findOne({ name: model, userName });
    const modelAuction = await auctionData.find({ name: model }).exec();
    //we need to insert the user status here for displaying the update and delete button

    const myAuction = modelAuction.find((item) => item.userName === userName);
    myAuction.user = true;
    const otherData = modelAuction.filter(
      //i needed to filter out the bid item and bidders without the loggedin user
      (item) => typeof item.prices === "number" || item.userName !== userName
    );

    const allData = [...otherData, myAuction];
    // console.log(allData);
    data = allData.sort((a, b) => {
      a.bid - b.bid;
    });

    res.render("auction", { data, message: undefined });
  } catch (error) {
    console.log(error);
  }
};

const deletUpdate = async (req, res) => {
  const {
    model,
    userName,
    bid,
    update = undefined,
    delet = undefined,
  } = req?.body;
  if (!userName || !model)
    return res.render("auction", {
      data: undefined,
      message: "enter valid username and your bid call",
    });

  const loggedUser = req?.user;
  if (userName !== loggedUser)
    return res.render("auction", {
      data: undefined,
      message: "unauthorized action",
    });
  console.log(update, delet);
  if (delet) {
    try {
      await auctionData.deleteOne({ name: model, userName }).exec();

      const allData = await auctionData.find({ name: model }).exec();

      console.log(allData);
      const data = allData.sort((a, b) => {
        a.bid - b.bid;
      });

      // return res.render("auction", { data, message: undefined });
      return res.render("auction", { data, message: undefined });
    } catch (error) {
      console.log(error);
    }
  }

  if (update) {
    if (!userName || !bid || !model)
      return res.render("auction", {
        data: undefined,
        message: "enter valid username and your bid call",
      });
    try {
      await auctionData
        .updateOne({ name: model, userName: userName }, { $set: { bid: bid } })
        .exec();

      // const myAuction = await auctionData.findOne({ name: model, userName });
      const modelAuction = await auctionData.find({ name: model }).exec();
      //we need to insert the user status here for displaying the update and delete button

      const myAuction = modelAuction.find((item) => item.userName === userName);
      myAuction.user = true;
      const otherData = modelAuction.filter(
        //i needed to filter out the bid item and bidders without the loggedin user
        (item) => typeof item.prices === "number" || item.userName !== userName
      );

      const allData = [...otherData, myAuction];
      // console.log(allData);
      const data = allData.sort((a, b) => {
        a.bid - b.bid;
      });

      res.render("auction", { data, message: undefined });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = { creatAuction, deletUpdate };
