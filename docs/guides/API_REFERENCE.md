# Ingvar Kit 5.0.0 - API Reference

**Complete REST API & CLI Command Reference**

**Version:** 5.0.0
**Released:** October 25, 2025
**Status:** Production Ready ✅

---

## Table of Contents

1. [Overview](#overview)
2. [REST API](#rest-api)
3. [CLI Commands](#cli-commands)
4. [Core Classes](#core-classes)
5. [WebSocket Events](#websocket-events)
6. [Configuration](#configuration)
7. [Error Handling](#error-handling)

---

## Overview

### Base Information

| Property         | Value                           |
| ---------------- | ------------------------------- |
| **API Version**  | 5.0.0                           |
| **Base URL**     | `http://localhost:3000/api`     |
| **Protocol**     | HTTP/REST + WebSocket           |
| **Auth**         | None (configure for production) |
| **Content-Type** | `application/json`              |
| **CORS**         | Enabled by default              |

### Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "timestamp": "2025-10-25T12:00:00Z",
  "requestId": "req_12345"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-10-25T12:00:00Z",
  "requestId": "req_12345"
}
```

---

## REST API

### Base URL

```
http://localhost:3000/api
```

### Authentication Headers (Optional)

```
Authorization: Bearer <token>
Content-Type: application/json
```

---

### Specifications

#### GET `/specs`

List all specifications in the project.

**Request:**

```bash
curl http://localhost:3000/api/specs
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "specs": [
      {
        "name": "user-auth",
        "status": "planning",
        "createdAt": "2025-10-25T10:00:00Z",
        "updatedAt": "2025-10-25T11:00:00Z",
        "progress": 75
      },
      {
        "name": "dashboard",
        "status": "generated",
        "createdAt": "2025-10-25T09:00:00Z",
        "updatedAt": "2025-10-25T12:00:00Z",
        "progress": 100
      }
    ],
    "total": 2
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

#### POST `/specs`

Create a new specification.

**Request:**

```bash
curl -X POST http://localhost:3000/api/specs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "new-feature",
    "description": "New feature specification"
  }'
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "name": "new-feature",
    "status": "created",
    "files": {
      "constitution": "constitution.md",
      "specification": "specification.md",
      "plan": "plan.md",
      "tasks": "tasks.md"
    }
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

#### GET `/specs/:name`

Get detailed information about a specification.

**Request:**

```bash
curl http://localhost:3000/api/specs/user-auth
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "name": "user-auth",
    "status": "planning",
    "constitution": {
      /* constitution content */
    },
    "specification": {
      /* specification content */
    },
    "plan": {
      /* plan content */
    },
    "tasks": [
      /* tasks array */
    ],
    "progress": 75,
    "statistics": {
      "totalTasks": 20,
      "completedTasks": 15,
      "estimatedHours": 24
    }
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

#### PUT `/specs/:name`

Update a specification.

**Request:**

```bash
curl -X PUT http://localhost:3000/api/specs/user-auth \
  -H "Content-Type: application/json" \
  -d '{
    "specification": "# Updated Spec\n..."
  }'
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "name": "user-auth",
    "updated": true,
    "updatedAt": "2025-10-25T12:00:00Z"
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

#### DELETE `/specs/:name`

Delete a specification.

**Request:**

```bash
curl -X DELETE http://localhost:3000/api/specs/user-auth
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "name": "user-auth",
    "deleted": true
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

### Code Generation

#### POST `/specs/:name/generate`

Generate code from specification using Claude AI.

**Request:**

```bash
curl -X POST http://localhost:3000/api/specs/user-auth/generate \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "claude",
    "model": "claude-3-5-sonnet-20241022"
  }'
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "status": "success",
    "files": [
      {
        "path": "src/auth/models/User.js",
        "lines": 180,
        "language": "javascript"
      },
      {
        "path": "src/auth/services/AuthService.js",
        "lines": 220,
        "language": "javascript"
      }
    ],
    "totalFiles": 12,
    "totalLines": 2450,
    "generatedAt": "2025-10-25T12:00:00Z",
    "outputDir": ".leo/generated"
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

**Error Response (500):**

```json
{
  "success": false,
  "error": "API key not configured",
  "code": "API_KEY_MISSING",
  "suggestion": "Set ANTHROPIC_API_KEY environment variable",
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

#### GET `/specs/:name/generate/status`

Check code generation status.

**Request:**

```bash
curl http://localhost:3000/api/specs/user-auth/generate/status
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "status": "completed",
    "progress": 100,
    "startedAt": "2025-10-25T11:50:00Z",
    "completedAt": "2025-10-25T12:00:00Z",
    "duration": "10 seconds",
    "filesGenerated": 12,
    "outputDir": ".leo/generated"
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

### Tasks

#### GET `/specs/:name/tasks`

Get task list for a specification.

**Request:**

```bash
curl http://localhost:3000/api/specs/user-auth/tasks
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": 1,
        "title": "Create user model",
        "description": "Define User model with validation",
        "completed": false,
        "priority": "high",
        "estimatedHours": 2,
        "phase": "foundation"
      },
      {
        "id": 2,
        "title": "Add password hashing",
        "description": "Implement bcrypt password hashing",
        "completed": true,
        "priority": "high",
        "estimatedHours": 1,
        "phase": "foundation"
      }
    ],
    "summary": {
      "total": 20,
      "completed": 5,
      "pending": 15
    }
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

#### POST `/specs/:name/tasks/:id/complete`

Mark a task as complete.

**Request:**

```bash
curl -X POST http://localhost:3000/api/specs/user-auth/tasks/1/complete
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "taskId": 1,
    "completed": true,
    "completedAt": "2025-10-25T12:00:00Z"
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

### Analysis

#### POST `/specs/:name/analyze`

Analyze specification for consistency.

**Request:**

```bash
curl -X POST http://localhost:3000/api/specs/user-auth/analyze
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "valid": true,
    "checks": {
      "constitution": { "valid": true },
      "specification": { "valid": true, "requirements": 12 },
      "plan": { "valid": true, "phases": 3 },
      "tasks": { "valid": true, "tasks": 20 }
    },
    "warnings": [],
    "suggestions": [
      "Consider adding performance requirements",
      "Add more error handling scenarios"
    ]
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

### Status

#### GET `/health`

Check API server health.

**Request:**

```bash
curl http://localhost:3000/api/health
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": "45 minutes",
    "version": "5.0.0",
    "environment": "development",
    "specs": 2,
    "activeConnections": 3
  },
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

## CLI Commands

### Specification Commands

#### `ingvar spec init <name>`

Initialize a new specification project.

**Usage:**

```bash
ingvar spec init my-feature
ingvar spec init "Complex Feature Name"
```

**Output:**

```
✅ Specification initialized for my-feature
📁 Project structure created:
   - constitution.md
   - specification.md
   - plan.md
   - tasks.md
```

**Options:**

```bash
ingvar spec init <name> --template <template>
ingvar spec init <name> --description "Description"
```

---

#### `ingvar spec constitution`

Create or edit team constitution.

**Usage:**

```bash
ingvar spec constitution
ingvar spec constitution edit
ingvar spec constitution view
```

**Output:** Opens editor to create/edit constitution.md

---

#### `ingvar spec specify`

Write the specification.

**Usage:**

```bash
ingvar spec specify
ingvar spec specify edit
```

**Output:** Opens editor for specification.md

---

#### `ingvar spec plan`

Generate implementation plan.

**Usage:**

```bash
ingvar spec plan
ingvar spec plan generate
ingvar spec plan view
```

**Output:**

```
✅ Plan generated successfully
📋 Generated 3 phases
✓ Phase 1: Foundation (5 tasks)
✓ Phase 2: Core Features (12 tasks)
✓ Phase 3: Testing & Polish (3 tasks)
```

---

#### `ingvar spec tasks`

View task list.

**Usage:**

```bash
ingvar spec tasks
ingvar spec tasks list
ingvar spec tasks view
ingvar spec tasks --completed
ingvar spec tasks --pending
```

**Output:**

```
Generated Tasks (20 total):

Phase 1: Foundation (5 tasks)
  [ ] Create user model
  [ ] Add validation
  [ ] Setup database
  [ ] Configure env
  [ ] Write tests

Phase 2: Features (12 tasks)
  [ ] Build auth service
  [ ] Add login endpoint
  ...

Phase 3: Polish (3 tasks)
  [ ] Write docs
  [ ] Final tests
  [ ] Code review
```

---

#### `ingvar spec analyze`

Analyze specification for consistency.

**Usage:**

```bash
ingvar spec analyze
ingvar spec analyze check
ingvar spec analyze validate
```

**Output:**

```
✅ Specification Analysis

Constitution:  ✅ Valid
Specification: ✅ Valid (12 requirements)
Plan:          ✅ Valid (3 phases)
Tasks:         ✅ Valid (20 tasks)

✓ Overall Status: 95% Complete
⚠ Suggestions:
  - Add performance metrics
  - Include error handling scenarios
```

---

#### `ingvar spec implement`

Generate code using Claude AI.

**Usage:**

```bash
ingvar spec implement
ingvar spec implement --provider claude
ingvar spec implement --output ./generated
```

**Output:**

```
🚀 Implementing specification...
✨ Generating with Claude 3.5 Sonnet...

Generated Files:
  ✅ src/auth/models/User.js (180 lines)
  ✅ src/auth/services/AuthService.js (220 lines)
  ✅ src/auth/routes/auth.routes.js (150 lines)
  ✅ tests/auth.test.js (180 lines)
  ✅ package.json
  ✅ README.md

📊 Statistics:
  Total Files: 12
  Total Lines: 2,450
  Estimated Coverage: 95%

📂 Output: .leo/generated/
```

---

#### `ingvar spec status`

Show specification progress.

**Usage:**

```bash
ingvar spec status
ingvar spec status <name>
ingvar spec status --verbose
```

**Output:**

```
Specification Status: my-feature

├─ Constitution:  ✅ Complete (100%)
│  └─ Team principles defined
├─ Specification: ✅ Complete (100%)
│  └─ 12 requirements documented
├─ Plan:          ✅ Complete (100%)
│  └─ 3 phases planned
├─ Tasks:         ✅ Generated (100%)
│  └─ 20 tasks created
└─ Overall:       ✅ 75% complete

Generated Code: ✅ Available
Output Directory: .leo/generated/
```

---

### Dashboard Commands

#### `ingvar dashboard start`

Start the API server.

**Usage:**

```bash
ingvar dashboard start
ingvar dashboard start --port 3001
ingvar dashboard start --no-open
```

**Output:**

```
🚀 Dashboard server starting...

✅ Server started successfully
├─ URL: http://localhost:3000
├─ WebSocket: ws://localhost:3000
├─ API Docs: http://localhost:3000/api/docs
└─ Press Ctrl+C to stop
```

---

#### `ingvar dashboard stop`

Stop the running server.

**Usage:**

```bash
ingvar dashboard stop
```

**Output:**

```
Stopping dashboard server...
✅ Server stopped
```

---

#### `ingvar dashboard status`

Check server status.

**Usage:**

```bash
ingvar dashboard status
```

**Output:**

```
Server Status:
├─ Status:       Running
├─ Port:         3000
├─ URL:          http://localhost:3000
├─ Uptime:       45 minutes
├─ Specs:        2 loaded
└─ Connections:  3 active
```

---

#### `ingvar dashboard open`

Open dashboard in browser.

**Usage:**

```bash
ingvar dashboard open
```

Opens `http://localhost:3000` in default browser.

---

#### `ingvar dashboard docs`

Show API documentation.

**Usage:**

```bash
ingvar dashboard docs
ingvar dashboard docs --format json
```

**Output:** Displays OpenAPI 3.0 specification with all endpoints.

---

### Plugin Commands

#### `ingvar plugin create <name>`

Create a new plugin.

**Usage:**

```bash
ingvar plugin create my-plugin
ingvar plugin create my-plugin --description "Plugin description"
```

**Output:**

```
✅ Plugin created successfully
📁 Structure:
   my-plugin/
   ├── index.js
   ├── package.json
   ├── config.json
   └── README.md
```

---

#### `ingvar plugin list`

List all plugins.

**Usage:**

```bash
ingvar plugin list
ingvar plugin list --details
```

**Output:**

```
Installed Plugins (3):
├─ web-dashboard (v1.0.0) - Visual management
├─ vscode-extension (v1.0.0) - VS Code integration
└─ my-plugin (v1.0.0) - Custom plugin [custom]
```

---

#### `ingvar plugin info <name>`

Show plugin details.

**Usage:**

```bash
ingvar plugin info web-dashboard
```

**Output:**

```
Plugin: web-dashboard
├─ Version:     1.0.0
├─ Status:      Running
├─ Port:        3001
├─ Started:     10 minutes ago
├─ Commands:    dashboard, widgets
├─ Events:      spec:updated, code:generated
└─ Description: Visual project management interface
```

---

#### `ingvar plugin start <name>`

Start a plugin.

**Usage:**

```bash
ingvar plugin start web-dashboard
```

**Output:**

```
Starting plugin: web-dashboard...
✅ Plugin started on port 3001
```

---

#### `ingvar plugin stop <name>`

Stop a plugin.

**Usage:**

```bash
ingvar plugin stop web-dashboard
```

**Output:**

```
Stopping plugin: web-dashboard...
✅ Plugin stopped
```

---

#### `ingvar plugin install <name>`

Install a plugin from npm.

**Usage:**

```bash
ingvar plugin install @leo/plugin-analytics
ingvar plugin install my-local-plugin
```

**Output:**

```
Installing plugin: @leo/plugin-analytics...
✅ Plugin installed successfully
```

---

#### `ingvar plugin uninstall <name>`

Uninstall a plugin.

**Usage:**

```bash
ingvar plugin uninstall my-plugin
```

**Output:**

```
Uninstalling plugin: my-plugin...
✅ Plugin uninstalled
```

---

## Core Classes

### SpecificationManager

Main class for managing specifications.

**Methods:**

```javascript
const manager = new SpecificationManager();

// Initialize project
await manager.init(featureName);

// Create documents
await manager.createConstitution(featureName, content);
await manager.createSpecification(featureName, content);
await manager.createPlan(featureName, content);

// Load specification
const spec = await manager.loadSpec(featureName);

// Analyze
const analysis = await manager.analyze(spec);

// Generate code
const code = await manager.generateTasks(spec);

// Get status
const status = await manager.getStatus(featureName);
```

---

### AICodeGenerator

Generate code using Claude AI.

**Methods:**

```javascript
const generator = new AICodeGenerator("claude");

// Generate from specification
const code = await generator.generateFromSpec(spec, options);

// Call Claude directly
const response = await generator._callClaude(prompt);

// Get mock response
const mock = generator._getMockResponse();
```

---

### PluginManager

Manage plugins.

**Methods:**

```javascript
const pm = new PluginManager();

// List plugins
pm.list();

// Load plugin
pm.load(name);

// Start plugin
pm.start(name);

// Stop plugin
pm.stop(name);

// Get info
pm.getInfo(name);
```

---

## WebSocket Events

Connect to WebSocket at `ws://localhost:3000`

### Listening to Events

```javascript
const ws = new WebSocket("ws://localhost:3000");

ws.addEventListener("message", (event) => {
  const { type, data } = JSON.parse(event.data);
  console.log(`Event: ${type}`, data);
});
```

### Event Types

#### `specification:created`

```json
{
  "type": "specification:created",
  "data": {
    "name": "user-auth",
    "timestamp": "2025-10-25T12:00:00Z"
  }
}
```

#### `specification:updated`

```json
{
  "type": "specification:updated",
  "data": {
    "name": "user-auth",
    "changes": ["specification", "plan"],
    "timestamp": "2025-10-25T12:00:00Z"
  }
}
```

#### `code:generated`

```json
{
  "type": "code:generated",
  "data": {
    "specName": "user-auth",
    "files": 12,
    "lines": 2450,
    "outputDir": ".leo/generated",
    "timestamp": "2025-10-25T12:00:00Z"
  }
}
```

#### `task:completed`

```json
{
  "type": "task:completed",
  "data": {
    "specName": "user-auth",
    "taskId": 1,
    "taskTitle": "Create user model",
    "timestamp": "2025-10-25T12:00:00Z"
  }
}
```

#### `error:occurred`

```json
{
  "type": "error:occurred",
  "data": {
    "error": "API key not configured",
    "specName": "user-auth",
    "timestamp": "2025-10-25T12:00:00Z"
  }
}
```

---

## Configuration

### Environment Variables

```bash
# API Configuration
ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
Ingvar_API_PORT=3000
Ingvar_API_HOST=localhost

# Project Configuration
Ingvar_PROJECT_NAME="My Project"
Ingvar_OUTPUT_DIR=".leo/generated"

# Development
Ingvar_DEBUG=false
Ingvar_LOG_LEVEL=info

# Advanced
Ingvar_TIMEOUT=30000
Ingvar_MAX_RETRIES=3
```

### Configuration File (leo.config.json)

```json
{
  "version": "5.0.0",
  "project": {
    "name": "My Project"
  },
  "spec": {
    "outputDir": ".leo/generated"
  },
  "ai": {
    "provider": "claude",
    "model": "claude-3-5-sonnet-20241022"
  },
  "api": {
    "port": 3000,
    "host": "localhost"
  }
}
```

---

## Error Handling

### Common Error Codes

| Code                | Meaning                     | Solution                        |
| ------------------- | --------------------------- | ------------------------------- |
| `SPEC_NOT_FOUND`    | Specification doesn't exist | Initialize with `ingvar spec init` |
| `API_KEY_MISSING`   | API key not configured      | Set `ANTHROPIC_API_KEY` env var |
| `GENERATION_FAILED` | Code generation failed      | Check specification validity    |
| `INVALID_REQUEST`   | Bad request format          | Check JSON syntax               |
| `INTERNAL_ERROR`    | Server error                | Check logs                      |

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Description of issue"
  },
  "suggestion": "How to fix it",
  "timestamp": "2025-10-25T12:00:00Z"
}
```

---

**Document Version:** 1.0
**Last Updated:** October 25, 2025
**Status:** ✅ Production Ready
