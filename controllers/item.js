const Item = require("../models/item");

exports.selectItem = async (req, res, next) => {
  console.log(req.params);

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

exports.selectListItem = async (req, res, next) => {
  try {
    const item = await Item.findAll();
    res.send(item);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createItem = async (req, res, next) => {
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
      writer: itemParam.price,
      description: itemParam.description,
      prctureUrl: req.file.path,
    });

    if (item) {
      res.send({ itemNo: maxItemNo });
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    await Item.update(
      {
        itemName: req.body.itemName,
        description: req.body.description,
      },
      {
        where: {
          itemNo: req.params.id,
        },
      }
    );
    res.send({ itemNo: req.params.itemId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    await Item.destroy({ where: { id: req.params.id } });

    res.send({ itemNo: req.params.itemNo });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
