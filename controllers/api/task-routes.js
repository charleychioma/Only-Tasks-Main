const router = require('express').Router();
const { Task, Manager, Employee } = require('../../models');
const employeeAuth = require('../../utils/employeeAuth');


//gets all tasks 
router.get('/', (req, res) => {
  Task.findAll({
    attributes: ['id', 'title', 'deadline', 'created_at'],
    include: [
      {
        model: Manager,
        attributes: ['first_name', 'last_name']
      },
      {
        model: Employee,
        attributes: ['first_name', 'last_name']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//gets one task
router.get('/:id', (req, res) => {
  Task.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'deadline', 'created_at'],
    include: [
      {
        model: Manager,
        attributes: ['first_name', 'last_name']
      },
      {
        model: Employee,
        attributes: ['first_name', 'last_name']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No task found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//creates a task
router.post('/', employeeAuth, (req, res) => {
  try {
    console.log("placeholder message")
    Task.create({
      ...req.body,
      // manager_id: req.session.manager_id,
      employee_id: req.session.employee_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

  }catch(err){
    console.log(err)
  }
});

//updates a task
router.put('/:id', (req, res) => {
  Task.update(
    {
      title: req.body.title,
      deadline: req.body.deadline,
      employee_id: req.body.employee_id
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No task found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//deletes a task
router.delete('/:id', (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No task found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;