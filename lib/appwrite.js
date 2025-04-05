import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
export const appwriteconfig = {

    enpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.todolist',
    projectId: '67eacea70012fbbbd647',
    databaseId: '67ead08a003b8ea471c0',
    userCollectionId: '67ead0bb0036f3761607',
    notesCollectionId: '67ead0d600367b808b19',
    storageId: '67ead269001476f829cb'

    //     enpoint: 'complete',
    //     platform: 'complete',
    //     projectId: 'complete',
    //     databaseId: 'complete',
    //     userCollectionId: 'complete',
    //     notesCollectionId: 'complete',
    //     storageId: 'complete'

}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteconfig.enpoint) // Your Appwrite Endpoint
    .setProject(appwriteconfig.projectId) // Your project ID
    .setPlatform(appwriteconfig.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client)
const database = new Databases(client)
const storage = new Storage(client)

// Register User
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username)
        if (!newAccount) throw new Error;
        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)

        const newUser = await database.createDocument(appwriteconfig.databaseId,
            appwriteconfig.userCollectionId,
            ID.unique(),
            { accountId: newAccount.$id, email, username, avatar: avatarUrl })
        return newUser
    } catch (error) {
        throw new Error(error);

    }
}
export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error);

    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw new Error();
        const currentUser = database.listDocuments(appwriteconfig.databaseId, appwriteconfig.userCollectionId, [Query.equal('accountId', currentAccount.$id)])
        if (!currentUser) throw new Error();
        return (await currentUser).documents[0]
    } catch (error) {
        console.log(error)
    }
}
export const getNotesAboutToExpire = async (userId) => {
    try {
        const notes = await database.listDocuments(appwriteconfig.databaseId, appwriteconfig.notesCollectionId, [Query.equal('users', userId), Query.orderDesc('datelimit', Query.limit(5))])
        return notes.documents
    } catch (error) {
        throw new Error(error);

    }
}
export const searchNotes = async (query) => {
    try {
        const notes = await database.listDocuments(appwriteconfig.databaseId, appwriteconfig.notesCollectionId, [Query.search('title', query)])
        return notes.documents
    } catch (error) {
        throw new Error(error);

    }
}
export const getAllNotes = async (userId) => {
    try {

        const notes = await database.listDocuments(appwriteconfig.databaseId, appwriteconfig.notesCollectionId, [Query.orderDesc('$createdAt'), Query.equal('users', userId)],)
        return notes.documents
    } catch (error) {
        throw new Error(error);

    }
}
export const SignOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        throw new Error(error);

    }

}
export const getFilePreview = async (fileId, type) => {
    let fileUrl
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(appwriteconfig.storageId, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(
                appwriteconfig.storageId,
                fileId,
                2000,
                2000,
                'top',
                100)
        } else {
            throw new Error("Invalid fyle type");

        }
        if (!fileUrl) throw new Error;
        return fileUrl
    } catch (error) {
        throw new Error(error);

    }
}
export const uploadFile = async (file, type) => {
    if (!file) return

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(appwriteconfig.storageId,
            ID.unique(),
            asset)
        console.log(uploadedFile)

        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        console.log(fileUrl)
        return fileUrl
    } catch (error) {
        throw new Error(error);

    }
}
export const createNote = async (note) => {
    try {
        console.log(note, 'npotsass')
        let image
        let thumbnail
        if (note.image && note.thumbnail) {
             [thumbnail, image] = await Promise.all([
                uploadFile(note.thumbnail, 'image'),
                uploadFile(note.image, 'video')
            ])

        } else if (note.image && !note.thumbnail) {
          image= await uploadFile(note.image, 'image')

        }
        console.log('imagen:', image, 'thumbnail: ',thumbnail)
        // return
        const newNote = await database.createDocument(
            appwriteconfig.databaseId, appwriteconfig.notesCollectionId, ID.unique(),
            {
                title: note?.title,
                thumbnail: thumbnail || null,
                image: image || null, users: note.userId,
                description: note?.description || null,
                datelimit: note?.datelimit || null
            }
        )
        console.log(newNote, 'nota')
        return newNote
    } catch (error) {
        return new Error(error);

    }
}