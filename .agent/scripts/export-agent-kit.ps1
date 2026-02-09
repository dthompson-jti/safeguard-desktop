# Agent Starter Kit Export Script
# Exports portable agent configuration to a distributable package

param(
    [string]$OutputDir = "agent-starter-kit",
    [switch]$Force
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-Step { param($msg) Write-Host "-> $msg" -ForegroundColor Cyan }
function Write-Success { param($msg) Write-Host "[OK] $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "[!] $msg" -ForegroundColor Yellow }

Write-Host ""
Write-Host "=== Agent Starter Kit Export ===" -ForegroundColor Magenta
Write-Host ""

# Check if output directory exists
if (Test-Path $OutputDir) {
    if ($Force) {
        Write-Warn "Removing existing $OutputDir"
        Remove-Item -Recurse -Force $OutputDir
    }
    else {
        Write-Warn "$OutputDir already exists. Use -Force to overwrite."
        exit 1
    }
}

# Create output structure
Write-Step "Creating directory structure"
New-Item -ItemType Directory -Path $OutputDir | Out-Null
New-Item -ItemType Directory -Path "$OutputDir/.agent/rules" -Force | Out-Null
New-Item -ItemType Directory -Path "$OutputDir/.agent/skills" -Force | Out-Null
New-Item -ItemType Directory -Path "$OutputDir/.agent/workflows" -Force | Out-Null
New-Item -ItemType Directory -Path "$OutputDir/docs" -Force | Out-Null

# Copy portable skills
Write-Step "Copying portable skills"
$portableSkills = @(
    "audit_web_interface",
    "react-performance",
    "_shared",
    "_templates"
)
foreach ($skill in $portableSkills) {
    $src = ".agent/skills/$skill"
    if (Test-Path $src) {
        Copy-Item -Recurse $src "$OutputDir/.agent/skills/"
        Write-Success "  $skill"
    }
}

# Copy portable workflows
Write-Step "Copying portable workflows"
$portableWorkflows = @(
    "plan.md",
    "build.md",
    "wrap-up.md",
    "quick-fix.md",
    "debug.md",
    "refactor.md"
)
foreach ($wf in $portableWorkflows) {
    $src = ".agent/workflows/$wf"
    if (Test-Path $src) {
        Copy-Item $src "$OutputDir/.agent/workflows/"
        Write-Success "  $wf"
    }
}

# Copy portable rules
Write-Step "Copying portable rules"
$portableRules = @(
    "design-system.md",
    "project-invariants.md"
)
foreach ($rule in $portableRules) {
    $src = ".agent/rules/$rule"
    if (Test-Path $src) {
        Copy-Item $src "$OutputDir/.agent/rules/"
        Write-Success "  $rule"
    }
}

# Copy documentation
Write-Step "Copying documentation"
$docSrc = "docs/knowledge-base/SPEC-AGENT-ARCHITECTURE.md"
if (Test-Path $docSrc) {
    Copy-Item $docSrc "$OutputDir/docs/"
    Write-Success "  SPEC-AGENT-ARCHITECTURE.md"
}

# Create GEMINI.md
Write-Step "Creating GEMINI.md"
"Review AGENTS.md for all GEMINI.md instructions" | Out-File -FilePath "$OutputDir/GEMINI.md" -Encoding utf8
Write-Success "  GEMINI.md"

# Create README.md
Write-Step "Creating README.md"
$readmeContent = @'
# Agent Starter Kit

Portable agent configuration for Google Antigravity, adapted from best practices.

## Quick Install (Windows)

```powershell
.\install.ps1
```

## Quick Install (Unix/Mac)

```bash
chmod +x install.sh && ./install.sh
```

## Manual Install

1. Copy `.agent/` folder to your project root
2. Copy `GEMINI.md` to your project root
3. (Optional) Copy `docs/SPEC-AGENT-ARCHITECTURE.md` to your docs

## Post-Install Customization

1. **Review rules**: Update `.agent/rules/project-invariants.md` for your project
2. **Add project docs**: Create your own `docs/knowledge-base/AGENTS.md`
3. **Customize skills**: Modify or add skills in `.agent/skills/`

## What's Included

### Skills
- `audit_web_interface/` - UI code review for web guidelines
- `react-performance/` - React/Vite performance optimization

### Workflows
- `/plan` - Create implementation plans
- `/build` - Execute implementation
- `/wrap-up` - Verification and cleanup

### Rules
- `design-system.md` - Design token enforcement
- `project-invariants.md` - Project-specific constraints

## Architecture Reference

See `docs/SPEC-AGENT-ARCHITECTURE.md` for the full north star specification.

## Compatibility

- Google Antigravity
- React/Vite projects (performance skill is React-specific)
- Windows and Unix/Mac
'@
$readmeContent | Out-File -FilePath "$OutputDir/README.md" -Encoding utf8
Write-Success "  README.md"

# Create install.ps1
Write-Step "Creating install scripts"
$installPs1 = @'
# Agent Starter Kit Installer (Windows)
param([switch]$Force)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== Installing Agent Starter Kit ===" -ForegroundColor Magenta

# Check for existing .agent
if ((Test-Path "../.agent") -and -not $Force) {
    Write-Host "[!] .agent already exists in parent. Use -Force to overwrite." -ForegroundColor Yellow
    exit 1
}

# Copy files
Write-Host "-> Copying .agent folder" -ForegroundColor Cyan
Copy-Item -Recurse -Force "./.agent" "../.agent"

Write-Host "-> Copying GEMINI.md" -ForegroundColor Cyan
Copy-Item -Force "./GEMINI.md" "../GEMINI.md"

if (Test-Path "./docs/SPEC-AGENT-ARCHITECTURE.md") {
    Write-Host "-> Copying architecture spec" -ForegroundColor Cyan
    if (-not (Test-Path "../docs/knowledge-base")) {
        New-Item -ItemType Directory -Path "../docs/knowledge-base" -Force | Out-Null
    }
    Copy-Item "./docs/SPEC-AGENT-ARCHITECTURE.md" "../docs/knowledge-base/"
}

Write-Host ""
Write-Host "[OK] Installation complete!" -ForegroundColor Green
Write-Host "Next steps:"
Write-Host "  1. Review .agent/rules/project-invariants.md"
Write-Host "  2. Create docs/knowledge-base/AGENTS.md for your project"
Write-Host ""
'@
$installPs1 | Out-File -FilePath "$OutputDir/install.ps1" -Encoding utf8
Write-Success "  install.ps1"

# Create install.sh
$installSh = @'
#!/bin/bash
# Agent Starter Kit Installer (Unix/Mac)

set -e

echo ""
echo "=== Installing Agent Starter Kit ==="

# Check for existing .agent
if [ -d "../.agent" ] && [ "$1" != "-f" ]; then
    echo "[!] .agent already exists in parent. Use -f to force overwrite."
    exit 1
fi

# Copy files
echo "-> Copying .agent folder"
cp -r ./.agent ../

echo "-> Copying GEMINI.md"
cp ./GEMINI.md ../

if [ -f "./docs/SPEC-AGENT-ARCHITECTURE.md" ]; then
    echo "-> Copying architecture spec"
    mkdir -p ../docs/knowledge-base
    cp ./docs/SPEC-AGENT-ARCHITECTURE.md ../docs/knowledge-base/
fi

echo ""
echo "[OK] Installation complete!"
echo "Next steps:"
echo "  1. Review .agent/rules/project-invariants.md"
echo "  2. Create docs/knowledge-base/AGENTS.md for your project"
echo ""
'@
$installSh | Out-File -FilePath "$OutputDir/install.sh" -Encoding ASCII
Write-Success "  install.sh"

Write-Host ""
Write-Host "=== Export Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Package created at: $OutputDir"
Write-Host ""
Write-Host "To distribute:"
Write-Host "  1. Zip the $OutputDir folder"
Write-Host "  2. Copy to target machine"
Write-Host "  3. Extract and run install.ps1 or install.sh from within the folder"
Write-Host ""
