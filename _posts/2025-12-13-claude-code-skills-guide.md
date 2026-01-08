---
categories:
- AI
- Development
- Claude Code
date: 2025-12-13
description: A practical guide to creating custom skills (slash commands) in Claude Code to automate your development workflows and make Claude more effective at your specific tasks.
img: posts/20251213/claude-skills-bash-script.png
layout: post
read_time: true
show_date: true
tags:
- Claude Code
- Development & DevOps
- Workflow Automation
title: 'Creating Custom Skills in Claude Code: Automating Your Development Workflow'
---

If you've used Claude Code for any length of time, you've probably found yourself repeatedly prompting Claude to do the same tasks. Run tests. Format code. Commit changes. Deploy to staging. These repetitive prompts slow you down and introduce inconsistency.

The solution? Custom skills, which Claude Code calls "slash commands." These are reusable scripts that Claude (and you) can invoke with a simple command like `/test` or `/deploy`. They're essentially bash scripts with superpowers, and they're one of the most underutilized features of Claude Code.

## What Are Skills?

Skills in Claude Code are executable scripts stored in your project's `.claude/commands/` directory. They can be written in bash, Python, Node.js, or any language that can run on your system. Once created, both you and Claude can invoke them by name.

**The key difference from regular scripts:**
- Skills are **git-tracked** so your whole team shares them
- Skills are **discoverable** by Claude without additional prompting
- Skills can **pre-compute context** to avoid back-and-forth with the AI
- Skills appear in **Claude's autocomplete** when you type `/`

## Your First Skill: Running Tests

Let's start with something simple but useful. A skill that runs your test suite with the right options.

Create the file `.claude/commands/test.sh`:

```bash
#!/bin/bash
# Runs the test suite with coverage

echo "Running test suite..."

# Detect which test runner you're using
if [ -f "package.json" ]; then
    if grep -q "vitest" package.json; then
        npm run test -- --coverage
    elif grep -q "jest" package.json; then
        npm test -- --coverage --watchAll=false
    else
        npm test
    fi
elif [ -f "pytest.ini" ] || [ -f "pyproject.toml" ]; then
    pytest --cov
elif [ -f "go.mod" ]; then
    go test ./... -cover
else
    echo "❌ Could not detect test framework"
    exit 1
fi

# Report results
if [ $? -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Tests failed. Review output above."
    exit 1
fi
```

Make it executable:
```bash
chmod +x .claude/commands/test.sh
```

Now you (or Claude) can simply type `/test` and it will run with the appropriate test runner and options.

## The Anatomy of a Good Skill

Looking at that test skill, notice a few important patterns:

### 1. Clear Feedback
```bash
echo "Running test suite..."
echo "✅ All tests passed!"
```

Skills should tell you what they're doing and what happened. Claude uses this output to understand if the skill succeeded.

### 2. Exit Codes Matter
```bash
if [ $? -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Tests failed."
    exit 1
fi
```

Return `0` for success, non-zero for failure. Claude uses this to know if it should continue or investigate the error.

### 3. Context Detection
```bash
if grep -q "vitest" package.json; then
    npm run test -- --coverage
elif grep -q "jest" package.json; then
    npm test -- --coverage --watchAll=false
```

Good skills adapt to your project automatically. This test skill works with multiple test frameworks without you needing to remember which one you're using.

## A More Complex Example: Smart Commit

Let's create a skill that makes committing code intelligent. It will:
- Check for uncommitted changes
- Run tests before committing
- Generate a meaningful commit message suggestion
- Handle the git workflow

Create `.claude/commands/commit.sh`:

