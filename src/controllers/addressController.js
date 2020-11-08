const AddresseService = require("../services/addressService");

const getAddressById = async(req, res) => {
    const id = req.params.id;
    let address = await AddresseService.findById(id);
    if (!address) {
        return res.status(400).json({ message: "Addresses not found" });
    }
    return res.json(address);

}
const createAddress = async(req, res) => {
    const { id, cityId, counteryId } = req.body;

    let address = await AddresseService.findById(id);
    if (!address) {
        const data = {...req.body };
        address = await AddresseService.insertOne(data);
        return res.status(201).json(data)
    }
    return res.status(400).json({ message: "Addresses found" });
}

const updateAddress = async(req, res) => {
    const { cityId, counteryId } = req.body;
    const id = req.params.id;
    let address = await AddresseService.findById(id);
    if (!address) {
        return res.status(400).json({ message: "address not found" });
    }
    const data = {...req.body }
    address = await AddresseService.updateOne(data);
    res.json(address);
}
const deleteAddressById = async(req, res) => {
    const id = req.params.id;
    let address = await AddresseService.findById(id);
    if (!address) {
        return res.status(400).json({ message: "address not found" });
    }
    address = await AddresseService.removeById(id);
    return res.json(address);
}
module.exports = {
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddressById
}