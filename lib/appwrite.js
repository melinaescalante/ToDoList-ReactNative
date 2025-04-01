import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';
// export const appwriteconfig = {
    
//     enpoint: 'complete',
//     platform: 'complete',
//     projectId: 'complete',
//     databaseId: 'complete',
//     userCollectionId: 'complete',
//     notesCollectionId: 'complete',
//     storageId: 'complete'
// }
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteconfig.enpoint) // Your Appwrite Endpoint
    .setProject(appwriteconfig.projectId) // Your project ID
    .setPlatform(appwriteconfig.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client)
const database= new Databases(client)

// Register User
export const createUser = async ({ email, password, username }) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)
        if (!newAccount) throw new Error;
        const avatarUrl = avatars.getInitials(username)
        await signIn(email,password)
        const newUser=await database.createDocument(appwriteconfig.databaseId, appwriteconfig.userCollectionId, ID.unique(),{accountId:newAccount.$id,email,username,avatar:avatarUrl})
        return newUser
    } catch (error) {
        throw new Error(error);

    }
}
export async function signIn({ email, password }) {
    try {
        const session = account.createEmailPasswordSession(email,password)
        return session
    } catch (error) {
        throw new Error(error);

    }
}