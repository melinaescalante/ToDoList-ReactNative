import { Account, Client, ID } from 'react-native-appwrite';
export const appwriteconfig = {
    enpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.todolist',
    projectId: '67eacea70012fbbbd647',
    databaseId: '67ead08a003b8ea471c0',
    userCollectionId: '67ead0bb0036f3761607', 
    notesCollectionId: '67ead0d600367b808b19',
    storageId:'67ead269001476f829cb'
}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteconfig.enpoint) // Your Appwrite Endpoint
    .setProject(appwriteconfig.projectId) // Your project ID
    .setPlatform(appwriteconfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);

// Register User
export  const createUser=()=>{

    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}
