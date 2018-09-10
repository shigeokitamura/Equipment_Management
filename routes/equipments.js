const express = require('express');
const router = express.Router();
const Equipment = require('../models/equipment');
const User = require('../models/user');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else return res.redirect('/equipment/');
}

router.get('/', (req, res, next) => {
  Equipment.info
  .findAll()
  .then(equipments_info => {
    Equipment.manage
    .findAll()
    .then(equipments_manage => {
      User
      .findAll()
      .then(user => {
        res.render('equipment_list', {
          title: '備品一覧',
          user: req.user,
          equipments_info: equipments_info,
          equipments_manage: equipments_manage,
          equipments_user: user,
          error: req.flash('error')
        });
      });
    });
  });
});

router.get('/new', isAuthenticated, (req, res, next) => {
  res.render('equipment_new',
  {
    title: '備品新規登録',
    error: req.flash('error'),
    user: req.user
  });
});

router.post('/new', isAuthenticated, (req, res, next) => {
  Equipment.manage.findOne({where: {barcode: req.body.barcode} })
  .then(equipment => {
    if (!equipment) {
      Equipment.info.create(req.body)
      .then(() => {
        Equipment.manage.create(req.body)
        .then(() => {
          res.redirect('/equipment/equipments');
        });
      });
    } else {
      req.flash('error', '既に登録されています');
      res.redirect('/equipment/equipments/new');
    }
  });
});

router.get('/detail/:equipment_id', (req, res, next) => {
  Equipment.info
  .findOne({ where: {id: req.params.equipment_id } })
  .then(equipment_info => {
    Equipment.manage
    .findOne({ where: {id: req.params.equipment_id } })
    .then(equipment_manage => {
      res.render('equipment_detail',
      {
        title: '備品の詳細',
        error: req.flash('error'),
        user: req.user,
        equipment_info: equipment_info,
        equipment_manage: equipment_manage
      });
    });
  });
});

router.get('/checkout', isAuthenticated, (req, res, next) => {
  if (req.query.barcode) {
    Equipment.info
    .findOne({ where: {barcode: req.query.barcode } })
    .then(equipment_info => {
      if (equipment_info) { // 備品が見つかった
        Equipment.manage
        .findOne({ where: {barcode: req.query.barcode } })
        .then(equipment_manage => {
          res.render('equipment_checkout',
          {
            title: '備品を借りる',
            error: req.flash('error'),
            user: req.user,
            equipment_info: equipment_info,
            equipment_manage: equipment_manage
          });
        });
      } else { // 備品が見つからなかった
        req.flash('error', '備品が見つかりませんでした．');
        res.render('equipment_checkout',
        {
          title: '備品を借りる',
          error: req.flash('error'),
          user: req.user,
          equipment_info: null,
          equipment_manage: null
        });
      }
    });
  } else {
    res.render('equipment_checkout',
    {
      title: '備品を借りる',
      error: req.flash('error'),
      user: req.user,
      equipment_info: null,
      equipment_manage: null
    });
  }
});

router.post('/checkout', isAuthenticated, (req, res, next) => {
  //res.send(req.body);
  const date = new Date();
  const date_str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  Equipment.manage
  .findOne({ where: {barcode: req.body.barcode } })
  .then(equipment_manage => {
    if(equipment_manage.isBorrowed) {
      res.send('ERROR');
    } else {
      Equipment.manage
      .update({
        borrowedBy: req.body.user,
        isBorrowed: true,
        borrowedAt: date_str
      },
        {where: {id: equipment_manage.id}
      })
      .then(result => {
        console.log(result);
        res.redirect('/equipment/equipments');
      });
    }
  });
});

router.get('/return', isAuthenticated, (req, res, next) => {
  Equipment.info
  .findAll()
  .then(equipments_info => {
    Equipment.manage
    .findAll({
      where: {borrowedBy: req.user.userid}
    }).then(equipments_manage => {
      res.render('equipment_return',
      {
        title: '備品を返却する',
        error: req.flash('error'),
        user: req.user,
        equipments_info: equipments_info,
        equipments_manage: equipments_manage
      });
    });
  });
});

router.post('/return', isAuthenticated, (req, res, next) => {
  const date = new Date();
  const date_str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  Equipment.manage
  .findOne({ where: {barcode: req.body.barcode } })
  .then(equipment_manage => {
    if(!equipment_manage.isBorrowed) {
      res.send('ERROR');
    } else {
      Equipment.manage
      .update({
        isBorrowed: false,
        borrowedBy: req.body.user,
        borrowedBy: null,
        borrowedAt: null,
        returnedBy: req.body.user,
        returnedAt: date_str
      },
        {where: {id: equipment_manage.id}
      })
      .then(result => {
        console.log(result);
        res.redirect('/equipment/equipments/return');
      });
    }
  });
});

module.exports = router;
