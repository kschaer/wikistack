const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');
const { Page, User } = require("../models");

router.get("/", async (req, res, next) => {
  try{
    const users = await User.findAll();
    res.send(userList(users));
  }catch(error){
    next(error);
  }
});

//wildcard url for individual users GET
router.get('/:userId', async (req, res, next) => {
  const oneUser = await User.findById(req.params.userId);
  const pages = await Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });
  try{
    res.send(userPages(oneUser, pages));
  }catch (error){
    next(error);
  }
});

module.exports = router;
