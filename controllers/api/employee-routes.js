const router = require('express').Router();
const {Employee, Task} = require('../../models');

router.get('/',(req, res)=>{
    Employee.findAll({
      attributes:{exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Employee.findOne({
      attributes:{exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Task,
            attributes: ['id','title','deadline','created_at']
          }
        ]
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.post('/',(req,res)=>{
    Employee.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.post('/login', (req,res)=>{
  Employee.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData =>{
    if(!dbUserData){
      res.status(400).json({message: 'User not found'});
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);
    if(!validPassword)
    {
      res.status(400).json({message: 'Incorrect password!'});
      return;
    }

    res.json({user: dbUserData, message: 'Logged in!'});

  });
});

router.put('/:id',(req,res)=>{
    Employee.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      })
        .then(dbUserData => {
          if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Employee.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;