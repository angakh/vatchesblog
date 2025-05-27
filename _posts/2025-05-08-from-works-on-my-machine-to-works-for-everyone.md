---
layout: post
read_time: true
show_date: true
title: "From 'Works on My Machine' to 'Works for Everyone'"
date: 2025-05-08
img: posts/20250508/cgi-render-docker-logo.jpg
tags: [Docker, dev containers, cloud development, containerization, development environments, DevOps]
category: opinion
author: Vatché
description: "Development environments have evolved from 'works on my machine' nightmares to consistent, shareable containers. Here's your guide to Docker dev containers, cloud IDEs, and best practices."
---

A long time ago, when I was working in the Drupal CMS space, I was introduced to Lando. It was one of the first times I had seen a docker container impact the workflow of a project. It was not easy to setup initially but in the end the result was so positive, that it could not be ignored. Development environments have evolved significantly since then to solve the "works on my machine" problem.

In this post we will be getting technical, so if that is not your thing, don't feel bad about hitting the back button.

<tweet>Remember when "works on my machine" was a valid excuse? Docker containers ended that era and we're all better for it.</tweet>

## 1. Docker and Dev Containers

### What are Dev Containers and how do they work?

Dev Containers are development environments containerized using Docker that allow developers to use a consistent, pre-configured environment. They encapsulate dependencies, runtimes, and tools needed for development.

Dev Containers work by leveraging Docker's containerization technology but with a focus on development rather than deployment. When a developer opens a project with Dev Container support (in VS Code or other compatible IDEs), the IDE builds and runs the container, then connects to it for development tasks like editing, debugging, and running code.

### How do ".devcontainer/Dockerfile" and ".devcontainer/devcontainer.json" work together?

These two files form the foundation of a Dev Container:

**".devcontainer/Dockerfile"**: Defines the base container image and steps to install required tools and dependencies.

```dockerfile
FROM python:3.11
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*
RUN pip install poetry
```

**".devcontainer/devcontainer.json"**: Configures how the Dev Container integrates with the IDE and environment.

```json
{
  "name": "Python Project",
  "build": {
    "dockerfile": "Dockerfile",
    "context": ".."
  },
  "customizations": {
    "vscode": {
      "extensions": ["ms-python.python", "ms-python.vscode-pylance"]
    }
  },
  "forwardPorts": [8000],
  "postCreateCommand": "poetry install"
}
```

The Dockerfile builds the container, while the devcontainer.json file configures how the IDE interacts with it, including IDE extensions to install, ports to forward, and commands to run after container creation.

### Benefits for team collaboration

**Consistency**: Every team member works in the exact same environment, eliminating "works on my machine" problems

**Onboarding**: New developers can be productive within minutes by simply opening the project in their IDE

**Isolation**: Projects with different dependencies don't conflict with each other

**Version control**: The development environment itself is versioned alongside the code

### How they help achieve parity with production

Dev Containers can use the same base images as production containers, shared dependencies ensure development behaviors match production, environment variables can be configured similarly to production, and service dependencies (databases, message queues) can be included via Docker Compose.

<tweet>Dev containers don't just solve "works on my machine"—they solve "works exactly like production" too.</tweet>

## 2. Cloud Development Environments

### What are cloud IDEs like Google's Project IDX or GitHub Codespaces?

Cloud Development Environments provide fully functional development environments hosted in the cloud and accessible through web browsers or local IDEs. They eliminate the need to set up local development environments completely.

**GitHub Codespaces**: Pre-configured cloud environments integrated with GitHub repositories

**Google's Project IDX**: Google's cloud development platform designed for web and mobile app development

**GitPod**: Open source cloud development environments that can integrate with GitHub, GitLab, and Bitbucket

### How do they differ from local Dev Containers?

**Resource allocation**: Cloud environments use cloud resources instead of local computer power

**Access**: Accessible from any device with a web browser

**Setup time**: Instant access without local Docker installation or configuration

**Cost model**: Usually involves usage-based pricing rather than local hardware costs

**Performance**: Network latency can affect the development experience

### Configuration files they use

**GitHub Codespaces**: Uses the same ".devcontainer" configuration as local Dev Containers

**Project IDX**: Uses ".idx/dev.nix" configuration files based on the Nix package manager

Example ".idx/dev.nix" for Project IDX:

```nix
{ pkgs, ... }: {
  channel = "stable";
  
  packages = [
    pkgs.nodejs_20
    pkgs.yarn
    pkgs.python311
  ];
  
  idx.extensions = [
    "dbaeumer.vscode-eslint"
    "esbenp.prettier-vscode"
  ];
  
  idx.previews = {
    enable = true;
    previews = [
      {
        command = ["npm" "run" "dev"];
        manager = "web";
        id = "web";
      }
    ];
  };
}
```

### Advantages and limitations

