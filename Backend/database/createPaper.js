import { getActiveSemester } from "./getActiveSemester.js";
import PaperEntry from "../model/paperEntry.js";

export async function createPaper(paper) {
    const { title, description, creator, groupsize } = paper;
   
    if (!title || !description || !creator || !groupsize) {
        throw new Error("Not all required fields were filled out");
    }

    try {
       
        const semesterId = await getActiveSemester();
        
        if (!semesterId) {
            throw new Error("No active semester found and couldn't create one");
        }
        
        console.log(`Creating paper entry with semester ID: ${semesterId}`);
        
       
        const paperEntry = await PaperEntry.create({
            title: title,
            description: description,
            creator: creator,
            groupSize: groupsize,
            semesterId: semesterId
        });

        console.log(`Paper entry created with ID: ${paperEntry.id}`);
        return paperEntry.id;
    } catch (err) {
        console.error("Error creating paper entry:", err);
        throw err; 
    }
}