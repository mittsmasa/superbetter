---
description: "Create and checkout a new branch for feature development"
allowed-tools: ["Bash"]
---

Creating a new branch from main for developing the feature "$ARGUMENTS".

I will:
1. Translate "$ARGUMENTS" from Japanese to English
2. Convert it to a proper git branch name format (lowercase, hyphen-separated)
3. Create and checkout the new branch

First, let me prepare the repository:

!git checkout main
!git pull origin main

Now I'll translate "$ARGUMENTS" to English, convert it to a proper branch name format, and create the branch. The translation and branch creation will be done dynamically based on the provided feature name.