**Advantages:**
- Work from anywhere with internet access
- No local setup required
- Consistent environment for all team members
- Easily scalable resources for intensive tasks
- Collaboration features like real-time pair programming

**Limitations:**
- Requires internet connectivity
- Potential latency issues
- Monthly costs for team usage
- Less control over the underlying infrastructure
- Privacy/security concerns with proprietary code in cloud environments

## 3. Other Approaches

### How do tools like Docker Compose fit into development workflows?

Docker Compose allows developers to define and run multi-container Docker applications. It's often used alongside Dev Containers to set up supporting services needed for development (databases, caches, message queues), create a network of interconnected services that mirror production, and manage environment variables and volumes across multiple containers.

Example "docker-compose.yml":

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: devpassword
      POSTGRES_USER: devuser
    volumes:
      - pgdata:/var/lib/postgresql/data
  
  redis:
    image: redis:7
    ports:
      - "6379:6379"
volumes:
  pgdata:
```

### Differences between Dev Environments and Docker Compose

**Dev Containers** focus on the development environment itself (IDE integration, extensions, tools)

**Docker Compose** orchestrates multiple services that work together

Dev Containers can integrate with Docker Compose to provide both aspects

### Role of package managers like "uv" and task runners like "just"

**Modern package managers** like "uv" (for Python, written in Rust) improve dependency management speed and reliability. I highly recommend "uv" it is so much faster.

**Task runners** like "just" provide a consistent interface for common development tasks

Example "justfile":

```
default:
    @just --list

# Run project unit tests
test:
    uv run -- pytest

# Run MLflow server
mlflow:
    uv run -- mlflow server --host 127.0.0.1 --port 5000

# Serve latest registered model locally
serve:
    uv run -- mlflow models serve -m models:/mymodel/latest -h 0.0.0.0 -p 8080
```

These tools help standardize common development tasks across the team, regardless of the environment they're working in.

<tweet>Modern dev tools like 'uv' and 'just' make containerized environments feel as smooth as native development—but with way better consistency.</tweet>

## 4. Best Practices

### When to choose each approach

**Dev Containers**: For teams with complex development environments who want IDE integration

**Cloud Development**: For distributed teams, or when onboarding needs to be extremely fast

**Docker Compose**: For applications with multiple interconnected services

**Package managers/task runners**: As complementary tools in any environment

### Ensuring development matches production

Use the same base images and version tags when possible, document all dependencies explicitly, use infrastructure-as-code to define both environments, test in a staging environment that mirrors production before deployment, and include all critical services in the development environment.

### Trade-offs between simplicity and completeness

**Simple environments** are faster to set up but may miss edge cases

**Complete environments** catch more issues but require more resources and maintenance

Start with the minimal viable environment and incrementally add complexity as needed

Focus on matching the aspects of production that affect development most directly

### Managing environment variables

Use ".env" files for development-specific variables, never commit production secrets to version control, consider tools like "direnv" to manage environment switching, use secret management services for production environments, and define default values in the codebase with clear documentation.

Example approach with ".env.example" and ".gitignore":

```bash
# .env.example (committed to version control)
DATABASE_URL=postgresql://devuser:devpassword@db:5432/devdb
REDIS_URL=redis://redis:6379/0
API_KEY=example_key_for_development

# .gitignore
.env
```

## Real-world scenario: Full-stack web application

For a typical full-stack web application with a React frontend, Node.js API, and PostgreSQL database:

**Dev Container approach:**
- ".devcontainer/Dockerfile" with Node.js, PostgreSQL client tools
- ".devcontainer/devcontainer.json" with VS Code extensions for React, Node
- "docker-compose.yml" for PostgreSQL service

**Cloud IDE approach:**
- GitHub Codespaces configuration with the same Dev Container setup
- Environment variables set through the Codespaces secrets

**Local only approach:**
- "docker-compose.yml" with services for frontend, backend, and database
- Volume mounts for live code reloading

**Hybrid approach:**
- Dev Container for the development environment
- Docker Compose for service dependencies
- Task runner ("just" or npm scripts) for common commands
- Environment managed through ".env" files with ".env.example" templates

The best solution depends on your or your team's specific needs, but containerized environments (either local or cloud-based) have been leveraged to ensure consistency and reduce onboarding friction for a while now.

The evolution from "works on my machine" to "works for everyone" represents more than just a technical advancement—it's a fundamental shift in how we think about development environments. We've moved from treating environment setup as a necessary evil to embracing it as a core part of our development workflow.

Whether you choose local dev containers, cloud development environments, or a hybrid approach, the key is consistency and reproducibility. The days of spending hours debugging environment-specific issues are largely behind us, replaced by systems that ensure every developer on your team can be productive from day one.

The infrastructure choices you make today will determine how smoothly your team scales tomorrow. Choose tools that grow with your team and make the complex simple, not the simple complex.

I hope you found this post helpful, thanks for reading.