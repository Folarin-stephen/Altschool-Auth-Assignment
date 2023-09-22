const checkInventory = (req, res, next) => {
    const validInventory = ["Indomie", 'SoyMilk','Dried Pepper', 'Sweet Potatoe'];

    if (!validInventory.includes(req.body.name)) {
    return res.status(422).json({
        data: null,
        error: 'Inventory not Valid'
    })
}

    next();
}
const checkId = (req, res, next) => {
const regexV4 = new RegExp(/^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i);

if (!regexV4.test(req.params.id)){
        res.status(400).json({ data: null,
        error: "Validation Failed"})
}else

next();
}

const writeFile = (req, res, next) => {
    try {
        fs.writeFileSync(path.join(__dirname, ".", "data", "inventories.json"), JSON.stringify(req.inventories), "utf-8")
    } catch (error) {
        console.log(error)
    }
    
}
module.exports = {
    checkInventory,
    checkId
}