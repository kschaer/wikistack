const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');
const { Page, User } = require("../models");

router.get('/', async (req, res, next) => {
  //res.send('at the GET /wiki/')
  try{
    const allPages = await Page.findAll();
    res.send(main(allPages));
  }catch (error){
    next(error);
  }

});

router.post('/', async (req, res, next) => {
  //res.send('at the POST /wiki/')
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  try {
    const [user, wasCreated ] = await User.findOrCreate({
      where:{
        name: req.body.name,
        email: req.body.email
      }
    })
    await page.save();
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);

  }catch (error){
    next(error);
  }
});

router.get('/add', async (req, res, next) => {
  try{
    res.send(addPage());
    // await Page.save();
    // res.redirect(`/wiki/${page.slug}`);
  }catch (error){
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  //res.send(`hit dynamic route at ${req.params.slug}`);
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    //res.json(page);
    res.send(wikiPage(page));
  }catch (error){
    console.error(error);
    next(error);
  }
});


module.exports = router;
