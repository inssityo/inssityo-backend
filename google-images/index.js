const readline = require("readline");
const { google } = require("googleapis");
const fs = require("fs");

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

exports.createFolder = (name) => {
  var fileMetadata = {
    name: name,
    mimeType: "application/vnd.google-apps.folder",
  };
  drive.files.create(
    {
      resource: fileMetadata,
      fields: "id",
    },
    function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("Folder Id: ", file.id);
        return file.id;
      }
    }
  );
};

exports.uploadToFolder = (folderId, photoName, photo) => {
  var folderId = "0BwwA4oUTeiV1TGRPeTVjaWRDY1E";
  var fileMetadata = {
    name: photoName,
    parents: [folderId],
  };
  var media = {
    mimeType: "image/*",
    body: fs.createReadStream(photo),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("File Id: ", file.id);
      }
    }
  );
};

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
exports.listFiles = (auth) => {
  const drive = google.drive({ version: "v3", auth });
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
