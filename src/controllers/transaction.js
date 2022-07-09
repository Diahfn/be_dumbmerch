const { user, transaction, products, profile } = require('../../models')

exports.addTransaction = async (req, res) => {
    try {

        let data = req.body
        data = {
            // id: parseInt(data.idProduct + Math.random().toString().slice(3, 8)),
            ...data,
            idBuyer: req.user.id,
            status: 'pending'
        }

        const newData = await transaction.create(data)

        const buyerData = await user.findOne({
            include: {
                model: profile,
                as: 'profiles',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'idUser']
                }
            },
            where: {
                id: newData.idBuyer
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        res.send({ 
            status: 'Success',
            message: 'Add transaction is finished',
            data: {
                buyerData
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

exports.getTransaction = async (req, res) => {
    try {

        const idBuyer = req.user.id

        let data = await transaction.findAll({
            where: {
                idBuyer
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'idBuyer', 'idSeller', 'idProduct']
            },
            include: [
                {
                    model: products,
                    as: 'product',
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt',
                            'idUser',
                            'qty',
                            'price'
                        ]
                    }
                },
                {
                    model: user,
                    as: 'buyer',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
                {
                    model: user,
                    as: 'seller',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                }
            ]
        })

        data = JSON.parse(JSON.stringify(data))

        data = data.map((item) => {
            return {
                ...item,
                product: {
                    ...item.product,
                    image: process.env.PATH_FILE + item.product.image
                }
            }
        })

        res.send({ 
            status: 'Success',
            data: {
                data
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