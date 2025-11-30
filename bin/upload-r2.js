const fs = require('fs');
const crypto = require('crypto');
const { spawn } = require('child_process');

const accountId = process.argv[2];
const accessKeyId = process.argv[3];
const secretAccessKey = process.argv[4];
const bucketName = process.argv[5];
const publicUrl = process.argv[6];
const filePath = process.argv[7];
const folder = process.argv[8] || '';

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !filePath) {
  console.error('Usage: node upload-r2.js <accountId> <accessKeyId> <secretAccessKey> <bucketName> <publicUrl> <filePath> [folder]');
  process.exit(1);
}

const fileContent = fs.readFileSync(filePath);
const fileHash = crypto.createHash('md5').update(fileContent).digest('hex').substring(0, 6);
const timestamp = new Date().toISOString().replace(/[-:T.]/g, '-').slice(0, 15);

// Clean folder path: remove leading/trailing slashes
const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
const key = cleanFolder 
  ? `mysay/${cleanFolder}/${timestamp}_${fileHash}.mp3`
  : `mysay/${timestamp}_${fileHash}.mp3`;

const host = `${bucketName}.${accountId}.r2.cloudflarestorage.com`;
const method = 'PUT';
const service = 's3';
const region = 'auto';
const algorithm = 'AWS4-HMAC-SHA256';

const now = new Date();
const amzDate = now.toISOString().replace(/[:\-]|\.\d{3}/g, '');
const dateStamp = amzDate.slice(0, 8);

const payloadHash = crypto.createHash('sha256').update(fileContent).digest('hex');

// Canonical Request
const canonicalUri = `/${key}`;
const canonicalQuerystring = '';
const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
const canonicalRequest = `${method}\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

// String to Sign
const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;

// Signing Key
const kDate = crypto.createHmac('sha256', `AWS4${secretAccessKey}`).update(dateStamp).digest();
const kRegion = crypto.createHmac('sha256', kDate).update(region).digest();
const kService = crypto.createHmac('sha256', kRegion).update(service).digest();
const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();

// Signature
const signature = crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex');

// Authorization Header
const authorizationHeader = `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

const url = `https://${host}/${key}`;

const curl = spawn('curl', [
  '-s', '-v',
  '-X', 'PUT',
  '-H', `Authorization: ${authorizationHeader}`,
  '-H', `x-amz-date: ${amzDate}`,
  '-H', `x-amz-content-sha256: ${payloadHash}`,
  '-H', 'Content-Type: audio/mpeg',
  '--data-binary', `@${filePath}`,
  url
]);

let stderr = '';

curl.stderr.on('data', (data) => {
  stderr += data.toString();
});

curl.on('close', (code) => {
  if (code === 0) {
    // Check if the upload was actually successful by looking at stderr/stdout or just assuming 0 is good?
    // curl -v writes headers to stderr. We should check for 200 OK.
    if (stderr.includes('< HTTP/1.1 200') || stderr.includes('< HTTP/1.1 201')) {
      const finalUrl = publicUrl 
        ? `${publicUrl.replace(/\/$/, '')}/${key}`
        : `https://${bucketName}.r2.dev/${key}`;
      console.log(finalUrl);
      process.exit(0);
    } else {
      console.error('Upload failed. Curl output:');
      console.error(stderr);
      process.exit(1);
    }
  } else {
    console.error(`Curl process exited with code ${code}`);
    console.error(stderr);
    process.exit(1);
  }
});
