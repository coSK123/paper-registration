import Semester from "../model/semester.js";

export const getActiveSemester = async (req, res) => {
    try {
        
        const activeSemester = await Semester.findOne({ where: { active: true } });
        if(activeSemester){
            res.json(activeSemester);
        } else{
            res.json({name:"", active:false});
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getSemesters = async (req, res) => {
    try {
        const semesters = await Semester.findAll();
        res.json(semesters);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const activateSemester = async (req, res) => {
    let semester = req.body;
    console.log("SEMESTER: "+semester.name)
    try{
        let databaseSemester = await Semester.findOne({ where: { name:semester.name } })
        console.log("DATABASE SEMESTER: "+databaseSemester)
        if(!databaseSemester){
            await Semester.update({active:false}, {where:{active:true}})
            await Semester.create({name:semester.name, active:true})
        } else{
            await Semester.update({active:false}, {where:{active:true}})
            await databaseSemester.update({active:true})
        }
        res.status(201).json({success: `Semester ${semester.name} activated!`});
    }
    catch (error) {
        res.status(500).send(error.message);
    }

}

