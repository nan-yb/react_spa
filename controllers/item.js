import Item from "../models/item";
import fs from "fs";

exports.selectItem = async (req, res, next) => {
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

exports.updateItem = async (req, res, next) => {
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

exports.deleteItem = async (req, res, next) => {
  try {
    await Item.destroy({ where: { itemId: req.params.id } });
    res.send({ itemId: req.params.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.showImage = async (req, res, next) => {
  try {
    const item = await Item.findOne({
      where: { item_id: req.query.itemId },
    });

    const prctureUrl = item.prctureUrl;
    fs.readFile(prctureUrl, function (err, data) {
      //http의 헤더정보를 클라이언트쪽으로 출력
      //image/jpg : jpg 이미지 파일을 전송한다
      //write 로 보낼 내용을 입력
      res.writeHead(200, { "Context-Type": "image/jpg" }); //보낼 헤더를 만듬
      res.write(data); //본문을 만들고
      res.end(); //클라이언트에게 응답을 전송한다
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
