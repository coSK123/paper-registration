import { getActiveSemester } from "./getActiveSemester";


export async function createPaper(paper) {
    const { title, description, creator, groupsize } = paper;
    if (!title || !description || !creator || !groupsize)
        return { message: "Not all required fields were filled out" };

    try {
        const semesterid = getActiveSemester();
        const paperEntry = await PaperEntry.create({
            title: title,
            description: description,
            creator: creator,
            groupsize: groupsize,
            semesterId: semesterid
        });


        return paperEntry.id;
    } catch (err) {
        console.log(err);
    }
}