const router = require('express').Router();
const {Manager, Task, Employee} = require('../../models');

router.get('/',(req, res)=>{
    Manager.findAll({
      attributes:{exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Manager.findOne({
      attributes:{exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Task,
            attributes: ['id','title','deadline','created_at'],
            include: {
              model: Employee,
              attributes: ['first_name', 'last_name']
            }
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
    Manager.create({
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
  Manager.findOne({
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
    Manager.update(req.body, {
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
    Manager.destroy({
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