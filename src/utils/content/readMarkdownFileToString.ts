import fs from 'node:fs';
import path from 'node:path';

export function readMarkdownFileToString(filePath: string) {
  try {
    // Resolve the absolute path to the file to avoid issues with relative paths
    const absolutePath = path.resolve(filePath);
    const markdownContent = fs.readFileSync(absolutePath, 'utf8');
    return markdownContent;
  } catch (error) {
    console.error(`Error reading markdown file: ${error}`);
    return null; // Or throw the error, depending on your error handling strategy
  }
}

// Example usage:
const markdownFilePath = './your-file.md'; // Replace with the actual path to your .md file
const markdownString = readMarkdownFileToString(markdownFilePath);

if (markdownString !== null) {
  console.log(markdownString);
  // Now you have the markdown content as a string, ready to be used in your app
  // You might want to escape it further if you're embedding it directly into HTML
  // or a specific UI framework, though for general JS usage, the string itself is fine.
}
