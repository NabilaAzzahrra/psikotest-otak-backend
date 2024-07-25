var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

router.get('/sync', async (req, res) => {
  try {
      const users = await User.findAll();
      const responseClasses = await axios.get(`http://localhost:3000/users/class`);
      const applicants = responseClasses.data;
      console.log(applicants);

      users.forEach(async (user, index) => {
          const result = applicants.find((applicant) => applicant.id == user.id_user);
          if(result){
              await User.update({
                  classes: result.class
              },{
                  where: {
                      id_user: user.id_user
                  }
              })
              console.log(result.class);
          }
      });

      return res.json({
          users: users,
      })

  } catch (error) {
      console.error('Error in /sync route:', error);
      return res.status(500).json('An error occurred');
  }
});

router.get('/:idUser', async (req, res) => {
  const users = await User.findOne({
      where: {
          id_user: req.params.idUser
      }
  });
  return res.json(users);
});

router.post('/', async (req, res) => {
  const data = {
      id_user: req.body.id_user,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      school: req.body.school,
      classes: req.body.classes,
  }
  const user = await User.create(data);
  return res.json({
      message: 'Berhasil disimpan',
      data: user
  });
});

router.patch('/:idUser', async (req, res) => {
  const data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      school: req.body.school,
      classes: req.body.classes,
  }
  await User.update(data, {
      where: {
          id_user: req.params.idUser
      }
  });
  const user = await User.findOne({
      where: {
          id_user: req.params.idUser
      }
  });
  return res.json({
      message: 'Berhasil diubah',
      data: user
  });
});

router.delete('/:idUser', async (req, res) => {
  await User.destroy({
      where: {
          id_user: req.params.idUser
      }
  });
  return res.json({
      message: 'BERHASIL DIHAPUS'
  });
});

module.exports = router;
