const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')


router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("Pagina de posts")
})

router.get('/categorias', (req, res) => {
    Categoria.find().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', "Houve um erro ao listar as categorias")
        req.redirect('/admin')
    })
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({text: "Nome invalido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({text: "Slug invalido"})
    }

    if(erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
        req.flash('success_msg', 'Categoria criada com sucesso!')
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req,flash('error_msg', 'Houve um erro ao salvar a categoria!')
        req.redirect('/admin')
    })
  }
})

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        res.render('admin/editcategorias', {categoria: categoria})
    }).catch((err) => {
        req.flash('error_msg', 'Esta categoria não existe')
        res.redirect('/admin/categorias')
    })
})

router.post('/categorias/edit', (req, res) => {

    Categoria.findOne({_id: req.body.id}).then((categoria) => {

        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            req.flash('success_msg', 'Categoria editada com sucesso!')
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um interno ao salvar a edição da categoria')
            req.redirect('/admin/categorias')
        })

    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao editar a categoria')
        res.redirect('/admin/categorias')
    })
})

router.post('/categorias/deletar', (req, res) => {
    Categoria.remove({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso!')
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao deletar a categoria')
        res.redirect('admin/categorias')
    })
})

router.get('/teste', (req, res) => {
    res.send('Isso e um teste')
})


module.exports = router