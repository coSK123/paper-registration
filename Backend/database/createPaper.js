import { getActiveSemester } from "./getActiveSemester.js";
import  PaperEntry  from "../model/paperEntry.js";


export async function createPaper(paper) {
    const { title, description, creator, groupsize } = paper;
    if (!title || !description || !creator || !groupsize)
        return { message: "Not all required fields were filled out" };

    try {
        console.log(groupsize + "Here it isssssssssss!!!!!!");
        const semesterid = await getActiveSemester();

        const paperEntry = await PaperEntry.create({
            title: title,
            description: description,
            creator: creator,
            groupSize: groupsize,
            semesterId: semesterid
        });


        return paperEntry.id;
    } catch (err) {
        console.log(err);
    }
}