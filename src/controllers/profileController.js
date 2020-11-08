const ProfileService = require("../services/profileService");
const getProfileById = async(req, res) => {
    const id = req.params.id;

    const profile = await ProfileService.findById(id);
    if (!profile) {
        return res.status(400).json({ message: "Profile not found" });
    }
    return res.json(profile);
}

const createProfile = async(req, res) => {
    const { id, userName } = req.body;
    let profile = await ProfileService.findById(id);

    if (!profile) {
        const data = {...req.body };
        profile = await ProfileService.insertOne(data);
        return res.status(201).json(profile);
    }
    return res.status(400).json({ message: "Profile found" });
}
const updateProfile = async(req, res) => {

    const { userName } = req.body;
    const id = +req.params.id;
    let profile = await ProfileService.findById(id);


    if (!profile) {
        return res.status(400).json({ message: "Profile not found" });
    }
    const data = { id, userName };
    profile = await ProfileService.updateOne(data);
    res.json(profile);
}
const deleteProfileById = async(req, res) => {
    const id = req.params.id;
    let profile = await ProfileService.findById(id);
    if (!profile) {
        return res.status(400).json({ message: "Profile not found" });
    }
    profile = await ProfileService.removeById(id);
    return res.json(profile);
}

module.exports = {
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfileById
}