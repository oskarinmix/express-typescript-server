import { Request, Response } from "express";
import { getFileFromS3, uploadFileToS3 } from "../utils/s3.handle";

const getImage = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    const resp = await getFileFromS3(key);
    resp.Body?.pipe(res);
  } catch (error) {
    console.log("error", error);
    res.status(404).send("File not found");
  }
};
const uploadImage = async (req: Request, res: Response) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  const photos = req.files;
  const photoArray: any = [];
  for (const key in photos) {
    photoArray.push(photos[key]);
  }
  const promises: any = [];
  photoArray.map((ph: any, idx: number) => {
    const newName = req.body.name + `-${idx + 1}.` + ph.name.split(".").pop();
    promises.push(
      uploadFileToS3({
        ...ph,
        name: newName,
      })
    );
  });
  try {
    const resp = await Promise.all(promises);
    return res.send(resp);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Error uploading file");
  }
};
export { getImage, uploadImage };
