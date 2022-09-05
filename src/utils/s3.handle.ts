import {
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3,
} from "@aws-sdk/client-s3";

import fs from "fs";
import util from "util";

const unlinkFile = util.promisify(fs.unlink);

interface File {
  name: string;
  data: Buffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: any;
}
const uploadFileToS3 = async (
  file: File | any
): Promise<PutObjectCommandOutput | any> => {
  const fileStream = fs.createReadStream(file.tempFilePath);
  const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || "",
      secretAccessKey: process.env.AWS_SECRET_KEY || "",
    },
  });
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.name,
    Body: fileStream,
  };

  const resp = await s3.send(new PutObjectCommand(params));
  console.log(resp);
  const data = {
    etag: resp.ETag?.replace('"', "").replace('"', "").replace('"', ""),
    path: `/images/${file.name}`,
  };
  await unlinkFile(file.tempFilePath);
  return data;
};
const getFileFromS3 = async (
  key: string
): Promise<GetObjectCommandOutput | any> => {
  const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || "",
      secretAccessKey: process.env.AWS_SECRET_KEY || "",
    },
  });
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };
  return s3.getObject(params);
};

export { uploadFileToS3, getFileFromS3 };
