const uuid = require("uuid");
let inventories = require("./data/inventories.json")
const fs = require("fs");
const path = require("path");





const createInventory = (req, res) => {
    req.inventories = inventories
    const inventory = req.body;
    inventory.id = uuid.v4();
    req.inventories.push(inventory);
    writeFiles(req.inventories);
   return res.status(201).json({
        data: inventories,
        error: null
    })
}

// const GetInventories = (req, res) => {
// const query = req.query
// let inventoriesDuplicate = inventories
// if (query.price) {
//     inventoriesDuplicate = inventoriesDuplicate.filter(std => std.price.includes(query.price))
// }

// if (req.limit) {
//     inventoriesDuplicate = inventoriesDuplicate.slice(0, req.limit -1)
// }

// if (req.search) {
//     inventoriesDuplicate = inventoriesDuplicate.filter(std => std.search.includes(query.search))
// }
//     res.status(200).json({
//         data: inventoriesDuplicate,
//         error: null
//     })
// }

const getSpecificInventory = (req, res) => {
    req.inventories = inventories
    const id = req.params.id
    let filteredInventory = req.inventories.filter((inventory) => {
        return inventory.uuid === id;
    })
    if (filteredInventory.length > 0) {
       return res.status (200).json({
            data: filteredInventory,
            error: null
        });
       
    } else {
        res.status (404).json({
            data: null,
            error: "Inventory not found"
        });
      
    }
}

const delInventory = (req, res) => {
    const id = req.params.id
    req.inventories = inventories
    const index = req.inventories.findIndex((inventory) => {
    return inventory.uuid === id  
    });
    if (index === -1) {
       return res.status(404).json({ 
            Data: null, 
            error: "Inventory not found" 
        })
        
    } else {
        req.inventories.splice(index, 1);
        writeFiles(req.inventories);
        res.status(204).json({
            Data: req.inventories,
            error: null })
    }
}

const updateInventory = (req, res) => {
   try {
    const id = req.params.id
    req.inventories = inventories
    const index = req.inventories.findIndex((inventory) => {
        return inventory.uuid === id  
        });
        if (index === -1) {
            res.status(404).json({
                data: null,
                error: "Inventory not found"
            })
            res.write(JSON.stringify({title: "Not found", message: "Inventory not found"}));
            res.end();
        
       } else {
        req.inventories[index] = {id, ...body}
        writeToFile(req.inventories)
        res.status(202).json({
            data: req.inventories[index],
            error: null
        })
       };
} catch (error) {
    console.log(error)
} 
   };


const writeFiles = (req, res, next) => {
    req.inventories = inventories
    try {
        fs.writeFileSync(path.join(__dirname, ".", "data", "inventories.json"), JSON.stringify(req.inventories), "utf-8")
    } catch (error) {
        console.log(error)
    }
    
}






module.exports = {
    // GetInventories,
    createInventory,
    getSpecificInventory,
    delInventory,
    updateInventory
}