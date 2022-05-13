import CodeDetail from "../models/codeDetail";

export const fetchCodeDetail = async (req, res, next) => {
  try {
    console.log(req.params);

    const codeDetail = await CodeDetail.findOne({
      where: {
        group_code: req.params.groupCode,
        code_value: req.params.codeValue,
      },
    });
    res.send(codeDetail);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const fetchCodeDetailList = async (req, res, next) => {
  try {
    const codeDetail = await CodeDetail.findAll();
    res.send(codeDetail);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const writeCodeDetail = async (req, res, next) => {
  try {
    const groupDefine = await CodeDetail.findOne({
      where: {
        groupCode: req.body.groupCode,
        codeValue: req.body.codeValue,
      },
    });

    if (groupDefine) {
      throw Error();
    }

    const codeDetail = await CodeDetail.create({
      groupCode: req.body.groupCode,
      codeValue: req.body.codeValue,
      codeName: req.body.codeName,
      useYn: "Y",
    });

    if (codeDetail) {
      res.send({
        groupCode: codeDetail.groupCode,
        codeValue: codeDetail.codeValue,
      });
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const modifyCodeDetail = async (req, res, next) => {
  try {
    await CodeDetail.update(
      {
        codeName: req.body.codeName,
      },
      {
        where: {
          group_code: req.params.groupCode,
          code_value: req.params.codeValue,
        },
      }
    );
    res.send({ groupCode: req.params.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const removeCodeDetail = async (req, res, next) => {
  try {
    await CodeDetail.destroy({
      where: {
        group_code: req.params.groupCode,
        code_value: req.params.codeValue,
      },
    });

    res.send({ groupCode: req.params.groupCode });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
