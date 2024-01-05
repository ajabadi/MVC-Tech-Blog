// Data export function
async function exportDataToJson() {
    try {
        const users = await User.findAll({ raw: true });
        const posts = await Post.findAll({ raw: true });
        const comments = await Comment.findAll({ raw: true });

        // Define the file paths
        const userDataPath = path.join(__dirname, 'seeds', 'userData.json');
        const postDataPath = path.join(__dirname, 'seeds', 'postData.json');
        const commentDataPath = path.join(__dirname, 'seeds', 'commentData.json');

        // Write the data to JSON files in the specified directory
        fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
        fs.writeFileSync(postDataPath, JSON.stringify(posts, null, 2));
        fs.writeFileSync(commentDataPath, JSON.stringify(comments, null, 2));

        console.log('Data exported to JSON files in seeds folder.');
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}
