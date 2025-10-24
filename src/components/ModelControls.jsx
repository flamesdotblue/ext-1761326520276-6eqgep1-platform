import { useRef } from 'react'
import { Upload, Link as LinkIcon } from 'lucide-react'

export function ModelControls({ className = '', onChange }) {
  const fileRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    const ext = file.name.toLowerCase().split('.').pop()
    if (!['glb', 'gltf', 'ply'].includes(ext)) {
      alert('Formats supportés: .glb, .gltf, .ply')
      return
    }
    const url = URL.createObjectURL(file)
    onChange?.({ type: 'file', url, name: file.name })
  }

  const handleUrl = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const url = formData.get('modelUrl')?.toString()?.trim()
    if (!url) return
    onChange?.({ type: 'url', url })
  }

  return (
    <div className={`flex w-full flex-col gap-2 rounded-2xl border border-neutral-800/70 bg-neutral-900/70 p-3 backdrop-blur-md ${className}`}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-2 text-sm text-neutral-100 hover:bg-neutral-700"
        >
          <Upload size={16} />
          Importer un modèle
        </button>
        <form onSubmit={handleUrl} className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <input
              name="modelUrl"
              placeholder="https://… .glb | .gltf | .ply"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-400 outline-none focus:border-neutral-500"
            />
            <LinkIcon size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Charger
          </button>
        </form>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".glb,.gltf,.ply"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  )
}
