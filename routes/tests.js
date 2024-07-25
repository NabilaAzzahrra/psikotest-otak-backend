var express = require("express");
var router = express.Router();
const { Test } = require("../models");

/* GET users listing. */
router.get("/", async (req, res) => {
  const tests = await Test.findAll();
  return res.json(tests);
});

router.get("/:id", async (req, res) => {
  const types = await Test.findOne({
    where: {
      id: req.params.id,
    },
  });
  return res.json(tests);
});

router.post("/", async (req, res) => {
  const data = {
    id_user: req.body.id_user,
    kanan: req.body.kanan,
    kiri: req.body.kiri,
    hasil: req.body.hasil,
  };
  const test = await Test.create(data);
  return res.json({
    message: "Berhasil disimpan",
    data: test,
  });
});

router.patch('/:id', async (req, res) => {
  const data = {
    id_user: req.body.id_user,
    kanan: req.body.kanan,
    kiri: req.body.kiri,
    hasil: req.body.hasil,
  }
  await Test.update(data, {
      where: {
          id: req.params.id
      }
  });
  const tests = await Test.findOne({
      where: {
          id: req.params.id
      }
  });
  return res.json({
      message: 'Berhasil diubah',
      data: tests
  });
});

router.delete('/:id', async (req, res) => {
  await Test.destroy({
      where: {
          id: req.params.id
      }
  });
  return res.json({
      message:'BERHASIL DIHAPUS'
  });
});

module.exports = router;
