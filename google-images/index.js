const readline = require("readline");
const { google } = require("googleapis");
const readable = require("stream").Readable;
const { file } = require("googleapis/build/src/apis/file");

//Convert buffer to readable stream for Drive upload.
function bufferToStream(buffer) {
  var stream = new readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}

//Initialize OAuth verification. Need to run this on server startup.
exports.initializeGoogleAuth = () => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URL
  );

  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: process.env.GOOGLE_DRIVE_SCOPE,
  });

  console.log(url);
  //Console input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();

    oAuth2Client.getToken(decodeURIComponent(code), (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      process.env.GOOGLE_TOKEN_RECEIVED = JSON.stringify(token);
      console.log("Token stored to", process.env.GOOGLE_TOKEN_RECEIVED);

      google.options({ auth: oAuth2Client });
      console.log("google auth success");
    });
  });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
exports.authorize = (credentials, callback) => {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  if (!process.env.GOOGLE_TOKEN_RECEIVED)
    return this.getAccessToken(oAuth2Client, callback);
  oAuth2Client.setCredentials(JSON.parse(process.env.GOOGLE_TOKEN_RECEIVED));
  callback(oAuth2Client);
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
exports.getAccessToken = (oAuth2Client, callback) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: process.env.GOOGLE_DRIVE_SCOPE,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  decodeURIComponent;
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(decodeURIComponent(code), (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      process.env.GOOGLE_TOKEN_RECEIVED = JSON.stringify(token);
      console.log("Token stored to", process.env.GOOGLE_TOKEN_RECEIVED);
      callback(oAuth2Client);
    });
  });
};

/**
 *
 * @param {String} name Foldername
 * @param {String} ParentFolder Parent folder ID.
 * @returns
 */
exports.createFolder = async (name, ParentFolder) => {
  var fileMetadata = {
    name: name,
    mimeType: "application/vnd.google-apps.folder",
    parents: [ParentFolder],
  };
  const drive = google.drive({ version: "v3" });
  try {
    const res = await drive.files.create({
      resource: fileMetadata,
      fields: "id",
    });
    return res.data.id;
  } catch (err) {
    return err;
  }
};

/**
 *
 * @param {String} folderId Photo folder id.
 * @param {String} photoName Name for saved photo.
 * @param {File} photo Picture to be saved
 * @returns
 */
exports.uploadToFolder = async (folderId, photoName, photo) => {
  console.log(photo);
  try {
    var fileMetadata = {
      name: photoName,
      parents: [folderId],
    };
    var media = {
      mimeType: photo.mimetype,
      body: bufferToStream(photo.buffer),
    };
    const drive = google.drive({ version: "v3" });

    const res = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    console.log("image addition success!");
    return res;
  } catch (err) {
    console.log("ERROR", err);
    return err;
  }
};

/**
 * Lists the names and IDs of up to 10 files.
 */
exports.listFiles = () => {
  const drive = google.drive({ version: "v3" });
  drive.files.list(
    {
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const files = res.data.files;
      if (files.length) {
        console.log("Files:");
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log("No files found.");
      }
    }
  );
};

//Get webContentLink for Img src use.
exports.getFileContentLink = (fileId) => {
  const drive = google.drive({ version: "v3" });
  drive.files.get({ fileId: fileId, fields: "*" }, (err, res) => {
    if (err) return "GET IMAGE ERR ", err;
    return res.data.webContentLink;
  });
};

//Delete file
exports.deleteFile = (fileId) => {
  const drive = google.drive({ version: "v3" });
  drive.files.delete({ fileId: fileId }, (err, res) => {
    if (err) return "DELETE ERR", err;
    return res;
  });
};

//Delete folder of given file and all files in it
exports.deleteParentFolder = (fileId) => {
  console.log("deleting all images");
  const drive = google.drive({ version: "v3" });
  drive.files.get({ fileId: fileId, fields: "parents" }, (err, res) => {
    if (err) return "ERROR FINDING PARENT", err;
    console.log(res.data);
    drive.files.delete({ fileId: res.data.parents }, (err, res) => {
      if (err) return "ERROR DELETING PARENT", err;
      console.log("PARENT DELETION SUCCESSFUL", res);
    });
  });
};
