var express = require("express");
var router = express.Router();
const { Answer } = require("../models");

/* GET users listing. */
router.get("/", async (req, res) => {
  const answers = await Answer.findAll();
  return res.json(answers);
});

router.get("/:id", async (req, res) => {
  const answers = await Answer.findOne({
    where: {
      id: req.params.id,
    },
  });
  return res.json(answers);
});

router.post("/", async (req, res) => {
  //   const data = {
  //     id_user: req.body.id_user,
  //     category: req.body.category,
  //     value: req.body.value,
  //   };
  await Answer.bulkCreate(req.body);
  return res.json({
    message: "Berhasil disimpan",
    data: "mau",
  });
});

router.patch("/:id", async (req, res) => {
  const data = {
    id_user: req.body.id_user,
    nama: req.body.nama,
    phone: req.body.phone,
    sekolah: req.body.sekolah,
    category: req.body.category,
    value: req.body.value,
  };
  await Answer.update(data, {
    where: {
      id: req.params.id,
    },
  });
  const answers = await Answer.findOne({
    where: {
      id: req.params.id,
    },
  });
  return res.json({
    message: "Berhasil diubah",
    data: answers,
  });
});

router.delete("/:id", async (req, res) => {
  await Answer.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.json({
    message: "BERHASIL DIHAPUS",
  });
});

module.exports = router;
