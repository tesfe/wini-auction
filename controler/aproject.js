const mongoose = require("mongoose");
const product = require("../model/product");

const getProduct = async (req, res) => {
  const { color = "all", company = "all", category = "all", price } = req.query;
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
    if (perfect.length) return res.status(200).json(perfect);
    res.status(201).json(resulto);
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getProduct };
