---
categories:
- AI
- Development
- Claude Code
date: 2026-01-06
description: Inside Boris Cherny's production workflow—running 15+ parallel Claude agents, maintaining team-wide CLAUDE.md files, and leveraging advanced features most developers miss.
img: posts/20260106/orchestrated-skills.jpeg
layout: post
read_time: true
show_date: true
tags:
- Claude Code
- Development & DevOps
- Artificial Intelligence
- Workflow Optimization
title: 'The Multi-Agent Approach: How Claude Code''s Creator Actually Uses the Tool'
---

When Boris Cherny, the creator of Claude Code, shared his personal workflow, it revealed something fascinating: the most powerful way to use AI coding assistants isn't to replace your terminal with a single chatbot. Instead, it's about orchestrating multiple AI agents working in parallel, each on their own task, while you 
context-switch between them like a conductor managing an orchestra.

[Boris Cherny's Post on X](https://x.com/bcherny/status/2007179832300581177)

After months of testing various AI coding platforms (as I detailed in my [vibe coding review](/vibe-coding-reviews.html)), I've come to appreciate that the implementation details matter as much as the underlying AI model. Boris's approach represents a fundamentally different philosophy from the "conversational app builder" platforms I tested. His focus is on production workflows rather than rapid prototyping.

## The Parallel Processing Paradigm

### Running 5-15 Claudes Simultaneously

Boris runs 5 Claude agents in his terminal (numbered tabs 1-5) plus 5-10 more on claude.ai/code, all working simultaneously. He uses iTerm2 system notifications to know when any agent needs input, allowing him to work on multiple features across different branches without waiting for any single agent to complete.

This isn't just about speed. It's about matching how developers actually think. While Claude works on implementing feature A, you can be planning feature B with another agent, reviewing feature C's output, and testing feature D. The cognitive overhead of managing multiple agents is lower than you'd expect because each one maintains its own context and conversation history.

**Key setup elements:**
- iTerm2 configured for system notifications when agents need input
- Numbered terminal tabs (1-5) for quick identification
- Browser sessions on claude.ai/code for additional parallelism
- Mobile app sessions kicked off throughout the day for background work
- `--teleport` command for moving sessions between terminal and web

The mobile workflow is particularly clever: start a few complex tasks from your phone in the morning, let them run while you commute or grab coffee, then check results when you're at your desk.

## The CLAUDE.md Strategy: Team Knowledge Management

One of the most underappreciated features Boris highlights is the shared `CLAUDE.md` file—a repository-level instruction set that the entire team maintains and Claude reads before every interaction.

### How It Works

Every time Claude makes a mistake or the team establishes a new pattern, it gets added to `CLAUDE.md`. Here's a real example from the Claude Code repository:

Note: Bun is a fast JavaScript runtime and package manager, similar to Node.js and npm but significantly faster. The Claude Code team has standardized on it for their workflow.

```markdown
# Development Workflow

**Always use `bun`, not `npm`.**

# 1. Make changes

# 2. Typecheck (fast)
bun run typecheck

# 3. Run tests
bun run test -- -t "test name"      # Single suite
bun run test:file -- "glob"         # Specific files

# 4. Lint before committing
bun run lint:file -- "file1.ts"     # Specific files
bun run lint                         # All files

# 5. Before creating PR
bun run lint:claude && bun run test
```

This creates a compounding knowledge base. Instead of repeatedly telling Claude "don't use enums, use string literal unions," you add it once to `CLAUDE.md` and it applies to all future interactions for all team members.

### GitHub Integration: Living Documentation

The Claude Code team uses the Claude Code GitHub Action to update `CLAUDE.md` directly from code reviews. This means improvements to the knowledge base happen as a natural part of the development workflow.

**How it works:**

During code review, you can tag the Claude bot:
```
@.claude add to CLAUDE.md to never use enums, always prefer literal unions
```

The bot responds with a plan, makes the change to CLAUDE.md, and commits it. This is what Dan Shipper calls "Compounding Engineering." Each code review makes the system slightly smarter for everyone on the team.

**To set this up:**

1. Install the Claude Code GitHub Action from the GitHub Marketplace
2. Configure it with your repository
3. Grant it write access to your repo
4. Start tagging @.claude in your code reviews

Within a few weeks, your `CLAUDE.md` will evolve from a basic template into a comprehensive guide that captures your team's collective knowledge.

## Plan Mode: The Secret to One-Shot Success

Boris's sessions typically start in Plan mode (triggered with `shift+tab` twice). This is crucial: instead of letting Claude jump straight to implementation, he iterates on the *approach* first:

1. **Describe the goal** in Plan mode
2. **Refine the plan** through back-and-forth until it's solid
3. **Switch to auto-accept edits** mode
4. **Let Claude implement** (usually succeeds in one shot)

This mirrors my recommendation from the vibe coding article about establishing approach before implementation, but Boris takes it further by using a dedicated mode rather than just prompting for it.

The time investment in planning pays off exponentially. A good plan lets Claude work autonomously without breaking existing functionality—the exact failure mode I encountered repeatedly with vibe coding platforms.

## Slash Commands: Automating Inner Loops

Slash commands save you from repeated prompting and make it possible for Claude to use your workflows too. Boris creates custom slash commands for every "inner loop" workflow that he does many times a day. What Boris is referring to as "slash commands" are actually what Claude Code calls "skills."

If you don't know how to create skills, check out my [guide](/claude-code-skills-guide.html).

**What are inner loop workflows?**

These are the small, repetitive tasks you do constantly during development:
- Running tests
- Committing and pushing code
- Checking type errors
- Running the linter
- Deploying to staging

Commands are stored in `.claude/commands/` and checked into git so the whole team can use them.

**Example: The `/commit-push-pr` command**

This is Boris's most-used command, running dozens of times per day:

Create `.claude/commands/commit-push-pr.sh`:

```bash
#!/bin/bash
# Commits changes, pushes to remote, and creates a PR

set -e  # Exit on any error

echo "📝 Preparing to commit and push..."

# Pre-compute git status to avoid back-and-forth with Claude
MODIFIED_FILES=$(git diff --name-only)
BRANCH=$(git branch --show-current)
UPSTREAM_BRANCH=$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null || echo "")

if [ -z "$MODIFIED_FILES" ]; then
    echo "❌ No changes to commit"
    exit 1
fi

echo "Modified files:"
echo "$MODIFIED_FILES"
echo ""

# Get commit message from Claude or user
read -p "Commit message: " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    echo "❌ Commit message required"
    exit 1
fi

# Commit changes
git add -A
git commit -m "$COMMIT_MSG"

echo "✅ Committed changes"

# Push to remote
if [ -z "$UPSTREAM_BRANCH" ]; then
    git push -u origin "$BRANCH"
else
    git push
fi

echo "✅ Pushed to remote"

# Create PR if gh CLI is available
if command -v gh &> /dev/null; then
    read -p "Create PR? (y/n): " CREATE_PR
    if [ "$CREATE_PR" = "y" ]; then
        gh pr create --fill
        echo "✅ PR created"
    fi
fi
```

Make it executable:
```bash
chmod +x .claude/commands/commit-push-pr.sh
```

**Why inline bash matters:**

Notice the command pre-computes git status at the start:
```bash
MODIFIED_FILES=$(git diff --name-only)
BRANCH=$(git branch --show-current)
```

This information is gathered once and available throughout the script. Without this, Claude would need to:
1. Run `git status`
2. Wait for response
3. Ask what files to commit
4. Wait for response  
5. Run `git commit`
6. And so on...

By pre-computing everything, the command runs quickly without back-and-forth.

**More useful commands to create:**

`.claude/commands/test-focused.sh`:
```bash
#!/bin/bash
# Run tests for files that changed

CHANGED_FILES=$(git diff --name-only | grep -E '\.(ts|js|tsx|jsx)$')

for file in $CHANGED_FILES; do
    # Convert source file to test file path
    TEST_FILE=$(echo $file | sed 's/src/src/__tests__/; s/\.tsx\?/.test.ts/')
    
    if [ -f "$TEST_FILE" ]; then
        echo "Testing $TEST_FILE..."
        npm test -- "$TEST_FILE"
    fi
done
```

`.claude/commands/quick-check.sh`:
```bash
#!/bin/bash
# Fast checks before committing

echo "Running quick checks..."

# Type check
echo "1/3 Type checking..."
npm run typecheck

# Lint
echo "2/3 Linting..."  
npm run lint

# Quick tests (not full suite)
echo "3/3 Running changed file tests..."
.claude/commands/test-focused.sh

echo "✅ All checks passed!"
```

Now Claude can run `/quick-check` before committing, or you can run it manually. The key is identifying your most common workflows and automating them.

## Subagents: Specialized AI Workers

Subagents are like specialized team members with specific expertise. Rather than asking the generalist Claude to both implement code AND simplify it, you hand off to a specialist agent once implementation is done.

Boris maintains several subagents in `.claude/agents/` for common post-processing tasks:

- **code-simplifier**: Refactors Claude's output after implementation
- **verify-app**: Runs comprehensive end-to-end tests on Claude Code itself  
- **build-validator**: Checks build integrity
- **code-architect**: Reviews large changes for architectural consistency

**How to create your first subagent:**

Create a file `.claude/agents/code-simplifier.md`:

```markdown
# Code Simplifier Agent

You are a specialist in code simplification and refactoring. Your job is to take working code and make it more maintainable without changing behavior.

## Your responsibilities:
1. Remove duplicate code
2. Extract complex logic into well-named functions
3. Simplify conditional statements
4. Improve variable and function names
5. Add helpful comments for complex logic

## What you should NOT do:
- Do not change functionality
- Do not add new features
- Do not remove tests
- Do not modify public APIs

## Process:
1. Read the files that were just modified
2. Identify simplification opportunities
3. Make changes one file at a time
4. Run tests after each change
5. Report what was simplified
```

**Using subagents:**

After Claude implements a feature, you can hand off to a subagent:
```
You: "Great! Now invoke the code-simplifier agent to clean this up"
Claude: [Calls code-simplifier subagent]
Code Simplifier: [Reviews and refactors the code]
```

Start with one or two subagents for your most common post-processing tasks, then add more as you identify patterns.

## The Verification Loop: 2-3x Quality Improvement

Boris emphasizes that the single most important factor for quality is **giving Claude a way to verify its work**. Without this feedback loop, Claude can't iterate to fix problems.

For Claude Code itself, Boris uses the Claude Chrome extension to:
1. Open a browser
2. Test the UI
3. Iterate until code works and UX feels good

This automated testing happens for *every* change landed to claude.ai/code. The extension can click through interfaces, verify visual elements, and report issues back to Claude for fixes.

**Verification looks different per domain:**
- **CLI tools**: Run the tool and verify output
- **Web apps**: Browser automation testing
- **Mobile apps**: Simulator testing
- **APIs**: Automated integration tests
- **Data pipelines**: Sample data validation

The principle is universal: create a fast, reliable way for Claude to check its own work, and quality will dramatically improve.

## Hooks: Automated Code Quality

Hooks in Claude Code let you run commands automatically at specific points in the workflow. Boris uses PostToolUse hooks to automatically format code after Claude makes changes.

**What are hooks?**

Think of hooks as automatic quality checks that run without you having to remember them. They're triggered by specific events in Claude's workflow:

- **PostToolUse**: Runs after Claude uses a tool (like editing a file)
- **PreToolUse**: Runs before Claude uses a tool
- **Stop**: Runs when a long task completes
- **Error**: Runs when something goes wrong

**Setting up your first hook:**

Create or edit `.claude/settings.json` in your project:

```json
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": "npm run format || true"
        }
      ]
    }
  ]
}
```

This configuration does several things:
- **matcher**: Triggers only when Claude writes or edits files (not when reading)
- **command**: Runs your code formatter
- **|| true**: Ensures the hook doesn't fail if formatting has warnings

If you're using Bun (like the Claude Code team), it would look like:
```json
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit", 
      "hooks": [
        {
          "type": "command",
          "command": "bun run format || true"
        }
      ]
    }
  ]
}
```

**Why this matters:**

Without this hook, you'd need to:
1. Let Claude make changes
2. Remember to run the formatter
3. Commit the formatting changes separately
4. Or worse, have CI fail because of formatting issues

With the hook, formatting happens automatically after every file change. Claude's code is already formatted by the time you review it.

**Other useful hooks:**

```json
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": "npm run format || true"
        },
        {
          "type": "command", 
          "command": "npm run lint:fix || true"
        }
      ]
    }
  ],
  "Stop": [
    {
      "matcher": "*",
      "hooks": [
        {
          "type": "command",
          "command": ".claude/commands/verify-app.sh"
        }
      ]
    }
  ]
}
```

This setup:
1. Formats and lints code after every edit
2. Runs comprehensive verification when tasks complete

Start with just the formatting hook, then add more as you identify patterns.

## Permission Management: Security Without Friction

Rather than using `--dangerously-skip-permissions`, Boris pre-allows safe commands through `/permissions`:

```
Bash(bq query:*)
Bash(bun run build:*)
Bash(bun run lint:file:*)
Bash(bun run test:*)
Bash(bun run test:file:*)
Bash(bun run typecheck:*)
Bash(test:*)
Bash(cc:*)
Bash(comm:*)
Bash(find:*)
```

These permissions are stored in `.claude/settings.json` and shared with the team. It's a middle ground: Claude can work autonomously on common operations while still requiring confirmation for potentially dangerous commands.

For sandbox environments or very long-running tasks, Boris will occasionally use `--permission-mode=dontAsk` to let Claude "cook without being blocked," but this is reserved for isolated contexts.

## MCP Integration: External Tool Access

Claude Code uses MCP (Model Context Protocol) to interact with Boris's entire tool ecosystem:

- **Slack**: Search conversations, post updates
- **BigQuery**: Run analytics queries via `bq` CLI
- **Sentry**: Pull error logs automatically
- **Custom internal tools**: Anything with a CLI interface

The Slack MCP configuration is checked into `.mcp.json` and shared:

```json
{
  "mcpServers": {
    "slack": {
      "type": "http",
      "url": "https://slack.mcp.anthropic.com/mcp"
    }
  }
}
```

This means Claude can autonomously:
- Search for relevant Slack discussions when debugging
- Post status updates to team channels
- Query production analytics to verify changes
- Pull error logs to understand user issues

The friction of context-switching between tools disappears when Claude can access them directly.

## The Ralph Wiggum Plugin: Long-Running Task Safety

For very long-running tasks (deployments, migrations, extensive refactors), Boris uses the "ralph-wiggum" plugin. This plugin was originally created by Geoffrey Huntley and implements a verification step when tasks complete.

The plugin is named after a character from The Simpsons who is famous for enthusiastically declaring "I'm helping!" while unknowingly making situations worse. The name is perfect because it captures a real risk with AI: agents that work unsupervised for hours might produce code that seems complete but actually breaks things.

The ralph-wiggum plugin ensures that when Claude finishes a multi-hour task unsupervised, the results are actually correct before merging. It runs a comprehensive verification suite and can even alert you if something seems off.

Combined with Stop hooks, this creates a safety net: long tasks can run overnight or while you're in meetings, with automatic verification before results are committed.

## The Model Choice: Opus 4.5 with Extended Thinking

Boris runs Opus 4.5 with extended thinking enabled for everything, even though it's slower than Sonnet. His reasoning might surprise you:

> "You have to steer it less and it's better at tool use, so it is almost always faster than using a smaller model in the end."

This contradicts conventional wisdom about using faster models for simple tasks. But Boris's experience shows that the end-to-end time from prompt to working code is actually lower with Opus because:

1. **Fewer correction cycles:** Opus gets it right more often on the first try
2. **Better tool use:** Less back-and-forth when running commands  
3. **Deeper understanding:** Handles complex refactors that would require multiple iterations with smaller models

The "extended thinking" mode (previously called "chain of thought") lets the model work through problems more thoroughly before responding. You'll see Claude's reasoning process in real-time, which helps you understand its approach and catch potential issues early.

Think of it this way: a slower, more capable model that succeeds in one attempt is faster than a quick model that requires three rounds of corrections.

## Multi-Branch Parallelism: Avoiding Conflicts

A critical detail that Boris mentions: when running multiple agents on the same codebase, each agent works on its own feature branch in its own repository clone.

**Why this approach matters:**

When you run 3-5 agents simultaneously all making changes to the main branch, you're going to hit merge conflicts constantly. It becomes a mess of competing edits where Agent 1's changes conflict with Agent 2's changes, and you spend more time resolving conflicts than actually developing.

Instead, here's the workflow Boris uses:

**Setting up isolated workspaces:**

```bash
# Create a directory for your parallel work
mkdir -p ~/code/myproject-parallel

# Clone your repo multiple times
cd ~/code/myproject-parallel
git clone git@github.com:yourorg/myproject.git agent1
git clone git@github.com:yourorg/myproject.git agent2  
git clone git@github.com:yourorg/myproject.git agent3

# In each clone, create a feature branch
cd agent1 && git checkout -b feature/authentication
cd ../agent2 && git checkout -b feature/database-migration
cd ../agent3 && git checkout -b docs/api-updates
```

Now each agent has:
- Its own working directory
- Its own feature branch
- Complete isolation from other agents
- Full context for its specific task

**Benefits of this approach:**
- PRs remain clean and focused
- Merge conflicts are rare (each branch diverges from main separately)
- Each agent has complete context for its branch
- You can abandon failed experiments without affecting other work
- Code reviews are clearer because each PR has a single purpose

**Managing the workflow:**

Open a terminal tab for each agent workspace:
```bash
# Tab 1: Authentication feature
cd ~/code/myproject-parallel/agent1
claude-cli

# Tab 2: Database migration
cd ~/code/myproject-parallel/agent2
claude-cli

# Tab 3: Documentation updates
cd ~/code/myproject-parallel/agent3
claude-cli
```

This maps to the cognitive model of working on multiple features. Each lives in its own mental and physical space until it's ready to merge back to main.

## Comparing Approaches: Vibe Coding vs. Claude Code

Having tested both paradigms extensively, the difference is clear:

**Vibe Coding Platforms** (Replit, Tempo, Lovable, etc.):
- Optimized for rapid prototyping and demos
- Single-agent, conversational interface
- Struggle with iterative refinement
- Break down when adding features to existing code
- Best for initial generation

**Claude Code** (Boris's Workflow):
- Optimized for production development
- Multi-agent parallel processing
- Designed for iterative improvement
- Handles complex refactors through planning and verification
- Best for real applications

The vibe coding platforms excel at the first 20% of development, which is getting a working prototype fast. Claude Code, used properly, excels at the remaining 80%, which includes refining, extending, and maintaining real applications over time.

## Lessons for Your Workflow

Even if you're not ready to run 15 parallel Claude agents, several principles apply immediately:

### 1. Document Patterns in CLAUDE.md

Start with a simple file:
```markdown
# Project Guidelines

## Tech Stack
- Use TypeScript strict mode
- Prefer functional components in React
- Use Tailwind for styling

## Testing
- Write tests before implementation
- Use Jest for unit tests
- Use Playwright for E2E tests

## Common Mistakes to Avoid
- Don't use `any` type
- Don't commit console.logs
- Don't skip error handling
```

Update it whenever Claude makes a mistake or you establish a new pattern.

### 2. Use Plan Mode for Complex Tasks

Before implementing anything non-trivial:
1. Switch to Plan mode
2. Describe your goal
3. Iterate on the approach
4. Only then switch to implementation

This single change will dramatically improve success rate.

### 3. Create Slash Commands for Repetitive Workflows

Identify the 3-5 workflows you do most often:
- Running tests
- Committing and pushing
- Building and deploying
- Generating documentation
- Running type checks

Create slash commands for these and share them with your team.

### 4. Build Verification Loops

For every project, invest in making verification fast and automated:
- Set up hot-reload for web apps
- Create test scripts that run in <10 seconds
- Build sample data generators for testing
- Set up automated E2E tests for critical paths

Then give Claude access to run these verifications.

### 5. Start with 2-3 Parallel Agents

You don't need 15 agents on day one. Start with 2-3:
- **Agent 1**: Feature implementation
- **Agent 2**: Test writing
- **Agent 3**: Documentation updates

Even this modest parallelism will change how you work.

## The Future of AI-Assisted Development

Boris's workflow represents a mature approach to AI-assisted development. It's not about replacing developers or eliminating coding—it's about orchestrating AI agents as force multipliers.

The developers who will thrive aren't those who can prompt the hardest, but those who can:
- Architect systems that AI agents can navigate
- Create verification loops that enable autonomy
- Build knowledge bases (like `CLAUDE.md`) that compound over time
- Manage parallel workstreams effectively
- Integrate AI into existing tool ecosystems

This echoes my conclusion from [Coding Beyond AI](/coding-beyond-ai.html): the future belongs to those who can architect, direct, and orchestrate AI tools, not those who simply use them as fancy autocomplete.

## Getting Started: Your Path to Multi-Agent Development

If you're using Claude Code (or any AI coding assistant), here's how to progressively build up to Boris's workflow. Each step builds on the previous one, and you should only move to the next step once you're comfortable with the current one.

### Step 1: Create Your CLAUDE.md File

Start by creating a file called `CLAUDE.md` in your project's root directory. This will be Claude's instruction manual for your codebase.

**Initial template to get started:**

```markdown
# Project Guidelines

## Tech Stack
- Primary language: [Your language here]
- Framework: [Your framework]
- Package manager: [npm, yarn, bun, etc.]

## Testing
- Test framework: [Jest, Vitest, etc.]
- Command to run tests: [your command]

## Common Commands
- Start dev server: [your command]
- Build for production: [your command]
- Run linter: [your command]

## Common Mistakes to Avoid
(Start empty - you'll add to this as you go)
```

As you work with Claude, anytime it makes a mistake or you establish a new pattern, add it to the "Common Mistakes to Avoid" section. For example:

```markdown
## Common Mistakes to Avoid
- Don't use `any` type in TypeScript
- Don't commit console.logs to production code
- Always include error handling in async functions
- Prefer functional components over class components in React
```

This file compounds in value over time. After a month of updates, Claude will know your codebase's quirks better than most new team members.

### Step 2: Learn Plan Mode for Complex Tasks

Plan mode is accessed by pressing `Shift+Tab` twice in Claude Code. It changes how Claude approaches your request.

**Without Plan mode:**
```
You: "Add authentication to the app"
Claude: [Immediately starts writing code]
```

**With Plan mode:**
```
You: "Add authentication to the app"
Claude: [Provides a detailed plan]
  1. Set up authentication provider (e.g., Auth0, Supabase)
  2. Create login/signup components
  3. Add protected route wrapper
  4. Implement token storage
  5. Add logout functionality
  
You: "Looks good, but let's use session storage instead of local storage"
Claude: [Updates plan]
You: "Perfect, proceed with implementation"
Claude: [Implements the updated plan]
```

**When to use Plan mode:**
- Implementing new features
- Large refactors
- Anything that touches multiple files
- When you're not 100% sure of the approach

**When to skip Plan mode:**
- Fixing typos or simple bugs
- Updating documentation
- Making obvious, small changes

Start using Plan mode for any task that would take more than 5 minutes to implement manually.

### Step 3: Set Up Your First Slash Command

Slash commands automate repetitive workflows. Let's create a simple one for running your test suite.

Create a directory structure:
```
your-project/
  .claude/
    commands/
      test.sh
```

**Example test.sh:**
```bash
#!/bin/bash
# Runs the test suite with common options

echo "Running test suite..."

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Check if tests passed
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

Now when you type `/test` in Claude Code, it will run this script. You can create commands for:
- `/commit-push` - Commits and pushes changes
- `/deploy` - Deploys to staging
- `/format` - Runs code formatter
- `/typecheck` - Runs TypeScript type checking

The key is identifying the workflows you do most often and automating them. Start with just one or two commands, then add more as you identify patterns.

### Step 4: Build Your First Verification Loop

Verification loops let Claude check its own work, which Boris identified as the single most important factor for quality.

**For a web application:**

Create a simple test script that Claude can run:
```bash
#!/bin/bash
# .claude/commands/verify-app.sh

echo "Starting app verification..."

# Start the dev server in the background
npm run dev &
DEV_PID=$!

# Wait for server to start
sleep 5

# Check if app is responding
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ App started successfully"
    
    # Run basic smoke tests
    npm run test:e2e
    
    RESULT=$?
else
    echo "❌ App failed to start"
    RESULT=1
fi

# Clean up
kill $DEV_PID

exit $RESULT
```

**For an API:**
```bash
#!/bin/bash
# .claude/commands/verify-api.sh

echo "Verifying API endpoints..."

# Start API server
npm run start:test &
API_PID=$!

sleep 3

# Test key endpoints
echo "Testing /health endpoint..."
curl -f http://localhost:8080/health || exit 1

echo "Testing /api/users endpoint..."
curl -f http://localhost:8080/api/users || exit 1

echo "✅ All endpoints responding"

kill $API_PID
```

Now when Claude makes changes, you can ask it to run `/verify-app` or `/verify-api` to check its work. Even better, set up a hook to run verification automatically.

### Step 5: Start Running Multiple Agents

Once you're comfortable with the above, you're ready to run multiple Claude agents in parallel.

**Terminal setup (iTerm2 on Mac):**

1. Open iTerm2 Preferences (Cmd+,)
2. Go to Profiles > Your Profile > Terminal
3. Enable "Notifications when idle for" - set to 5 seconds
4. Check "Send notification when current session's..."

This will give you a notification when Claude needs your input.

**Running 2-3 agents to start:**

Open 3 terminal tabs and number them:
- Tab 1: Feature implementation
- Tab 2: Test writing
- Tab 3: Documentation updates

In each tab, start a Claude session:
```bash
# Tab 1
claude-cli

# In Claude Code
> Implement user authentication feature

# Tab 2  
claude-cli

# In Claude Code
> Write comprehensive tests for the authentication feature

# Tab 3
claude-cli

# In Claude Code
> Update README and API documentation for authentication
```

Now you can work on all three in parallel. When Tab 1 finishes implementation, you'll get a notification. Review it, and while Claude in Tab 2 is still writing tests, you can start Tab 1 on the next feature.

**Managing multiple branches:**

Each agent should work on its own branch to avoid conflicts:

```bash
# Tab 1
git checkout -b feature/auth
claude-cli --branch feature/auth

# Tab 2
git checkout -b feature/auth-tests  
claude-cli --branch feature/auth-tests

# Tab 3
git checkout -b docs/auth
claude-cli --branch docs/auth
```

This keeps work isolated until you're ready to merge.

### Step 6: Integrate with Your Tools via MCP

MCP (Model Context Protocol) lets Claude interact with your external tools. Start with one or two integrations that would save you the most time.

**Example: Slack integration**

Create `.mcp.json` in your project root:
```json
{
  "mcpServers": {
    "slack": {
      "type": "http",
      "url": "https://slack.mcp.anthropic.com/mcp",
      "token": "your-slack-token"
    }
  }
}
```

Now Claude can search Slack for context:
```
You: "Check our Slack discussions about the authentication implementation"
Claude: [Searches Slack, finds relevant threads]
```

**Common MCP integrations:**
- Slack for team communications
- Linear/Jira for issue tracking
- Sentry for error monitoring
- DataDog for metrics
- Any tool with a CLI or API

Start with whichever tool you find yourself manually checking most often during development.

## Conclusion

Boris Cherny's workflow isn't just about using Claude Code effectively. It's a blueprint for the future of software development. The multi-agent approach, combined with team knowledge bases, automated verification, and thoughtful integration of AI into existing tools, creates a development environment that's both more powerful and more maintainable than traditional workflows.

The irony is that this "advanced" setup isn't actually that complicated. Most of it is configuration files checked into git, commands that run automatically, and patterns that your team already follows (now just documented for AI to understand).

The barrier isn't technical complexity. It's the shift in thinking from "AI as tool" to "AI as colleague." Once you make that leap, the possibilities expand dramatically.

Start small. Pick one or two practices from this article and implement them this week. Add your CLAUDE.md file. Try Plan mode. Create a verification script. The compounding returns will surprise you.

---

*Have you experimented with multi-agent workflows? Share your experiences in the comments below, or reach out to me on [LinkedIn](https://linkedin.com/in/chamlian/) to discuss your AI development strategies.*

**Related Reading:**
- [Creating Custom Skills in Claude Code](/claude-code-skills-guide.html)
- [Coding Beyond AI](/coding-beyond-ai.html)
