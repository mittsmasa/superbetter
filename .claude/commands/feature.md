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

Now I'll translate "$ARGUMENTS" to English, convert it to a proper branch name format, and create the branch:

!echo "Translating: $ARGUMENTS"

# Translate Japanese to English and create branch name
# For "MissionFormを改善する" -> "improve-mission-form"
case "$ARGUMENTS" in
  *MissionForm*改善* | *ミッションフォーム*改善*)
    BRANCH_NAME="feature/improve-mission-form"
    ;;
  *認証*追加* | *認証*実装*)
    BRANCH_NAME="feature/add-authentication"
    ;;
  *UI*改善* | *デザイン*改善*)
    BRANCH_NAME="feature/improve-ui"
    ;;
  *データベース*改善* | *DB*改善*)
    BRANCH_NAME="feature/improve-database"
    ;;
  *テスト*追加* | *テスト*実装*)
    BRANCH_NAME="feature/add-tests"
    ;;
  *)
    # Generic translation fallback
    TRANSLATED=$(echo "$ARGUMENTS" | sed 's/を改善する/improve/g; s/を追加する/add/g; s/を実装する/implement/g; s/を修正する/fix/g' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g; s/--*/-/g; s/^-\|-$//g')
    BRANCH_NAME="feature/$TRANSLATED"
    ;;
esac

!echo "Creating branch: $BRANCH_NAME"
!git checkout -b "$BRANCH_NAME"
!echo "Successfully created and switched to branch: $BRANCH_NAME"