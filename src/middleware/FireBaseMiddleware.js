async function FireBaseUploadImage(newName, userid, folderparentname) {
    var folder = "";
    if (folderparentname != "-1") {
        folder = folderparentname + "/";
    }

    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: newName
        },
        contentType: 'image/jpeg',
        cacheControl: 'public, max-age=31536000',
    };

    await global.FirebaseBucket.upload('./uploadfiles/' + newName, {
        metadata: metadata,
        destination: userid + "/library/" + folder + newName,
    });
    
    console.log(`${'./uploadfiles/' + folder + newName} uploaded.`);
    const file = await global.FirebaseBucket.file(userid + "/library/" + folder + newName);
    return file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    }).then(signedUrls => {
        return signedUrls[0];
    });
}

async function FireBaseUploadProfilPicture(newName, userid) {
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: newName
        },
        contentType: 'image/jpeg',
        cacheControl: 'public, max-age=31536000',
    };

    await global.FirebaseBucket.upload('./uploadfiles/' + newName, {
        metadata: metadata,
        destination: userid + "/profilpicture/" + newName,
    });

    console.log(`${'./uploadfiles/' + newName} uploaded.`);
}

async function FireBaseDownloadFile(filename, folderparentname) {
    const folder = "";
    if (folderparentname != "-1") {
        folder = folderparentname;
    }

    const file = global.FirebaseBucket.file("files/" + folder + filename);

    return file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    }).then(signedUrls => {
        return (signedUrls[0]);
    });
}

async function FireBaseDownloadProfilePicture(filename, userid) {
    const file = await global.FirebaseBucket.file(userid + "/profilpicture/" + filename);
    return file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
    }).then(signedUrls => {
        return signedUrls[0];
    });
}

module.exports = {
    FireBaseUploadImage,
    FireBaseUploadProfilPicture,
    FireBaseDownloadFile,
    FireBaseDownloadProfilePicture,
}