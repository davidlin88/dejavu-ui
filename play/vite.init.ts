import { existsSync, writeFileSync, readFileSync } from 'fs';

const app = 'play/src/App.vue';
const example = 'play/app.example.vue';

if (!existsSync(app)) {
  writeFileSync(app, readFileSync(example));
}
