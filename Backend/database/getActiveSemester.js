import Semester from '../model/semester.js';

export async function getActiveSemester() {
    try {
        
        const semesters = await Semester.findAll({
            where: {
                active: true
            }
        });

       
        if (semesters.length > 0) {
            console.log('Found active semester:', semesters[0].id);
            return semesters[0].id;
        }
        
       
        const allSemesters = await Semester.findAll({
            limit: 1
        });
        
        if (allSemesters.length > 0) {
           
            await allSemesters[0].update({ active: true });
            console.log('Made semester active:', allSemesters[0].id);
            return allSemesters[0].id;
        }
        
       
        const defaultSemester = await Semester.create({
            name: 'Default Semester',
            active: true
        });
        console.log('Created default semester:', defaultSemester.id);
        return defaultSemester.id;
    } catch (err) {
        console.error('Error getting active semester:', err);
        throw err; 
    }
}