```bash
#!/bin/bash
# Smart commit with tests and meaningful messages

set -e  # Exit on any error

# Check for changes
MODIFIED_FILES=$(git diff --name-only)
STAGED_FILES=$(git diff --cached --name-only)

if [ -z "$MODIFIED_FILES" ] && [ -z "$STAGED_FILES" ]; then
    echo "❌ No changes to commit"
    exit 1
fi

echo "📝 Changes detected in:"
echo "$MODIFIED_FILES"
echo ""

# Run tests first
echo "🧪 Running tests before commit..."
./.claude/commands/test.sh

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Fix them before committing."
    exit 1
fi

# Generate commit message suggestion
echo ""
echo "Analyzing changes for commit message..."

# Get the types of files changed
HAS_TESTS=$(echo "$MODIFIED_FILES" | grep -c "test\|spec" || true)
HAS_DOCS=$(echo "$MODIFIED_FILES" | grep -c "README\|\.md" || true)
HAS_CONFIG=$(echo "$MODIFIED_FILES" | grep -c "config\|\.json\|\.yaml" || true)

# Suggest a commit message prefix
if [ $HAS_TESTS -gt 0 ]; then
    echo "💡 Suggested prefix: test: "
elif [ $HAS_DOCS -gt 0 ]; then
    echo "💡 Suggested prefix: docs: "
elif [ $HAS_CONFIG -gt 0 ]; then
    echo "💡 Suggested prefix: config: "
else
    echo "💡 Suggested prefix: feat: or fix: "
fi

echo ""
read -p "Commit message: " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    echo "❌ Commit message required"
    exit 1
fi

# Stage and commit
git add -A
git commit -m "$COMMIT_MSG"

echo "✅ Committed: $COMMIT_MSG"

# Ask about pushing
read -p "Push to remote? (y/n): " SHOULD_PUSH
if [ "$SHOULD_PUSH" = "y" ]; then
    BRANCH=$(git branch --show-current)
    git push -u origin "$BRANCH"
    echo "✅ Pushed to origin/$BRANCH"
fi
```

Now `/commit` becomes a smart workflow that ensures quality before committing.

## Skills That Pre-Compute Context

One of the most powerful patterns is pre-computing information that Claude would otherwise need to ask about. This eliminates back-and-forth and makes skills faster.

**Example: Status skill**

Create `.claude/commands/status.sh`:

```bash
#!/bin/bash
# Shows comprehensive project status

echo "📊 Project Status Report"
echo "========================"
echo ""

# Git status
echo "🔀 Git Status:"
BRANCH=$(git branch --show-current)
MODIFIED=$(git diff --name-only | wc -l)
STAGED=$(git diff --cached --name-only | wc -l)
echo "  Branch: $BRANCH"
echo "  Modified files: $MODIFIED"
echo "  Staged files: $STAGED"
echo ""

# Dependency status
echo "📦 Dependencies:"
if [ -f "package.json" ]; then
    OUTDATED=$(npm outdated | tail -n +2 | wc -l || echo "0")
    echo "  Outdated packages: $OUTDATED"
fi
echo ""

# Test status
echo "🧪 Last Test Run:"
if [ -f "coverage/coverage-summary.json" ]; then
    COVERAGE=$(cat coverage/coverage-summary.json | grep -o '"lines":{"pct":[0-9.]*' | grep -o '[0-9.]*$')
    echo "  Coverage: $COVERAGE%"
else
    echo "  No coverage data available"
fi
echo ""

# Build status
echo "🏗️  Build Status:"
if [ -d "dist" ] || [ -d "build" ]; then
    echo "  ✅ Build artifacts present"
else
    echo "  ⚠️  No build artifacts found"
fi
```

Now when Claude needs to understand your project state, it can run `/status` once and get everything, rather than running multiple separate commands.

## Skills for Different Workflows

Here are templates for common development workflows:

### Code Quality Checks
`.claude/commands/quality.sh`:
```bash
#!/bin/bash
echo "Running code quality checks..."

# Linting
echo "1/3 Linting..."
npm run lint

# Type checking
echo "2/3 Type checking..."
npm run typecheck

# Tests
echo "3/3 Testing..."
./.claude/commands/test.sh

echo "✅ All quality checks passed!"
```

### Quick Fix Workflow
`.claude/commands/quick-fix.sh`:
```bash
#!/bin/bash
# Auto-fix common issues

echo "Applying automatic fixes..."

# Fix linting issues
npm run lint -- --fix

# Format code
npm run format

# Update imports
npm run organize-imports

echo "✅ Auto-fixes applied. Review changes before committing."
```

### Deployment
`.claude/commands/deploy-staging.sh`:
```bash
#!/bin/bash
# Deploy to staging environment

set -e

echo "🚀 Deploying to staging..."

# Run quality checks first
./.claude/commands/quality.sh

# Build production bundle
echo "Building production bundle..."
npm run build

# Deploy (adjust for your platform)
echo "Deploying to staging server..."
# Examples:
# vercel deploy --prod
# aws s3 sync ./dist s3://staging-bucket
# ssh staging "cd /app && git pull && pm2 restart app"

echo "✅ Deployed to staging!"
```

