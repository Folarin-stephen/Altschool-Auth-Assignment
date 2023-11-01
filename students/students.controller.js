const db = require('./students.db')

const GetStudents = (req, res) => {
    console.log({headers: req.headers});
    const query = req.query

    let studentsArrayDuplicate = db.students;
    if (query.progam) {
        studentsArrayDuplicate = studentsArrayDuplicate.filter(std => std.progam.includes(query.progam))
    }

    if (query.limit) {
        studentsArrayDuplicate = studentsArrayDuplicate.slice(0, req.limit - 1)
    }

    if (query.search) {
        studentsArrayDuplicate = studentsArrayDuplicate.filter(std => std.progam.includes(query.search) || std.name.includes(query.search) || std.department.includes(query.search))
    }

    res.status(200).json({
        data: studentsArrayDuplicate,
        error: null
    })
}

const createStudents = (req, res) => {

    const student = req.body;
    student.id = Math.floor(Math.random() * 20)
    db.students.push(student)

    return res.status(201).json({
        data: db.students,
        error: null
    })
}

const getOneStudent = (req,res)=>{
    const id = req.params.id 
    const foundStudent = db.students.find((student)=>{
        return student.id == parseInt(id)
    })
    if(!foundStudent){
        res.status(404).send(`Item not found`)
    }
    res.status(200).json(foundStudent)
}


module.exports = {
    GetStudents,
    getOneStudent,
    createStudents
}