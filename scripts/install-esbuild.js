#!/usr/bin/env node

/**
 * This script installs the correct esbuild binary for the current platform.
 * It's run automatically after npm install via the postinstall script.
 * 
 * Instead of relying on a platform-specific dependency like @esbuild/darwin-arm64,
 * this script determines the correct platform at runtime and installs the appropriate package.
 */

import { execSync } from 'child_process';
import { platform, arch } from 'os';

// Get the current esbuild version from package-lock.json
// This ensures we install the same version that's compatible with our build tools
let esbuildVersion;
try {
  // This is a simple approach - in a more robust implementation, you might want to parse
  // the package-lock.json file to get the exact version
  const output = execSync('npm ls esbuild --json').toString();
  const packageInfo = JSON.parse(output);
  esbuildVersion = packageInfo.dependencies.esbuild.version;
} catch (error) {
  // If we can't determine the version, use a default one
  // You might want to update this to match your project's requirements
  esbuildVersion = '0.21.5';
  console.log(`Could not determine esbuild version, using default: ${esbuildVersion}`);
}

// Map platform and architecture to esbuild package name
function getEsbuildPlatformPackage() {
  const currentPlatform = platform();
  const currentArch = arch();
  
  // Platform mapping based on Node.js os.platform() values
  const platformMap = {
    'darwin': {
      'arm64': `@esbuild/darwin-arm64@${esbuildVersion}`,
      'x64': `@esbuild/darwin-x64@${esbuildVersion}`
    },
    'win32': {
      'arm64': `@esbuild/win32-arm64@${esbuildVersion}`,
      'ia32': `@esbuild/win32-ia32@${esbuildVersion}`,
      'x64': `@esbuild/win32-x64@${esbuildVersion}`
    },
    'linux': {
      'arm': `@esbuild/linux-arm@${esbuildVersion}`,
      'arm64': `@esbuild/linux-arm64@${esbuildVersion}`,
      'ia32': `@esbuild/linux-ia32@${esbuildVersion}`,
      'mips64el': `@esbuild/linux-mips64el@${esbuildVersion}`,
      'ppc64': `@esbuild/linux-ppc64@${esbuildVersion}`,
      'riscv64': `@esbuild/linux-riscv64@${esbuildVersion}`,
      's390x': `@esbuild/linux-s390x@${esbuildVersion}`,
      'x64': `@esbuild/linux-x64@${esbuildVersion}`,
      'loong64': `@esbuild/linux-loong64@${esbuildVersion}`
    },
    'freebsd': {
      'arm64': `@esbuild/freebsd-arm64@${esbuildVersion}`,
      'x64': `@esbuild/freebsd-x64@${esbuildVersion}`
    },
    'openbsd': {
      'x64': `@esbuild/openbsd-x64@${esbuildVersion}`
    },
    'netbsd': {
      'x64': `@esbuild/netbsd-x64@${esbuildVersion}`
    },
    'sunos': {
      'x64': `@esbuild/sunos-x64@${esbuildVersion}`
    },
    'aix': {
      'ppc64': `@esbuild/aix-ppc64@${esbuildVersion}`
    }
  };

  // Get the package for the current platform and architecture
  if (platformMap[currentPlatform] && platformMap[currentPlatform][currentArch]) {
    return platformMap[currentPlatform][currentArch];
  }

  // If we don't have a specific mapping, log an error and return null
  console.error(`Unsupported platform: ${currentPlatform} ${currentArch}`);
  return null;
}

// Get the package name for the current platform
const esbuildPackage = getEsbuildPlatformPackage();

if (esbuildPackage) {
  console.log(`Installing esbuild for ${platform()}-${arch()}: ${esbuildPackage}`);
  try {
    // Install the platform-specific package
    execSync(`npm install --no-save ${esbuildPackage}`, { stdio: 'inherit' });
    console.log('Successfully installed platform-specific esbuild package');
  } catch (error) {
    console.error('Failed to install esbuild:', error.message);
    process.exit(1);
  }
} else {
  console.error('Could not determine the appropriate esbuild package for your platform');
  process.exit(1);
}
