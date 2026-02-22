import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Uploads a file to S3 and returns its public URL.
 * @param file - The File object to upload
 * @param folder - Optional folder prefix (e.g. "board-members", "projects")
 */
export async function uploadToS3(file: File, folder = "uploads"): Promise<string> {
  const ext = file.name.split(".").pop();
  const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
    Key: key,
    Body: await file.arrayBuffer().then((buf) => new Uint8Array(buf)),
    ContentType: file.type,
  });

  await s3Client.send(command);

  const bucketUrl = import.meta.env.VITE_AWS_BUCKET_URL as string;
  return `${bucketUrl.replace(/\/$/, "")}/${key}`;
}
