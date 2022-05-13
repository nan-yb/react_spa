import CodeGroup from "../models/codeGroup";

export const fetchCodeGroup = async (req, res, next) => {
  try {
    const codeGroup = await CodeGroup.findOne({
      where: { group_code: req.params.id },
    });
    res.send(codeGroup);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const fetchCodeGroupList = async (req, res, next) => {
  try {
    const codeGroup = await CodeGroup.findAll();
    res.send(codeGroup);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const writeCodeGroup = async (req, res, next) => {
  try {
    let groupDefine = await CodeGroup.findOne({
      where: {
        groupCode: req.body.groupCode,
      },
    });

    if (!groupDefine) {
      res.send({ groupCode: "" });
    }

    const codeGroup = await CodeGroup.create({
      groupCode: req.body.groupCode,
      groupName: req.body.groupName,
      useYn: "Y",
    });

    if (codeGroup) {
      res.send({ groupCode: req.body.groupCode });
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const modifyCodeGroup = async (req, res, next) => {
  try {
    await CodeGroup.update(
      {
        groupName: req.body.groupName,
      },
      {
        where: {
          groupCode: req.params.id,
        },
      }
    );
    res.send({ groupCode: req.params.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const removeCodeGroup = async (req, res, next) => {
  try {
    await CodeGroup.destroy({ where: { groupCode: req.params.id } });

    res.send({ groupCode: req.params.groupCode });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
