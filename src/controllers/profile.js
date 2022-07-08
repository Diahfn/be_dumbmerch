const { profile, user } = require('../../models')

exports.addProfile = async (req, res) => {

    try {

        const pro = {
            phone: req.body.phone,
            gender: req.body.gender,
            address: req.body.address,
            image: req.file.filename,
            idUser: req.user.id
        }

        let newProfile = await profile.create(pro)

        let data = await profile.findOne({
            where: {
                id: newProfile.id
            }
        })

        data = JSON.parse(JSON.stringify(data))

        res.send({
            status: 'Success',
            data: {
                ...data,
                image: process.env.PATH_FILE + data.image
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