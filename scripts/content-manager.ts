import { Octokit } from "@octokit/rest";
import { existsSync, lstatSync, rmSync, symlinkSync, unlinkSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file for local development
dotenv.config();

// Type definitions
interface GitHubContent {
  name: string;
  path: string;
  type: "file" | "dir" | "symlink";
  sha: string;
  size?: number;
  url: string;
  html_url?: string;
  download_url?: string | null;
  content?: string;
  encoding?: string;
}

async function manageContent(): Promise<void> {
  // Determine if we're in development or production
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

  // In local development, use symlinks
  if (!isProduction) {
    console.log("🔄 Development environment detected - using local content...");
    setupLocalContent();
    return;
  }

  // In production, fetch from GitHub
  console.log("🚀 Production environment detected - fetching content from GitHub...");
  await fetchFromGitHub();
}

function setupLocalContent(): void {
  // Get path to content from environment or use default
  const localContentPath = process.env.LOCAL_CONTENT_PATH;
  const localAssetsPath = process.env.LOCAL_ASSETS_PATH

  if (!localContentPath) {
    console.error("❌ LOCAL_CONTENT_PATH environment variable not set.");
    console.log("⚠️ Please set the path to your local content directory in .env file");
    process.exit(1);
  }
  if (!localAssetsPath) {
    console.error("❌ LOCAL_ASSETS_PATH environment variable not set.");
    console.log("⚠️ Please set the path to your local assets directory in .env file");
    process.exit(1);
  }

  const targetContentDir = path.join(process.cwd(), "content");
  const targetAssetsDir = path.join(process.cwd(), "public/assets")
  symLinkDirs(localContentPath, targetContentDir)
  symLinkDirs(localAssetsPath, targetAssetsDir)
}

async function symLinkDirs(localDirPath: string, targetDirPath: string) {
  // Check if the source content directory exists
  if (!existsSync(localDirPath)) {
    console.error(`❌ Local content directory not found: ${localDirPath}`);
    process.exit(1);
  }

  // Ensure target directory exists
  if (!existsSync(targetDirPath)) {
    try {
      await mkdir(targetDirPath, { recursive: true });
    } catch (error) {
      // If directory already exists (EEXIST error), just continue
      if (error instanceof Error && 'code' in error && error.code !== 'EEXIST') {
        throw error;
      } else {
        console.log(`Directory ${targetDirPath} already exists, continuing...`);
      }
    }
  }

  // Create symlink in development mode
  try {
    // Remove existing content directory if it exists
    if (existsSync(targetDirPath)) {
      if (lstatSync(targetDirPath).isSymbolicLink()) {
        unlinkSync(targetDirPath);
      } else {
        // If it's a directory with content, remove it
        rmSync(targetDirPath, { recursive: true, force: true });
      }
    }

    // Create the symlink
    symlinkSync(localDirPath, targetDirPath, 'dir');
    console.log(`✅ Symlink created: ${targetDirPath} -> ${localDirPath}`);
  } catch (error) {
    console.error(`❌ Error creating symlink: ${error instanceof Error ? error.message : String(error)}`);
  }
}


async function fetchFromGitHub(): Promise<void> {
  // Check for required environment variables
  if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
    throw new Error("Missing GITHUB_PERSONAL_ACCESS_TOKEN environment variable");
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  });

  const owner = process.env.GITHUB_REPO_OWNER
  const repo = process.env.GITHUB_REPO_NAME
  const ghContentPath = process.env.GITHUB_CONTENT_PATH
  const ghAssetsPath = process.env.GITHUB_ASSETS_PATH

  if (!owner) {
    console.error("❌ GITHUB_REPO_OWNER environment variable not set.");
    process.exit(1);
  }
  if (!repo) {
    console.error("❌ GITHUB_REPO_NAME environment variable not set.");
    process.exit(1);
  }
  if (!ghContentPath) {
    console.error("❌ GITHUB_CONTENT_PATH environment variable not set.");
    process.exit(1);
  }
  if (!ghAssetsPath) {
    console.error("❌ GITHUB_ASSETS_PATH environment variable not set.");
    process.exit(1);
  }

  syncFromGithub(octokit, owner, repo, ghContentPath, "content")
  syncFromGithub(octokit, owner, repo, ghAssetsPath, "public/assets")
}

async function syncFromGithub(octokit: Octokit, owner: string, repo: string, remotePath: string, localPath: string) {
  console.log(`📥 Fetching content from ${owner}/${repo}/${remotePath}`);
  // Create content directory if it doesn't exist
  const targetContentDir = path.join(process.cwd(), localPath);
  if (!existsSync(targetContentDir)) {
    await mkdir(targetContentDir, { recursive: true });
  } else {
    try {
      // Clear existing content
      rmSync(targetContentDir, { recursive: true, force: true });
      await mkdir(targetContentDir, { recursive: true });
    } catch (error) {
      // If directory already exists (EEXIST error), just continue without trying to create it
      if (error instanceof Error && 'code' in error && error.code !== 'EEXIST') {
        throw error;
      } else {
        console.log(`Directory ${targetContentDir} already exists, continuing...`);
      }
    }
  }

  try {
    // Fetch directory contents recursively
    await fetchDirectoryContents(octokit, owner, repo, remotePath, targetContentDir);
    console.log("✅ Content successfully fetched from GitHub and saved!");
  } catch (error) {
    console.error(`❌ Error fetching content: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

async function fetchDirectoryContents(
  octokit: Octokit,
  owner: string,
  repo: string,
  contentPath: string,
  targetDir: string
): Promise<void> {
  // Get contents of directory
  const response = await octokit.repos.getContent({
    owner,
    repo,
    path: contentPath
  });

  const data = response.data;

  // Handle if it's a single file
  if (!Array.isArray(data)) {
    await saveFile(octokit, owner, repo, data as GitHubContent, targetDir);
    return;
  }

  // Process each item
  for (const item of data as GitHubContent[]) {
    const itemName = item.name;
    const localPath = path.join(targetDir, itemName);

    if (item.type === "dir") {
      // Create directory if it doesn't exist
      if (!existsSync(localPath)) {
        try {
          await mkdir(localPath, { recursive: true });
        } catch (error) {
          // If directory already exists (EEXIST error), just continue
          if (error instanceof Error && 'code' in error && error.code !== 'EEXIST') {
            throw error;
          } else {
            console.log(`Directory ${localPath} already exists, continuing...`);
          }
        }
      }

      // Recursively fetch contents
      await fetchDirectoryContents(
        octokit,
        owner,
        repo,
        item.path,
        localPath
      );
    } else if (item.type === "file") {
      await saveFile(octokit, owner, repo, item, targetDir);
    }
  }
}

async function saveFile(
  octokit: Octokit,
  owner: string,
  repo: string,
  file: GitHubContent,
  targetDir: string
): Promise<void> {
  try {
    // For larger files, get the content directly
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: file.path,
      mediaType: { format: "raw" }
    });

    const data = response.data;

    // Determine file path
    const filePath = path.join(targetDir, file.name);

    // Write content to file
    if (typeof data === "string") {
      await Bun.write(filePath, data);
    } else {
      // Handle binary data
      await Bun.write(filePath, Buffer.from(data as unknown as ArrayBuffer));
    }

    console.log(`📄 Downloaded: ${file.name}`);
  } catch (error) {
    console.error(`❌ Error saving file ${file.name}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

manageContent().catch((error) => {
  console.error(`❌ Unhandled error: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});

