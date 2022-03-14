import type { Plugin } from 'rollup';

/**
 * rename imported style file's ext.
 * seperate style entries(.ts) and style files(.scss)
 */
export function ElementPlusAlias(scss: boolean = false): Plugin {
  return {
    name: 'element-plus-alias-plugin',
    resolveId(id, importer, options) {
      if (id.endsWith('.scss')) {
        let cssId = id;
        if (!scss) {
          cssId = id.replace('.scss', '.css');
        }
        return { id: cssId, external: 'absolute' };
      }
      return this.resolve(id, importer, { ...options, skipSelf: true });
    },
  };
}
