import  Semester  from '../model/semester.js';

export async function getActiveSemester() {
    try {
        const semesters = await Semester.findAll({
            where: {
                active: true
            }
        });
        if(semesters.length === 0) {
            return 1;
        }
        return semesters[0].id;
    } catch (err) {
        console.log(err);
    }
   
}