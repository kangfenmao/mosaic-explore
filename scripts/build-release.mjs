import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const appDirectory = join(repositoryRoot, 'app')
const manifestPath = join(appDirectory, 'manifest.json')
const outputDirectory = join(repositoryRoot, 'dist')
const siteDirectory = join(outputDirectory, 'site')

function fail(message) {
  throw new Error(message)
}

function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex')
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(manifest.version)) fail('manifest.version must be semver')
if (manifest.package) fail('The package block belongs only in the distribution manifest')
if (!manifest.update?.url) fail('manifest.update.url is required for publishing')

const updateUrl = new URL(manifest.update.url)
if (updateUrl.protocol !== 'https:') fail('manifest.update.url must use HTTPS')
const distributionBaseUrl = new URL('.', updateUrl)

const entryPath = join(appDirectory, manifest.entry)
if (!existsSync(entryPath) || !lstatSync(entryPath).isFile()) fail('manifest.entry must be a regular file')

const iconPath = manifest.icon ? join(appDirectory, manifest.icon.path) : null
if (iconPath && (!existsSync(iconPath) || !lstatSync(iconPath).isFile()))
  fail('manifest.icon.path must be a regular file')
if (iconPath && sha256(iconPath) !== manifest.icon.sha256) fail('manifest.icon.sha256 does not match icon bytes')

execFileSync('git', ['diff', '--quiet', 'HEAD', '--', 'app'], { cwd: repositoryRoot })
const tree = execFileSync('git', ['ls-tree', '-r', 'HEAD', 'app'], { cwd: repositoryRoot, encoding: 'utf8' })
if (tree.split('\n').some((line) => line.startsWith('120000 '))) fail('Symbolic links are not allowed in app/')

rmSync(outputDirectory, { recursive: true, force: true })
const releaseDirectory = join(siteDirectory, 'releases', manifest.version)
mkdirSync(releaseDirectory, { recursive: true })

const packageName = `mosaic-explore-${manifest.version}.miniapp`
const packagePath = join(releaseDirectory, packageName)
execFileSync('python3', ['scripts/create_zip.py', 'app', packagePath], {
  cwd: repositoryRoot,
  stdio: 'inherit'
})

const packageSize = statSync(packagePath).size
if (packageSize > 50 * 1024 * 1024) fail('Package exceeds the 50 MB limit')

const distributionManifest = {
  ...manifest,
  package: {
    url: new URL(`releases/${manifest.version}/${packageName}`, distributionBaseUrl).href,
    ...(iconPath ? { iconUrl: new URL('icon.png', distributionBaseUrl).href } : {}),
    sha256: sha256(packagePath),
    size: packageSize
  }
}

writeFileSync(join(siteDirectory, 'manifest.json'), `${JSON.stringify(distributionManifest, null, 2)}\n`)
if (iconPath) copyFileSync(iconPath, join(siteDirectory, 'icon.png'))

console.log(
  JSON.stringify(
    {
      version: manifest.version,
      package: packagePath.slice(repositoryRoot.length + 1),
      sha256: distributionManifest.package.sha256,
      size: packageSize
    },
    null,
    2
  )
)
