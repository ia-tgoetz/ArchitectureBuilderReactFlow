# Releasing ArchitectureBuilder

Follow these steps to create a new release for the ArchitectureBuilder module.

## Prerequisites
Ensure you have the GitHub CLI (`gh`) installed and authenticated.

## Steps

1. **Commit and Tag**
   Make sure all changes are committed, then tag the new version.
   ```bash
   # Replace v1.0.1 with your new version number
   git tag -a v1.0.1 -m "Release v1.0.1"
   git push origin v1.0.1
   ```

2. **Create Release and Upload Artifact**
   Use the GitHub CLI to create the release and attach the build artifact in one command.
   ```bash
   # Ensure the project is built first
   ./gradlew clean build

   # Create release and upload the module
   gh release create v1.0.1 `
     --title "Release v1.0.1" `
     --notes "Insert release notes here" `
     build/ArchitectureBuilder.modl
   ```

3. **Update README.md**
   Update the link in `README.md` to point to the new version's URL if necessary.
