const {Router} = require('express');
const router = Router();
const db = require('../models')


const obtainUsers = async (req, res) => {
    try {
        const users = await db.user.findAll()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Error interno del servidor'})
    }
}

const obtainUserById = async (req, res) => {
    try {
        const nickName = req.body
        const user = await db.user.findByPk(nickName)
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Error interno del servidor'})
    }

};

const createUser = async (req, res) => {
    try {
        const {nickName,lastName,firstName,birthdate,email} = req.body
        const hoy = new Date()
        const edad = hoy.getFullYear() - birthdate.getFullYear() //calculo la edad masomenos, para hacerlo mas fino habria que sacar los meses tmbn
        const user = await db.user.create({
            nickName,
            lastName,
            firstName,
            birthdate,
            age: edad,
            email
        })
        res.send(400).json(user)
    } catch (error) {
        res.status(500).json({message:'Error interno del servidor'})
    }
};

const updateUser = async (req, res) => {
};

const deleteUser = async (req, res) => {
};

module.exports = router;

