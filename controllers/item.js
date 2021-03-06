import Item from "../models/item";
import fs from "fs";

export const selectItem = async (req, res, next) => {
  try {
    const item = await Item.findOne({
      where: { item_id: req.params.id },
    });
    res.send(item);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const selectListItem = async (req, res, next) => {
  try {
    const item = await Item.findAll();
    res.send(item);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createItem = async (req, res, next) => {
  try {
    let maxItemNo = await Item.max("itemId");

    if (!maxItemNo) {
      maxItemNo = 0;
    }
    maxItemNo += 1;

    const itemParam = JSON.parse(req.body.item);

    const item = await Item.create({
      itemId: maxItemNo,
      itemName: itemParam.itemName,
      price: itemParam.price,
      description: itemParam.description,
      prctureUrl: req.file.path,
    });

    if (item) {
      res.send({ itemId: maxItemNo });
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const itemParam = JSON.parse(req.body.item);

    await Item.update(
      {
        itemName: itemParam.itemName,
        price: itemParam.price,
        description: itemParam.description,
        prctureUrl: req.file.path,
      },
      {
        where: {
          description: itemParam.itemId,
        },
      }
    );
    res.send({ itemId: req.params.itemId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    await Item.destroy({ where: { itemId: req.params.id } });
    res.send({ itemId: req.params.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const showImage = async (req, res, next) => {
  try {
    const item = await Item.findOne({
      where: { item_id: req.query.itemId },
    });

    const prctureUrl = item.prctureUrl;
    fs.readFile(prctureUrl, function (err, data) {
      //http??? ??????????????? ???????????????????????? ??????
      //image/jpg : jpg ????????? ????????? ????????????
      //write ??? ?????? ????????? ??????
      res.writeHead(200, { "Context-Type": "image/jpg" }); //?????? ????????? ??????
      res.write(data); //????????? ?????????
      res.end(); //????????????????????? ????????? ????????????
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
