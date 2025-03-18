import Semester from '../model/semester.js';

export async function getActiveSemester() {
    try {
        // Find active semesters
        const semesters = await Semester.findAll({
            where: {
                active: true
            }
        });

        // If an active semester exists, return its ID
        if (semesters.length > 0) {
            console.log('Found active semester:', semesters[0].id);
            return semesters[0].id;
        }
        
        // No active semester, try to find any semester
        const allSemesters = await Semester.findAll({
            limit: 1
        });
        
        if (allSemesters.length > 0) {
            // Make the first semester active
            await allSemesters[0].update({ active: true });
            console.log('Made semester active:', allSemesters[0].id);
            return allSemesters[0].id;
        }
        
        // No semesters at all, create a default one
        const defaultSemester = await Semester.create({
            name: 'Default Semester',
            active: true
        });
        console.log('Created default semester:', defaultSemester.id);
        return defaultSemester.id;
    } catch (err) {
        console.error('Error getting active semester:', err);
        throw err; // Re-throw to be handled by the caller
    }
}