const CompanySerivce = require("../services/companyService");

const getCompanyById = async(req, res) => {
    const id = req.params.id;
    const company = await CompanySerivce.findById(id);
    if (!company) {
        return res.status(400).json({ message: "Company not found" });
    }
    return res.json(company);

}

const createCompany = async(req, res) => {
    const { id, name, profileId, addressId } = req.body;

    let company = await CompanySerivce.findById(id);
    if (!company) {
        const data = {...req.body };
        company = await CompanySerivce.insertOne(data);
        return res.status(201).json(company);
    }
    return res.status(400).json({ message: "Company found" });
}
const updateCompany = async(req, res) => {
    const { id, name, profileId, addressId } = req.body;

    let company = await CompanySerivce.findById(id);
    if (!company) {
        return res.status(400).json({ message: "company not found" });
    }
    const data = {...req.body }
    company = await CompanySerivce.updateOne(data);
    res.json(company);
}
const deleteCompany = async(req, res) => {
    const id = req.params.id;
    let company = await CompanySerivce.findById(id);
    if (!company) {
        return res.status(400).json({ message: "company not found" });
    }
    company = await CompanySerivce.removeById(id);
    return res.json(company);
}

module.exports = {
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}