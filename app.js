const express = require('express')
const app = express()
const port = 4002
const {DBConnection} = require('./db');
const userModel = require("./userModel");
const productModel = require("./productModel");
const courseModel = require("./courseModel");
const {courseFeed, productFeed, userFeed} = require("./feed");

DBConnection().then(async () => {
    app.listen(port, () => {
        console.log(`run > http://localhost:${port}`)
    });

    app.get("/", (req, res) => {
        res.json({
            "1. Create products and courses": `> http://localhost:${port}/create-feeds`,
            "2. Create users": `> http://localhost:${port}/create-users`,
            "3. find users": `> http://localhost:${port}/find-users`,
        })
    })

    app.get("/create-feeds", async (req, res) => {
        const products = await productModel.create(productFeed);
        const courses = await courseModel.create(courseFeed);

        res.json({
            home: `> http://localhost:${port}/`,
            products,
            courses,
        })
    })

    app.get("/create-users", async (req, res) => {
        const products = await productModel.find();
        const courses = await courseModel.find();

        if (!products || !products.length || !courses || !courses.length)
            return res.json({
                message: `create feeds first > http://localhost:${port}/create-feeds`,
                home: `> http://localhost:${port}/`,
            })

        await userModel.create({
            name: userFeed[0].name,
            bought: products[0]._id,
            docModel: "Product"
        })

        await userModel.create({
            name: userFeed[1].name,
            bought: courses[0]._id,
            docModel: "Course"
        })

        await userModel.create({
            name: userFeed[2].name,
            bought: [products[0]._id, products[1]._id],
            docModel: "Product"
        })

        await userModel.create({
            name: userFeed[3].name,
            bought: [courses[0]._id, courses[1]._id],
            docModel: "Course"
        })

        await userModel.create({
            name: userFeed[4].name,
            bought: [products[0]._id, courses[0]._id],
            docModel: ["Course", "Product"]
        })

        res.json({
            message: `users has been created > http://localhost:${port}/find-users`,
            home: `> http://localhost:${port}/`,
        })
    })

    app.get("/find-users", async (req, res) => {
        const users = await userModel.find().populate({
            path: "bought"
        });

        if (!users || !users.length)
            return res.json({
                message: `create users first > http://localhost:${port}/create-users`,
                home: `> http://localhost:${port}/`,
            })

        res.json({
            users
        })
    })

})