## Making Skills Discoverable

Claude automatically discovers skills in `.claude/commands/`, but you can help both Claude and your team by documenting them.

Create `.claude/commands/README.md`:

```markdown
# Project Skills

Quick reference for available skills:

## Development
- `/test` - Run test suite with coverage
- `/quality` - Run all quality checks (lint, typecheck, test)
- `/quick-fix` - Auto-fix linting and formatting issues

## Git Workflow
- `/commit` - Smart commit with tests and message suggestions
- `/status` - Show comprehensive project status

## Deployment
- `/deploy-staging` - Deploy to staging environment
- `/deploy-prod` - Deploy to production (requires confirmation)

## Usage
Type `/` in Claude Code to see available skills with autocomplete.
```

## Advanced: Skills with Parameters

Skills can accept parameters, though the syntax is bash-standard rather than special:

`.claude/commands/test-file.sh`:
```bash
#!/bin/bash
# Run tests for a specific file
# Usage: /test-file path/to/test

if [ -z "$1" ]; then
    echo "Usage: /test-file <path-to-test-file>"
    exit 1
fi

TEST_FILE="$1"

if [ ! -f "$TEST_FILE" ]; then
    echo "❌ File not found: $TEST_FILE"
    exit 1
fi

echo "Running tests in $TEST_FILE..."
npm test -- "$TEST_FILE"
```

Claude can invoke this with: `/test-file src/utils/helper.test.ts`

## Best Practices

After creating dozens of skills, here are the patterns that work best:

### 1. Start Small
Don't try to automate everything at once. Start with your most repetitive task and build from there.

### 2. Make Them Idempotent
Skills should be safe to run multiple times. If something is already done, they should recognize that and skip it.

### 3. Fail Fast with Clear Messages
If something is wrong, exit immediately with a clear explanation of what and why.

### 4. Chain Skills
Skills can call other skills. Your `/commit` skill calls `/test`, for example.

### 5. Version Control Them
Commit your `.claude/commands/` directory. When teammates clone the repo, they get all your skills immediately.

## When to Create a Skill vs. Using a Script

**Create a skill when:**
- You or Claude do it more than twice a week
- It has project-specific context
- The team should use the same approach
- You want it discoverable via `/` autocomplete

**Use a regular script when:**
- It's one-off or rarely used
- It's system-level, not project-specific
- It needs to be called from other scripts programmatically

## Real-World Impact

After implementing a suite of skills, you'll notice:

1. **Faster Development** - No more typing out test commands or remembering flags
2. **Consistent Workflows** - Everyone on the team runs tests the same way
3. **Better AI Collaboration** - Claude can execute complex workflows autonomously
4. **Documentation in Code** - Your skills become living documentation of how things should be done

The Boris Cherny workflow I detailed in my [multi-agent article](/orchestrating-agents-claude.html) relies heavily on well-designed skills. His team uses them dozens of times per day, and they're a key reason multiple Claude agents can work effectively in parallel.

## Getting Started Today

Here's your action plan:

1. **Create the directory**: `mkdir -p .claude/commands`
2. **Create your first skill**: Start with `/test` using the example above
3. **Make it executable**: `chmod +x .claude/commands/test.sh`
4. **Try it**: Type `/test` in Claude Code
5. **Commit it**: `git add .claude/ && git commit -m "feat: add test skill"`

Within a week of using your first skill, you'll identify three more to create. Within a month, you'll have a suite of skills that fundamentally change how you develop.

The time investment is minimal (10-15 minutes per skill), but the compounding returns are substantial. Each skill you create makes both you and Claude more effective at your specific workflow.

---

**My Claude Code Skills Repo to get you started:**
If you want to give this a shot, I created a repo with a few skills I use daily. You can fork it and add it to your project. As always let me know what you think.
- [https://github.com/angakh/claude-code-skills](https://github.com/angakh/claude-code-skills)

**Related Reading:**
- [The Multi-Agent Approach: How Claude Code's Creator Uses the Tool](/orchestrating-agents-claude.html)
