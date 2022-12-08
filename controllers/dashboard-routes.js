const router = require('express').Router();
const sequelize = require('../config/connection');
const { Task,Manager, Employee } = require('../models');
const withAuth = require('../utils/auth');

//displayes all tasks that relates to the logged in session id, and checks if loggedIn using middleware 
router.get('/', withAuth, (req, res) => {
    Task.findAll({
      where: {
        // use the ID from the session
        manager_id: req.session.manager_id
      },
      attributes: [
        'id',
        'title',
        'deadline',
        'created_at',
      ],
      include: [
        {
            model: Manager,
            attributes: ['first_name', 'last_name'],
        },
        {
          model: Employee,
          attributes: ['id', 'first_name', 'last_name'],
          }
      ]
    })
      .then(dbTaskData => {
        // serialize data before passing to template
        const tasks = dbTaskData.map(task => task.get({ plain: true }));
        res.render('dashboard', { tasks, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //gets particualr tasks and renders them in the webpage
  router.get('/edit/:id',withAuth,(req,res)=>{
    Task.findByPk(req.params.id,{
      attributes:[
        'title',
        'deadline'
      ],
      include:[{model:Employee, attributes:['id']}]
    })
    .then(dbTaskData =>{
      if(dbTaskData)
      {
        const task = dbTaskData.get({plain:true});

      res.render('edit-task',{
        task,
        loggedIn: true
      });
      }
      else
      {
        res.status(404).end();
      }
    })
    .catch(err=>{
      res.status(500).json(err);
    });
  });

module.exports = router;