const { products, user } = require('../../models')

exports.addProduct = async (req, res) => {
    
    try {
        const data = {
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            image: req.file.filename,
            qty: req.body.qty,
            idUser: req.user.id
        }

        let newProduct = await products.create(data)

        let productData = await products.findOne({
            where: {
                id: newProduct.id
            },
            include : [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                      exclude: ['createdAt', 'updatedAt', 'password']
                    }
                }
            ],
            attributes: {
                exclude: ['idUser', 'createdAt', 'updatedAt']
            }
        })

        productData = JSON.parse(JSON.stringify(productData))

        res.send({
            status: 'Success',
            data: {
              ...productData,
              image: process.env.PATH_FILE + productData.image
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }

}

exports.getAllProducts = async (req, res) => {
    try {

        let product = await products.findAll({
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    }
                }
            ],
            attributes: {
                exclude: ['idUser', 'createdAt', 'updatedAt']
            }
        })

        product = JSON.parse(JSON.stringify(product))

        product = product.map((item) => {
            return {
                ...item,
                image: process.env.PATH_FILE + item.image
            }
        })

        res.send({
            status: 'Success',
            data : {
                product
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

exports.getProduct = async (req, res) => {


    try {

        const { id } = req.params

        let product = await products.findOne({
            where: {
                id
            },
            // include : [
            //     {
            //         model: user,
            //         as: 'user',
            //         attributes: {
            //             exclude: ['createdAt', 'updatedAt', 'password']
            //         }
            //     }
            // ],
            attributes: {
                exclude: ['idUser', 'createdAt', 'updatedAt']
            }
        })

        product = JSON.parse(JSON.stringify(product))

        product = {
            ...product,
            image : process.env.PATH_FILE + product.image
        }

        res.send({
            status: 'Success',
            data : {
                product
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }

}

exports.updateProduct = async (req, res) => {
    

    try {
        const { id } = req.params

        const product = {
            name: req?.body?.name,
            desc: req?.body?.desc,
            price: req?.body?.price,
            image: req?.file?.filename,
            qty: req?.body?.qty,
            idUser: req?.user?.id
        }

        await products.update(product, {
            where: {
                id
            }
        })

        res.send({
            status: 'Success',
            data: {
                id,
                product,
                image: req?.file?.filename
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }

}

exports.deleteProduct = async (req, res) => {
    try {
        
        const { id } = req.params

        await products.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'Success',
            message: `Delete products with id ${id} successful`
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}