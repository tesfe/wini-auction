const mongoose = require("mongoose");
const product = require("../model/product");
const { query } = require("express");

const getProduct = async (req, res) => {
  const {
    color = "all",
    company = "all",
    category = "all",
    price = 100000,
  } = req.query;
  const col = color;
  const com = company;
  const cate = category;
  const cost = parseInt(price, 10);
  // console.log(typeof col, typeof com, typeof cate, typeof cost);
  //   try {
  //     const result = await product
  //       .find({
  //         $and: [
  //           { color: col },
  //           { company: com },
  //           { category: cate },
  //           { prices: { $lt: cost } },
  //         ],
  //       })
  //       .exec();
  //     if (!result.length)
  //       return res.status(404).json({ error: "item is not found" });
  //     res.status(200).json(result);
  //   } catch (error) {
  //     console.log("something is wrong");
  //   }

  //i have option to bring all data here and sort out the required one easily using normal js code instead of pipeline code of monogdb,
  // but every click will bring the entire data which
  // might not be efficient
  try {
    const resulto = await product
      .aggregate([
        {
          $project: {
            item: "$$ROOT",
            matchCount: {
              $add: [
                { $cond: [{ $in: [col, "$color"] }, 1, 0] },
                { $cond: [{ $in: [com, "$company"] }, 1, 0] },
                { $cond: [{ $in: [cate, "$category"] }, 1, 0] },
                { $cond: [{ $lt: ["$prices", cost] }, 1, 0] },
              ],
            },
          },
        },
        {
          $match: {
            matchCount: { $gt: 0 },
          },
        },
        {
          $sort: { matchCount: -1 },
        },
      ])
      .exec();
    if (!resulto.length) {
      return res.status(404).json({ error: "not found" });
    }
    const perfect = resulto.filter((match) => match.matchCount === 4);
    let sortedItem = [];

    // console.log(sortedItem);
    if (perfect.length) {
      perfect.forEach((element) => {
        sortedItem.push(element.item);
      });

      return res.status(200).json(sortedItem);
    }
    resulto.forEach((element) => {
      sortedItem.push(element.item);
    });
    res.status(201).json(sortedItem);
  } catch (error) {
    console.error(error);
  }
};

const search = async (req, res) => {
  const { query } = req?.body;
  // console.log(query);
  const searchItem = query;
  console.log("hi there it is me");
  try {
    if (!searchItem) return res.sendStatus(201);
    const query = searchItem;

    const allItems = await product.find().exec();
    const foundItem = allItems.filter((item) => {
      return item.name.includes(query);
    });
    if (!foundItem.length) return res.status(201).json(allItems);
    res.status(200).json(foundItem);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getProduct, search };
