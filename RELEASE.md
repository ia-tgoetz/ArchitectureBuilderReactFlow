# Releasing ArchitectureBuilder

Follow these steps to create a new release for the ArchitectureBuilder module.

## Prerequisites
Ensure you have the GitHub CLI (`gh`) installed and authenticated.

## Steps

1. **Check the module version**
   Confirm that `version = "..."` on line 27 of `build.gradle.kts` (under `allprojects`) matches the version you are about to release. Update it if it doesn't, and commit that change before tagging.
   ```bash
   # build.gradle.kts, line 27 — must match the tag below (without the leading "v")
   version = "1.0.1"
   ```

2. **Commit and Tag**
   Make sure all changes are committed, then tag the new version.
   ```bash
   # Replace v1.0.1 with your new version number
   git tag -a v1.0.1 -m "Release v1.0.1"
   git push origin v1.0.1
   ```

3. **Build the module**
   Run the `/cleanbuild` skill (clean + build) rather than `./gradlew build` alone, to guarantee a fresh artifact.
   ```bash
   /cleanbuild
   ```

4. **Create Release and Upload Artifact**
   Use the GitHub CLI to create the release and attach the build artifact in one command.
   ```bash
   # Create release and upload the module
   gh release create v1.0.1 `
     --title "Release v1.0.1" `
     --latest `
     --notes "Insert release notes here" `
     build/ArchitectureBuilder.modl
   ```

5. **Update README.md**
   Update the link in `README.md` to point to the new version's URL if necessary.
